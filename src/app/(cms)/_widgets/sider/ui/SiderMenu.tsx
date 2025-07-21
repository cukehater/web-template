'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@//app/(cms)/_shared/shadcn'
import { ADMIN_MENU_ITEMS } from '@/app/(cms)/_shared/model'

import useActiveMenu from '../model/useActiveMenu'

export default function SiderMenu() {
  const { pathname, isMenuActive } = useActiveMenu()

  return (
    <SidebarMenu>
      {ADMIN_MENU_ITEMS.map(item => {
        const isActive = isMenuActive(item)

        return (
          <Collapsible
            key={item.title}
            className='group/collapsible'
            defaultOpen={isActive} // 활성화된 메뉴는 기본적으로 열려있음
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton isActive={isActive}>
                  {item.icon && <item.icon />}
                  {item.title}
                  <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items?.length ? (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map(subItem => {
                      const isSubItemActive =
                        subItem.url && pathname === subItem.url

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={!!isSubItemActive}
                          >
                            <Link href={subItem.url!}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        )
      })}
    </SidebarMenu>
  )
}
