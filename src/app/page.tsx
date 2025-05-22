// app/page.tsx
'use client'

import { useState } from 'react'
import PlayerAutocomplete from './components/PlayerAutocomplete'
import PlayerCard from './components/PlayerCard'
import { Player } from './components/PlayerCard'

export default function Page() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  return (
    <main className="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
      <h1 className="text-3xl text-white mb-6">Search Footballer Stats</h1>

      <PlayerAutocomplete onSelect={setSelectedPlayer} />

      {selectedPlayer && (
        <div className="mt-8 w-full flex justify-center">
          <PlayerCard player={selectedPlayer} />
        </div>
      )}
    </main>
  )
}
