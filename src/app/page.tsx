'use client'

import { useState } from 'react'
import PlayerAutocomplete from './components/PlayerAutocomplete'
import PlayerCard from './components/PlayerCard'
import { Player } from './components/PlayerCard'

export default function Page() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  return (
    <main className="flex flex-col min-h-screen bg-gray-900 items-center">
      <h1 className="text-3xl text-white mt-8 mb-6 font-light">
        Premier League 2024/2025 Player Stats
      </h1>
  
      <PlayerAutocomplete onSelect={setSelectedPlayer} />
  
      {selectedPlayer && (
        <div className="mt-8 w-full flex justify-center">
          <PlayerCard player={selectedPlayer} />
        </div>
      )}
  
      <footer className="mt-auto w-full bg-gray-800">
        <div className="container mx-auto py-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Emil Cuzmici. All statistics taken from SportMonks.
        </div>
      </footer>
    </main>
  )
  
}
