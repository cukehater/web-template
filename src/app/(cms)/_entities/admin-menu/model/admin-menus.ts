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
    items: [
      {
        title: '회사 소개',
        url: '/',
      },
      {
        title: '제품 소개',
        url: '/',
      },
      {
        title: '연혁',
        url: '/',
      },
      {
        title: 'News',
        url: '/',
      },
      {
        title: 'Gallery',
        url: '/',
      },
      {
        title: 'Contact',
        url: '/',
      },
    ],
  },
  {
    title: '템플릿',
    icon: LayoutPanelTop,
    items: [
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
