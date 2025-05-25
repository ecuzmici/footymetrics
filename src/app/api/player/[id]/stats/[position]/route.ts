import { POSITION_STATISTICS } from '@/src/app/utils/constants/statistics'
import { createServerSupabaseClient } from '@/src/app/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

type StatResult = {
  type_id: number
  stat_name: string
  value: number
  max: number
  min: number
}

export async function GET(
  request: NextRequest,
  context: { params: { id: string; position: string } }
) {
  const { id, position } = await context.params
  const playerId = Number(id)

  // 1) Validate
  if (!playerId || isNaN(playerId)) {
    return NextResponse.json({ error: 'Invalid player ID' }, { status: 400 })
  }
  const posConfig = POSITION_STATISTICS[position]
  if (!posConfig) {
    return NextResponse.json({ error: 'Invalid position' }, { status: 400 })
  }

  // 2) Extract entries and gather all required type IDs
  const per90Entries = posConfig.calculate?.per_90 ?? []
  const ratioEntries = posConfig.calculate?.ratio  ?? []
  const staticEntries = posConfig.static          ?? []

  const typeIds = new Set<number>()
  per90Entries.forEach((e) =>
    Object.values(e.values).forEach((id) => typeIds.add(id))
  )
  ratioEntries.forEach((e) =>
    Object.values(e.values).forEach((id) => typeIds.add(id))
  )
  staticEntries.forEach((e) =>
    Object.values(e.value).forEach((id) => typeIds.add(id))
  )

  // include minutes-played
  typeIds.add(119)
  const STAT_TYPE_IDS = Array.from(typeIds)

  const supabase = createServerSupabaseClient()

  // 3) Fetch player’s raw stats (including minutes)
  const { data: statsRows, error: statsErr } = await supabase
    .from('player_statistics')
    .select(`player_statistic_details!inner(type_id,value)`)
    .eq('player_id', playerId)
    .in('player_statistic_details.type_id', STAT_TYPE_IDS)

  if (statsErr) {
    console.error('Error fetching player stats:', statsErr)
    return NextResponse.json({ error: statsErr.message }, { status: 500 })
  }

  // 4) Fetch aggregates: raw and per_90 from your aggregates table
  const { data: aggRows, error: aggErr } = await supabase
    .from('position_statistic_aggregates')
    .select(
      'type_id, max_value, min_value, max_per_90, min_per_90'
    )
    .eq('position_name', position)
    .in('type_id', STAT_TYPE_IDS)

  if (aggErr) {
    console.error('Error fetching aggregates:', aggErr)
    return NextResponse.json({ error: aggErr.message }, { status: 500 })
  }

  // 5) Build lookup maps for quick access
  const playerMap = new Map<number, number>()
  let minutesPlayed = 0
  statsRows?.forEach((row) =>
    row.player_statistic_details.forEach((d: any) => {
      const raw = d.value.total ?? d.value.average ?? 0
      if (d.type_id === 119) minutesPlayed = raw
      playerMap.set(d.type_id, raw)
    })
  )

  const rawAggMap = new Map<number, { max: number; min: number }>()
  const per90AggMap = new Map<number, { max: number; min: number }>()
  aggRows?.forEach((a: any) => {
    rawAggMap.set(a.type_id, {
      max: Number(a.max_value) || 0,
      min: Number(a.min_value) || 0,
    })
    per90AggMap.set(a.type_id, {
      max: Number(a.max_per_90) || 0,
      min: Number(a.min_per_90) || 0,
    })
  })

  // 6) Assemble final results
  const results: StatResult[] = []

  // per_90 entries
  per90Entries.forEach((entry) => {
    const typeId = Object.values(entry.values)[0]
    const raw = playerMap.get(typeId) ?? 0
    const per90 = minutesPlayed > 0 ? (raw / minutesPlayed) * 90 : 0
    const agg = per90AggMap.get(typeId) ?? { max: 0, min: 0 }
    results.push({
      type_id: typeId,
      stat_name: entry.name,
      value: Number(per90.toFixed(2)),
      max: agg.max,
      min: agg.min,
    })
  })

  // ratio entries
  ratioEntries.forEach((entry) => {
    const [[, numId], [, denId]] = Object.entries(entry.values)
    const num = playerMap.get(numId) ?? 0
    const den = playerMap.get(denId) ?? 1
    const pct = den > 0 ? Math.min((num / den) * 100, 100) : 0
    results.push({
      type_id: numId,
      stat_name: entry.name,
      value: Number(pct.toFixed(2)),
      max: 100,
      min: 0,
    })
  })

  // static entries
  staticEntries.forEach((entry) => {
    const typeId = Object.values(entry.value)[0]
    const raw = playerMap.get(typeId) ?? 0
    const agg = rawAggMap.get(typeId) ?? { max: 0, min: 0 }
    results.push({
      type_id: typeId,
      stat_name: entry.name,
      value: raw,
      max: agg.max,
      min: agg.min,
    })
  })

  return NextResponse.json(results)
}
