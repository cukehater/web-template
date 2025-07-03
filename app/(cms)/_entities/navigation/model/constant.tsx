import { FileZipOutlined, SettingOutlined } from '@ant-design/icons'
import { MenuItem } from './types'

export const ADMIN_MENU_ITEMS: MenuItem[] = [
  {
    key: 'settings',
    label: '시스템 설정',
    icon: <SettingOutlined />,
    children: [
      {
        key: 'basic',
        label: '기본 설정 관리',
      },
      {
        key: 'account',
        label: '관리자 계정 관리',
      },
      {
        key: 'popup',
        label: '팝업 관리',
      },
      {
        key: 'statistics',
        label: '접속 통계 관리',
      },
    ],
  },
  {
    key: 'templates',
    label: '템플릿',
    icon: <FileZipOutlined />,
    children: [
      {
        key: 'main-banner',
        label: '메인 배너 관리',
      },
      {
        key: 'history',
        label: '연혁 관리',
      },
      {
        key: 'board',
        label: '일반 게시판 관리',
      },
      {
        key: 'gallery',
        label: '갤러리 게시판 관리',
      },
      {
        key: 'calendar',
        label: '캘린더 관리',
      },
    ],
  },
]
