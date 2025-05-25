// app/api/player/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '../../utils/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')?.trim()
  const limit = Number(searchParams.get('limit')) || 1

  if (!name) {
    return NextResponse.json({ error: 'Missing “name” parameter' }, { status: 400 })
  }

  // createSupabase
  const supabase = createServerSupabaseClient()

  // query the players table and join on teams & types
  const { data, error } = await supabase
    .from('players')
    .select(`
      id,
      common_name,
      firstname,
      lastname,
      name,
      display_name,
      image_path,
      height,
      weight,
      date_of_birth,
      gender,

      player_teams (
        jersey_number,
        team:teams (
          id,
          name,
          short_code,
          image_path
        )
      ),

      position:types!fk_players_position (
        id,
        name
      ),
      detailed_position:types!fk_players_detailed (
        id,
        name
      ),

      country:countries!fk_players_nationality (
        id,
        name,
        image_path
      )
    `)
    .ilike('name', `%${name}%`)
    .limit(limit)

  if (error) {
    console.error('Supabase GET /api/player error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
