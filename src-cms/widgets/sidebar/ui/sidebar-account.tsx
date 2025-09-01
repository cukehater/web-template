'use client'

import { cn } from '@cms/shared/lib'
import { BasicFormSchemaType } from '@cms/shared/models'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@cms/shared/shadcn'
import { GalleryVerticalEnd, Link2Icon, LogOutIcon, MoreVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { logout } from '../api/logout'

export default function SidebarAccount({ basicData }: { basicData: BasicFormSchemaType }) {
  const { isMobile, state } = useSidebar()

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                size="lg"
              >
                {basicData?.favicon ? (
                  <Image
                    alt={basicData?.companyName}
                    className={cn('rounded-md', state === 'collapsed' && 'h-8 w-8 p-0.75')}
                    height={24}
                    src={basicData?.favicon as string}
                    width={24}
                  />
                ) : (
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                )}

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{basicData?.companyName || ''}</span>
                  <span className="truncate text-xs">Administrator</span>
                </div>
                <MoreVerticalIcon className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuItem className="cursor-pointer">
                <Link className="flex items-center gap-2" href="/" target="_blank">
                  <Link2Icon className="size-4" />
                  <p className="font-medium text-muted-foreground">사이트로 이동</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2 p-0">
                <Link
                  className="w-full flex items-center gap-2 justify-start py-1.5 px-2"
                  href="/"
                  onClick={logout}
                >
                  <LogOutIcon className="size-4" />
                  <p className="font-medium text-muted-foreground">로그아웃</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
