'use client'

import {
  GalleryVerticalEnd,
  Link2Icon,
  LogOutIcon,
  MoreVerticalIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { logout } from '@/app/(cms)/_features/logout'
import { BasicFormSchemaType } from '@/app/(cms)/_shared/schema'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/app/(cms)/_shared/shadcn'
import { useSidebar } from '@/app/(cms)/_shared/shadcn/sidebar'

export default function SiderHeader({
  basicData,
}: {
  basicData: BasicFormSchemaType
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                size='lg'
              >
                {basicData?.favicon ? (
                  <Image
                    alt={basicData?.companyName}
                    height={24}
                    src={basicData?.favicon as string}
                    width={24}
                  />
                ) : (
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                    <GalleryVerticalEnd className='size-4' />
                  </div>
                )}

                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {basicData?.companyName || ''}
                  </span>
                  <span className='truncate text-xs'>Administrator</span>
                </div>
                <MoreVerticalIcon className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuItem className='cursor-pointer p-2'>
                <Link
                  className='flex items-center gap-2'
                  href='/'
                  target='_blank'
                >
                  <Link2Icon className='size-4' />
                  <div className='font-medium text-muted-foreground'>
                    사이트로 이동
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer gap-2 p-2'
                onClick={logout}
              >
                <LogOutIcon className='size-4' />
                <div className='font-medium text-muted-foreground'>
                  로그아웃
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
