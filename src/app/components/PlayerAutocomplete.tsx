'use client'

import { useState } from 'react'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Player } from './PlayerCard';

interface PlayerAutocompleteProps {
  onSelect: (player: Player) => void
}

export default function PlayerAutocomplete({ onSelect }: PlayerAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [debouncedInput] = useDebounce(query, 300)

  // Fetch suggestions when user stops typing
  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ['player-suggest', debouncedInput],
    queryFn: () =>
      fetch(`/api/player?name=${encodeURIComponent(debouncedInput)}&limit=25`)
        .then(r => r.ok ? r.json() : []),
    enabled: debouncedInput.length >= 2,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <Combobox value={null} onChange={onSelect}>
      <div className="relative w-full max-w-2xl">
        <ComboboxInput
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search player..."
          displayValue={(p: Player) => p?.display_name ?? ''}
          onChange={e => setQuery(e.currentTarget.value)}
        />
        <Button
          onClick={() => {}}
          disabled
          className="absolute right-0 top-0 h-10 px-4 py-0 bg-blue-600 disabled:bg-blue-600"
        >
          {isFetching ? '…' : '🔍'}
        </Button>

        {suggestions.length > 0 && (
          <ComboboxOptions
            className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded shadow-lg max-h-60 overflow-auto"
          >
            {suggestions.map((player: Player) => (
              <ComboboxOption
                key={player.id}
                value={player}
                className={({ focus }) =>
                  `cursor-pointer px-4 py-2 ${
                    focus ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`
                }
              >
                {({ selected, focus }) => (
                  <div className="flex justify-between">
                    <span>{player.display_name}</span>
                    {selected && <span className={focus ? 'text-white' : 'text-blue-500'}>✓</span>}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  )
}
