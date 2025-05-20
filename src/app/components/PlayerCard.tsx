'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
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
    <Card className="w-full max-w-md mb-6">
      <CardHeader className="flex items-center space-x-4 p-4">
        <Avatar>
          <AvatarImage
            src={player.image_path}
            alt={player.display_name}
          />
        </Avatar>
        <div>
          <CardTitle>{player.display_name}</CardTitle>
          <CardDescription>{player.common_name}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 bg-gray-800 p-4">
        <div>
          <Label>Full Name</Label>
          <p className="mt-1 text-white">{player.name}</p>
        </div>
        <div>
          <Label>Date of Birth</Label>
          <p className="mt-1 text-white">{dob}</p>
        </div>
        <div>
          <Label>Height</Label>
          <p className="mt-1 text-white">{player.height} cm</p>
        </div>
        <div>
          <Label>Weight</Label>
          <p className="mt-1 text-white">{player.weight} kg</p>
        </div>
      </CardContent>
    </Card>
  )
}
