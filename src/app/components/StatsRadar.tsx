'use client'

import { useState, useEffect } from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatString } from '../utils/stringFormatter';

interface StatPoint {
  type_id: number
  stat_name: string
  value: number
  max: number
}

interface ChartItem {
  stat: string
  percent: number // normalized 0–100
  full: number // always 100
  rawValue: number
  rawMax: number
}

interface StatsRadarProps {
  playerId: number
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker' | string
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null
  const item = payload[0].payload as ChartItem
  return (
    <div className="bg-gray-800 p-2 rounded shadow-lg text-xs text-gray-200">
      <div className="font-semibold">{item.stat}</div>
      <div>Value: {item.rawValue}</div>
      <div>Max: {item.rawMax}</div>
    </div>
  )
}

export default function StatsRadar({ playerId, position }: StatsRadarProps) {
  const [dataPoints, setDataPoints] = useState<StatPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/player/${playerId}/stats/${position}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load stats')
        return res.json()
      })
      .then((json: StatPoint[]) => {
        setDataPoints(json)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
        setLoading(false)
      })
  }, [playerId, position])

  if (loading)
    return <p className="text-center text-gray-400">Loading radar…</p>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>
  if (!dataPoints.length)
    return <p className="text-center text-gray-400">No stats available.</p>

  // Normalize to percentage
  const chartData: ChartItem[] = dataPoints.map((p) => {
    const percent = p.max > 0 ? (p.value / p.max) * 100 : 0
    return {
      stat: formatString(p.stat_name),
      percent,
      full: 100,
      rawValue: p.value,
      rawMax: p.max,
    }
  })

  return (
    <Card className="bg-gray-700 border-0 shadow-none py-0">
      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="85%" data={chartData}>
            <PolarGrid stroke="darkgray" />
            <PolarAngleAxis
              dataKey="stat"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Radar
              name="Player % of Max"
              dataKey="percent"
              stroke="#60A5FA"
              fill="#60A5FA"
              fillOpacity={0.4}
            />
            <Radar
              name="League Max (100%)"
              dataKey="full"
              stroke="white"
              fill="white"
              fillOpacity={0.01}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ bottom: -15, fontSize: 12 }}
              formatter={(value) => (
                <span className="text-gray-300">{value}</span>
              )}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
