// app/page.tsx
'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import React from 'react';
import { PlayerApiResponse } from './api/player/route';
import PlayerCard from './components/PlayerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-900">
      <h1 className="text-3xl font-bold text-white mb-8">Search Footballer</h1>

      <div className="flex w-full max-w-md mb-6 space-x-2 text-white">
        <Input
          placeholder="Enter player name…"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
        <Button onClick={handleSearch} disabled={!name.trim() || isFetching}>
          {isFetching ? 'Searching…' : 'Search'}
        </Button>
      </div>

      {error && <p className="text-red-400 mb-4">{(error as Error).message}</p>}

      {player && <PlayerCard player={player} />}
    </main>
  )
}
