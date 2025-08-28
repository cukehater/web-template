import {
  ChartNoAxesCombined,
  Cog,
  FileText,
  Image,
  LayoutPanelTop,
  PictureInPicture2,
  UserCog,
} from 'lucide-react'

import { MenuItemType } from './types'

export const ADMIN_MENUS: MenuItemType[] = [
  {
    title: '사이트 기본 설정',
    url: '/admin/basic',
    icon: Cog,
  },
  {
    title: '관리자 계정 관리',
    url: '/admin/account',
    icon: UserCog,
  },
  {
    title: '메인 배너 관리',
    url: '/admin/banner',
    icon: Image,
  },
  {
    title: '팝업 관리',
    url: '/admin/popup',
    icon: PictureInPicture2,
  },
  {
    title: '접속 통계',
    url: '/admin/statistics',
    icon: ChartNoAxesCombined,
  },
  {
    title: '콘텐츠 관리',
    icon: FileText,
    url: '#',
  },
  {
    title: '템플릿',
    icon: LayoutPanelTop,
    url: '/admin/templates',
    items: [
      {
        title: '일반 게시판',
        url: '/admin/templates/general',
      },
      {
        title: '갤러리 게시판',
        url: '/admin/templates/gallery',
      },
      {
        title: '연혁',
        url: '/admin/templates/history',
      },
      {
        title: '캘린더',
        url: '/admin/templates/calendar',
      },
      {
        title: '문의',
        url: '/admin/templates/contact',
      },
    ],
  },
]
