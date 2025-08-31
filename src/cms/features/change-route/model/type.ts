import { LucideIcon } from 'lucide-react'

export interface MenuItemType {
  title: string
  url?: string
  icon?: LucideIcon
  items?: MenuItemType[]
}
