import Link from 'next/link'
import { ADMIN_MENU_ITEMS } from '@/app/(cms)/_entities'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/app/(cms)/_shared'
import { ChevronRight } from 'lucide-react'

export default function SiderContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {ADMIN_MENU_ITEMS.map((item, index) => (
            <Collapsible
              key={item.title}
              defaultOpen={index === 0}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    {item.icon && <item.icon />}
                    {item.title}
                    <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map(item => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild isActive={true}>
                            <Link href={item.url!}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  )
}
