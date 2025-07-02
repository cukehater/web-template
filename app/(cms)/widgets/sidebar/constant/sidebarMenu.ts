export const sidebarMenu = [
  {
    key: '/admin',
    label: '기본 설정',
  },
  {
    key: '/admin/members',
    label: '회원 관리',
  },
  {
    key: '/admin/boards',
    label: '게시판 관리',
    children: [
      {
        key: '/admin/boards/1',
        label: '게시판 1',
      },
      {
        key: '/admin/boards/2',
        label: '게시판 2',
      },
      {
        key: '/admin/boards/3',
        label: '게시판 3',
      },
    ],
  },
  {
    key: '/admin/communities',
    label: '커뮤니티 관리',
  },
]
