import { NextRequest, NextResponse } from 'next/server'

export interface Player {
  id: number
  common_name: string
  name: string
  display_name: string
  image_path: string
  height: number
  weight: number
  date_of_birth: string
}

export interface PlayerApiResponse {
  data: Player[]
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')?.trim()

  if (!name) {
    return NextResponse.json(
      { error: 'Missing “name” query parameter' },
      { status: 400 }
    )
  }

  const token = process.env.SPORTMONKS_TOKEN
  const url = `https://api.sportmonks.com/v3/football/players/search/${encodeURIComponent(
    name
  )}?api_token=${token}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      // forward status + message
      return NextResponse.json(
        { error: `Sportmonks API error (${res.status})` },
        { status: res.status }
      )
    }
    const json = await res.json()

    // return the raw Sportmonks payload (or json.data if you only want the array)
    return NextResponse.json(json)
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 502 }
    )
  }
}
