'use client'

import { useState } from 'react'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Player } from './PlayerCard'
import { Search, Loader2, Check } from 'lucide-react'

interface PlayerAutocompleteProps {
  onSelect: (player: Player) => void
}

export default function PlayerAutocomplete({ onSelect }: PlayerAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [debouncedInput] = useDebounce(query, 300)

  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ['player-suggest', debouncedInput],
    queryFn: () =>
      fetch(`/api/player?name=${encodeURIComponent(debouncedInput)}&limit=25`)
        .then((r) => (r.ok ? r.json() : [])),
    enabled: debouncedInput.length >= 2,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <Combobox onChange={onSelect} as="div" className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden items-center">
        <ComboboxInput
          className="flex-grow px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
          placeholder="Search for a player..."
          displayValue={(p: Player) => p?.display_name ?? ''}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <ComboboxButton as={Button} variant="ghost" className="p-3 mx-2">
          {isFetching 
            ? <Loader2 className="w-5 h-5 text-gray-400 animate-spin" /> 
            : <Search className="w-5 h-5 text-gray-400" />
          }
        </ComboboxButton>
      </div>

      {/* Dropdown List */}
      {suggestions.length > 0 && (
        <ComboboxOptions className="absolute z-20 left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-auto">
          {suggestions.map((player) => (
            <ComboboxOption
              key={player.id}
              value={player}
              className={({ active }) =>
                `flex items-center justify-between px-4 py-2 cursor-pointer ${
                  active ? 'bg-gray-700 text-white' : 'text-gray-300'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span>{player.display_name}</span>
                  {selected && <Check className="w-4 h-4 text-blue-400" />}
                </>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      )}
    </Combobox>
  )
}
