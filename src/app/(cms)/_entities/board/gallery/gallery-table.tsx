'use client'

import { formatDate } from 'date-fns'
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Image,
  MoreHorizontal,
  SquarePen,
  Trash2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ALERT_MESSAGE, cn, infoToast } from '@/app/(cms)/_shared/lib'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(cms)/_shared/shadcn'

export default function GalleryTable() {
  const router = useRouter()
  const [data, setData] = useState([
    {
      id: '1',
      imageUrl: 'https://picsum.photos/200/300',
      title: '111111111111111111111',
      link: '#',
      createdAt: new Date(),
      isActive: false,
      order: 12,
    },
    {
      id: '2',
      imageUrl: '',
      title: '2222222222222222222',
      link: '#',
      createdAt: new Date('2025-08-21'),
      isActive: false,
      order: 2,
    },
    {
      id: '3',
      imageUrl: 'https://picsum.photos/200/300',
      title: '33333333333333333333333333',
      link: '#',
      createdAt: new Date('2025-08-21'),
      isActive: true,
      order: 3,
    },
    {
      id: '4',
      imageUrl: 'https://picsum.photos/200/300',
      title: '44444444444444444444444444',
      link: '#',
      createdAt: new Date(),
      isActive: false,
      order: 4,
    },
    {
      id: '5',
      imageUrl: '',
      title: '55555555555555555555555555',
      link: '#',
      createdAt: new Date('2025-08-21'),
      isActive: false,
      order: 5,
    },
    {
      id: '6',
      imageUrl: 'https://picsum.photos/200/300',
      title: '66666666666666666666666666',
      link: '#',
      createdAt: new Date('2025-08-21'),
      isActive: true,
      order: 6,
    },
    {
      id: '7',
      imageUrl: 'https://picsum.photos/200/300',
      title: '77777777777777777777777777',
      link: '#',
      createdAt: new Date(),
      isActive: false,
      order: 7,
    },
    {
      id: '8',
      imageUrl: '',
      title: '88888888888888888888888888',
      link: '#',
      createdAt: new Date('2025-08-21'),
      isActive: false,
      order: 8,
    },
    {
      id: '9',
      imageUrl: 'https://picsum.photos/200/300',
      title: '99999999999999999999999999',
      link: '#',
      createdAt: new Date('2025-08-21'),
      isActive: true,
      order: 9,
    },
    {
      id: '10',
      imageUrl: 'https://picsum.photos/200/300',
      title: '1010101010101010101010101010',
      link: '#',
      createdAt: new Date(),
      isActive: false,
      order: 10,
    },
    {
      id: '11',
      imageUrl: '',
      title: '1111111111111111111111111111',
      link: '#',
      createdAt: new Date('2025-08-21'),
      isActive: false,
      order: 11,
    },
    {
      id: '12',
      imageUrl: 'https://picsum.photos/200/300',
      title: '1212121212121212121212121212',
      link: '#',
      createdAt: new Date('2025-08-21'),
      isActive: true,
      order: 1,
    },
  ])

  // 순서 변경
  const handleOrderChange = (
    id: string,
    currentOrder: number,
    direction: 'up' | 'down',
  ) => {
    const isFirstItem = currentOrder === 1
    const isLastItem = currentOrder === data.length
    const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1

    if (
      (direction === 'up' && isFirstItem) ||
      (direction === 'down' && isLastItem)
    ) {
      const message =
        direction === 'up'
          ? ALERT_MESSAGE.ORDER_CHANGE_FIRST
          : ALERT_MESSAGE.ORDER_CHANGE_LAST
      infoToast(message)
      return
    }

    setData(prev => {
      const updatedData = prev.map(item => {
        // 교환할 아이템 찾기
        if (item.order === newOrder) {
          return { ...item, order: currentOrder }
        }

        if (item.id === id) {
          return { ...item, order: newOrder }
        }

        return item
      })

      return updatedData
    })
  }

  // 상태 변경
  const handleToggleActive = (id: string) => {
    setData(prev => {
      return prev.map(item => {
        if (item.id === id) {
          return { ...item, isActive: !item.isActive }
        }
        return item
      })
    })
  }

  // 삭제 후 순서 재정렬
  const handleDelete = (id: string) => {
    setData(prev =>
      prev
        .filter(item => item.id !== id)
        .map((item, index) => ({ ...item, order: index + 1 })),
    )
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/templates/gallery/edit/${id}`)
  }

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[60px]'>순서</TableHead>
              <TableHead className='w-[100px]'>상태</TableHead>
              <TableHead className='w-[100px]'>이미지</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className='w-[120px]'>작성일</TableHead>
              <TableHead className='w-[100px]'>작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              .toSorted((a, b) => a.order - b.order)
              .map(column => (
                <TableRow key={column.id}>
                  {/* 순서 */}
                  <TableCell>
                    <div className='flex flex-col items-center gap-2'>
                      <Button
                        className='p-1'
                        size={null}
                        variant='outline'
                        onClick={() =>
                          handleOrderChange(column.id, column.order, 'up')
                        }
                      >
                        <ChevronUp className='size-3' />
                      </Button>

                      <Button
                        className='p-1'
                        size={null}
                        variant='outline'
                        onClick={() =>
                          handleOrderChange(column.id, column.order, 'down')
                        }
                      >
                        <ChevronDown className='size-3' />
                      </Button>
                    </div>
                  </TableCell>

                  {/* 상태 */}
                  <TableCell className='text-center'>
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
                        column.isActive
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-red-50 text-red-700 border border-red-200',
                      )}
                    >
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full',
                          column.isActive ? 'bg-green-500' : 'bg-red-500',
                        )}
                      />
                      {column.isActive ? '활성' : '비활성'}
                    </div>
                  </TableCell>

                  {/* 이미지 */}
                  <TableCell>
                    <div className='relative rounded-md overflow-hidden'>
                      {column.imageUrl ? (
                        <img
                          alt={column.title}
                          className='w-full aspect-square object-cover'
                          src={column.imageUrl}
                        />
                      ) : (
                        <div className='w-full aspect-square bg-gray-100 rounded-md flex items-center justify-center'>
                          <Image className='size-4 text-gray-400' />
                        </div>
                      )}
                      {!column.isActive && (
                        <div className='absolute inset-0 bg-black/50 rounded flex items-center justify-center'>
                          <EyeOff className='size-4 text-white' />
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* 제목 */}
                  <TableCell>
                    <p className='font-medium'>{column.title}</p>
                  </TableCell>

                  {/* 작성일 */}
                  <TableCell>
                    <div className='flex gap-1 items-center justify-center'>
                      <Calendar className='size-3 text-muted-foreground' />
                      <span className='text-xs text-muted-foreground'>
                        {formatDate(column.createdAt, 'yyyy.MM.dd')}
                      </span>
                    </div>
                  </TableCell>

                  {/* 작업 */}
                  <TableCell className='text-center'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className='h-8 w-8 p-0' variant='ghost'>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                          onClick={() => {
                            handleToggleActive(column.id)
                          }}
                        >
                          {column.isActive ? (
                            <>
                              <EyeOff className='size-4' />
                              비활성화
                            </>
                          ) : (
                            <>
                              <Eye className='size-4' />
                              활성화
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(column.id)}>
                          <SquarePen />
                          편집
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='text-red-600'
                          onClick={() => handleDelete(column.id)}
                        >
                          <Trash2 />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className='mt-4'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive href='#'>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
