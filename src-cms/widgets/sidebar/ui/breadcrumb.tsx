'use client'

import {
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarTrigger
} from '@cms/shared/shadcn'
import React from 'react'
import { v4 as uuid } from 'uuid'

import { useBreadcrumbPath } from '../models/use-breadcrumb-path'

export default function Breadcrumb() {
  const { breadcrumbPath } = useBreadcrumbPath()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-8">
      <SidebarTrigger className="-ml-1" />
      <Separator className="mr-2 data-[orientation=vertical]:h-4" orientation="vertical" />
      <BreadcrumbList>
        {breadcrumbPath?.parent.map((item) => (
          <React.Fragment key={uuid()}>
            <BreadcrumbItem>
              <BreadcrumbPage>{item}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem key={uuid()}>
          <BreadcrumbPage>{breadcrumbPath?.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </header>
  )
}
