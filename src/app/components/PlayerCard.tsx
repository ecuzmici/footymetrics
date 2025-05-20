'use client'

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

interface PlayerCardProps {
  player: Player
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const dob = new Date(player.date_of_birth).toLocaleDateString()

  return (
    <Card className="w-full bg-gray-800 border border-gray-700 shadow-lg mb-8">
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
          ['Height', `${player.height ?? '-' } cm`],
          ['Weight', `${player.weight ?? '-' } kg`],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-xs uppercase text-gray-500">{label}</p>
            <p className="mt-1 text-base text-white">{value}</p>
          </div>
        ))}
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-gray-700 text-sm text-gray-400">
        Test • 2
      </CardFooter>
    </Card>
  )
}
