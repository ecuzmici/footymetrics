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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import StatsRadar from './StatsRadar'

export interface TeamInfo {
  id: number
  name: string
  short_code: string
  image_path: string
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
  country: CountryInfo
}

interface CountryInfo {
  id: number
  name: string
  image_path: string
}

interface PlayerStatisticDetail {
  id: number
  type_id: number
  value: Record<string, any>
  stat_type: {
    name: string
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
    <Card className="w-full max-w-7xl mx-auto bg-gray-800 border border-gray-700 shadow-lg mb-8">
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* LEFT: Player & Team Info */}
        <div className="space-y-6">
          {/* Player Header */}
          <div className="bg-gray-700 rounded-lg shadow-md p-6 flex items-center space-x-4 min-h-48">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={player.image_path}
                alt={player.display_name}
                className="rounded-full object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-white">
                {player.display_name}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {player.common_name}
              </CardDescription>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={player.player_teams[0].team.image_path}
                  alt={player.player_teams[0].team.name}
                  className="rounded-md object-contain"
                />
              </Avatar>
              <p className="text-gray-200">
                {player.player_teams[0].team.short_code}
              </p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-gray-700 rounded-lg shadow-md p-6 min-h-80">
            <h3 className="text-lg font-semibold text-white mb-4">
              Basic Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Full Name', player.name],
                ['Date of Birth', dob],
                ['Height', player.height ? `${player.height} cm` : '-'],
                ['Weight', player.weight ? `${player.weight} kg` : '-'],
                ['Position', player.position?.name || '-'],
                ['Role', player.detailed_position?.name || '-'],
                ['Country', player.country?.name || '-'],
                ['Jersey number', player.player_teams[0].jersey_number || '-'],
              ].map(([label, value]) => (
                <div key={label}>
                  <Label className="text-xs text-gray-400">{label}</Label>
                  <p className="mt-1 text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Stats Table & Radar */}
        <div className="space-y-6">
          {/* General Statistics */}
          {stats.length === 0 ? (
            <p className="text-gray-400 text-center">No stats available.</p>
          ) : (
            <div className="bg-gray-700 rounded-lg shadow-md p-6 min-h-48">
              <h3 className="text-lg font-semibold text-white mb-4">
                General Statistics
              </h3>

              {/* Desktop table, hidden on small screens */}
              <div className="hidden sm:block overflow-x-auto">
                <Table className="w-full text-sm border border-gray-600 rounded-lg overflow-hidden">
                  <TableHeader className="bg-gray-800">
                    <TableRow className="border-b border-gray-600">
                      {stats[0].player_statistic_details.map((d, i) => (
                        <TableHead
                          key={d.id}
                          className={`
                            px-3 py-2 text-gray-300 text-center
                            border-r border-gray-600 last:border-r-0
                            ${i === 0 ? 'rounded-tl-lg' : ''}
                            ${
                              i === stats[0].player_statistic_details.length - 1
                                ? 'rounded-tr-lg'
                                : ''
                            }
                          `}
                        >
                          {d.stat_type.name}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-gray-800">
                      {stats[0].player_statistic_details.map((d, i) => (
                        <TableCell
                          key={d.id}
                          className={`
                            px-3 py-2 text-white text-center
                            border-r border-gray-600 last:border-r-0
                            ${i === 0 ? 'rounded-bl-lg' : ''}
                            ${
                              i === stats[0].player_statistic_details.length - 1
                                ? 'rounded-br-lg'
                                : ''
                            }
                          `}
                        >
                          {d.value.total ?? d.value.average}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Mobile label-value list, hidden on larger screens */}
              <div className="sm:hidden grid grid-cols-1 gap-4">
                {stats[0].player_statistic_details.map((d) => (
                  <div
                    key={d.id}
                    className="bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center"
                  >
                    <div className="text-gray-300 text-sm font-medium mb-2 text-center">
                      {d.stat_type.name}
                    </div>
                    <div className="text-white text-xl font-semibold">
                      {d.value.total ?? d.value.average}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Radar */}
          <div className="bg-gray-700 rounded-lg p-6 min-h-80">
            <h3 className="text-lg font-semibold text-white mb-4">
              {`${player.position.name} Performance Radar`}
            </h3>
            <StatsRadar playerId={player.id} position={player.position.name} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
