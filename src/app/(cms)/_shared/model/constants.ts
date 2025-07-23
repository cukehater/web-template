import { LayoutPanelTop, Settings } from 'lucide-react'

import { MenuItemType } from './type'

export const ADMIN_MENU_ITEMS: MenuItemType[] = [
  {
    title: '시스템 설정',
    icon: Settings,
    items: [
      {
        title: '사이트 기본 설정',
        url: '/admin/settings/basic',
      },
      {
        title: '관리자 계정 관리',
        url: '/admin/settings/account',
      },
      {
        title: '팝업 관리',
        url: '/admin/settings/popup',
      },
      {
        title: '접속 통계 관리',
        url: '/admin/settings/statistics',
      },
    ],
  },
  {
    title: '템플릿',
    icon: LayoutPanelTop,
    items: [
      {
        title: '메인 배너 관리',
        url: '/admin/templates/main-banner',
      },
      {
        title: '연혁 관리',
        url: '/admin/templates/history',
      },
      {
        title: '일반 게시판 관리',
        url: '/admin/templates/board',
      },
      {
        title: '갤러리 게시판 관리',
        url: '/admin/templates/gallery',
      },
      {
        title: '캘린더 관리',
        url: '/admin/templates/calendar',
      },
    ],
  },
]
