// app/page.tsx
'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import React from 'react';
import { PlayerApiResponse } from './api/player/route';
import PlayerCard from './components/PlayerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

/** React-Query fetcher */
async function fetchPlayerByName({ queryKey }: { queryKey: any[] }) {
  const [, name] = queryKey
  const res = await fetch(`/api/player?name=${encodeURIComponent(name)}`)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to fetch player')
  }
  return (await res.json()) as PlayerApiResponse
}


export default function Page() {
  const [name, setName] = useState('')

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['player', name],
    queryFn: fetchPlayerByName,
    enabled: false,
    staleTime: 1000 * 60 * 5,
  })

  const handleSearch = () => {
    if (name.trim()) refetch()
  }

  const player = data?.data?.[0]

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
      <div className="w-full max-w-lg max-w-md">
        {/* Title */}
        <h1 className="text-4xl font-light text-white text-center mb-8">
          Footballer Stats
        </h1>
  
        {/* Search Card */}
        <Card className="bg-gray-900 border border-gray-700 mb-6">
          <CardContent className="flex gap-2 p-4">
            <Input
              placeholder="Enter player name…"
              value={name}
              onChange={e => setName(e.currentTarget.value)}
              className="bg-gray-800 border-gray-700 placeholder-gray-500 text-white
                         focus:ring-blue-500 focus:border-blue-500"
            />
            <Button
              onClick={handleSearch}
              disabled={!name.trim() || isFetching}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"
            >
              {isFetching ? 'Searching…' : 'Search'}
            </Button>
          </CardContent>
        </Card>
  
        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 text-center mb-6">
            {(error as Error).message}
          </p>
        )}
  
        {/* Player Profile */}
        {player && (
          <div className="w-full">
            <PlayerCard player={player} />
          </div>
        )}
      </div>
    </main>
  )
}
