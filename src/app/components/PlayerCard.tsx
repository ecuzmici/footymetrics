'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'

export interface TeamInfo {
  id: number
  name: string
  short_code: string
}

export interface PlayerTeam {
  team: TeamInfo
  jersey_number: number | null
}

export interface PositionInfo {
  id: number
  name: string
}

export interface Player {
  id: number
  common_name: string
  firstname: string
  lastname: string
  name: string
  display_name: string
  image_path: string
  height: number | null
  weight: number | null
  date_of_birth: string | null
  gender: string
  player_teams: PlayerTeam[]
  position: PositionInfo
  detailed_position: PositionInfo
}

interface PlayerStatisticDetail {
  id: number
  type_id: number
  value: Record<string, any>
  stat_type: {
    developer_name: string
  }
}

interface PlayerStatistic {
  id: number
  team_id: number
  jersey_number: number | null
  player_statistic_details: PlayerStatisticDetail[]
}

interface PlayerCardProps {
  player: Player
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const [stats, setStats] = useState<PlayerStatistic[]>([])
  const dob = player.date_of_birth
    ? new Date(player.date_of_birth).toLocaleDateString()
    : '-'
  const mainTeam = player.player_teams[0]

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`/api/player/${player.id}/stats`)
        if (!res.ok) throw new Error('Failed to fetch stats')
        const data: PlayerStatistic[] = await res.json()
        setStats(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchStats()
  }, [player.id])

  return (
    <Card className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-lg mb-8">
      <CardHeader className="flex items-center space-x-4 p-6">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={player.image_path}
            alt={player.display_name}
            className="w-full h-full object-cover rounded-full"
          />
        </Avatar>
        <div>
          <CardTitle className="text-2xl text-white">
            {player.display_name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-400">
            {player.common_name}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 py-4">
        {[
          ['Full Name', player.name],
          ['Date of Birth', dob],
          ['Height', player.height ? `${player.height} cm` : '-'],
          ['Weight', player.weight ? `${player.weight} kg` : '-'],
          ['Position', player.position?.name || '-'],
          ['Role', player.detailed_position?.name || '-'],
        ].map(([label, value]) => (
          <div key={label}>
            <Label className="text-xs uppercase text-gray-500">
              {label}
            </Label>
            <p className="mt-1 text-base text-white">{value}</p>
          </div>
        ))}
      </CardContent>

      {mainTeam && (
        <CardFooter className="flex items-center justify-between px-6 py-4 border-t border-gray-700">
          <div>
            <Label className="text-xs uppercase text-gray-500">
              Team
            </Label>
            <p className="mt-1 text-white">
              {mainTeam.team.name} ({mainTeam.team.short_code})
            </p>
          </div>
          <div className="text-right">
            <Label className="text-xs uppercase text-gray-500">
              Jersey #
            </Label>
            <p className="mt-1 text-white">
              {mainTeam.jersey_number ?? '-'}
            </p>
          </div>
        </CardFooter>
      )}

      {stats.length > 0 && (
        <CardContent className="px-6 py-4 border-t border-gray-700">
          <Label className="text-xs uppercase text-gray-500 mb-2 block">
            Selected Statistics
          </Label>
          <div className="space-y-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-gray-700 p-4 rounded-lg"
              >
                <p className="text-sm text-white font-semibold mb-2">
                  Team ID: {stat.team_id} &nbsp;|&nbsp; Jersey: {stat.jersey_number ?? '-'}
                </p>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  {stat.player_statistic_details.map((detail) => (
                    <li key={detail.id}>
                      <span className="font-medium text-white">
                        {detail.stat_type.developer_name}:
                      </span>{' '}
                      {Object.entries(detail.value)
                        .map(([k, v]) => `${k}=${v}`)
                        .join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
