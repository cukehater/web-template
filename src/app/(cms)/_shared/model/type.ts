import { LucideIcon } from 'lucide-react'

export interface MenuItemType {
  title: string
  icon?: LucideIcon
  url?: string
  items?: MenuItemType[]
}

export interface User {
  id: string
  userId: string
  name: string
}
