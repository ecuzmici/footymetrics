import { GENERAL_STATISTICS } from '@/src/app/utils/constants/statistics';
import { createServerSupabaseClient } from '@/src/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server'

const STAT_TYPE_IDS = Object.values(GENERAL_STATISTICS)

export async function GET(
  request: NextRequest,
  context
) {
  const { id } = await context.params
  const playerId = Number(id)
  if (!playerId || Number.isNaN(playerId)) {
    return NextResponse.json(
      { error: 'Invalid or missing player ID' },
      { status: 400 }
    )
  }

  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from('player_statistics')
    .select(`
      id,
      team_id,
      jersey_number,

      player_statistic_details!inner(
        id,
        type_id,
        value,
        stat_type:types!player_statistic_details_type_id_fkey(
          name
        )
      )
    `)
    .eq('player_id', playerId)
    .in('player_statistic_details.type_id', STAT_TYPE_IDS)

  if (error) {
    console.error('Error fetching player stats:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
