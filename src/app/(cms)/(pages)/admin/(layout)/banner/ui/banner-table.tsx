'use client'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(cms)/shared/shadcn'
import { Button } from '@/app/(cms)/shared/shadcn'
import { Badge } from '@/app/(cms)/shared/shadcn'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/app/(cms)/shared/shadcn'

import BannerForm from './banner-form'

interface Banner {
  id: string
  title: string
  description?: string | null
  imageUrl: string
  linkUrl?: string | null
  order: number
  isActive: boolean
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
}

interface BannerTableProps {
  initialData: Banner[]
  onEdit?: (banner: Banner) => void
  onDelete?: (id: string) => void
  onToggleActive?: (id: string, isActive: boolean) => void
}

export default function BannerTable({
  initialData,
  onDelete,
  onToggleActive,
}: BannerTableProps) {
  const [banners, setBanners] = useState<Banner[]>(initialData)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null)

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/banner/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...banners.find(b => b.id === id),
          isActive: !currentActive,
        }),
      })

      if (response.ok) {
        setBanners(prev =>
          prev.map(banner =>
            banner.id === id ? { ...banner, isActive: !currentActive } : banner,
          ),
        )
        onToggleActive?.(id, !currentActive)
      }
    } catch (error) {
      console.error('배너 상태 변경 오류:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 배너를 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/banner/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setBanners(prev => prev.filter(banner => banner.id !== id))
        onDelete?.(id)
      }
    } catch (error) {
      console.error('배너 삭제 오류:', error)
    }
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setIsEditSheetOpen(true)
  }

  const handleEditSuccess = () => {
    setIsEditSheetOpen(false)
    setEditingBanner(null)
    // 페이지 새로고침으로 최신 데이터 가져오기
    window.location.reload()
  }

  const handleOrderChange = async (id: string, direction: 'up' | 'down') => {
    const currentBanner = banners.find(b => b.id === id)
    if (!currentBanner) return

    const currentIndex = banners.findIndex(b => b.id === id)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= banners.length) return

    const targetBanner = banners[newIndex]
    const newOrder = targetBanner.order
    const targetNewOrder = currentBanner.order

    setUpdatingOrder(id)

    try {
      // 두 배너의 순서를 동시에 업데이트
      await Promise.all([
        fetch(`/api/banner/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...currentBanner, order: newOrder }),
        }),
        fetch(`/api/banner/${targetBanner.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...targetBanner, order: targetNewOrder }),
        }),
      ])

      // 로컬 상태 업데이트
      setBanners(prev => {
        const newBanners = [...prev]
        newBanners[currentIndex] = { ...currentBanner, order: newOrder }
        newBanners[newIndex] = { ...targetBanner, order: targetNewOrder }
        return newBanners.sort((a, b) => a.order - b.order)
      })
    } catch (error) {
      console.error('순서 변경 오류:', error)
    } finally {
      setUpdatingOrder(null)
    }
  }

  const isBannerExpired = (endDate: Date) => {
    return endDate < new Date()
  }

  const isBannerNotStarted = (startDate: Date) => {
    return startDate > new Date()
  }

  const getBannerStatus = (banner: Banner) => {
    if (!banner.isActive) return '비활성'
    if (isBannerExpired(banner.endDate)) return '만료됨'
    if (isBannerNotStarted(banner.startDate)) return '대기중'
    return '활성'
  }

  const getBannerStatusVariant = (banner: Banner) => {
    if (!banner.isActive) return 'secondary'
    if (isBannerExpired(banner.endDate)) return 'destructive'
    if (isBannerNotStarted(banner.startDate)) return 'outline'
    return 'default'
  }

  const sortedBanners = [...banners].sort((a, b) => a.order - b.order)

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[80px]'>순서</TableHead>
              <TableHead className='w-[120px]'>이미지</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className='w-[200px]'>설명</TableHead>
              <TableHead className='w-[100px]'>링크</TableHead>
              <TableHead className='w-[120px]'>기간</TableHead>
              <TableHead className='w-[80px]'>상태</TableHead>
              <TableHead className='w-[140px]'>작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBanners.map((banner, index) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className='flex flex-col items-center gap-1'>
                    <div className='font-medium'>{banner.order}</div>
                    <div className='flex gap-1'>
                      <Button
                        className='h-6 w-6 p-0'
                        disabled={index === 0 || updatingOrder === banner.id}
                        size='sm'
                        variant='ghost'
                        onClick={() => handleOrderChange(banner.id, 'up')}
                      >
                        <ArrowUp className='h-3 w-3' />
                      </Button>
                      <Button
                        className='h-6 w-6 p-0'
                        disabled={
                          index === sortedBanners.length - 1 ||
                          updatingOrder === banner.id
                        }
                        size='sm'
                        variant='ghost'
                        onClick={() => handleOrderChange(banner.id, 'down')}
                      >
                        <ArrowDown className='h-3 w-3' />
                      </Button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='relative'>
                    <img
                      alt={banner.title}
                      className='w-20 h-12 object-cover rounded border'
                      src={banner.imageUrl}
                    />
                    {!banner.isActive && (
                      <div className='absolute inset-0 bg-black/50 rounded flex items-center justify-center'>
                        <EyeOff className='size-4 text-white' />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='font-medium'>{banner.title}</div>
                    <div className='text-xs text-muted-foreground'>
                      ID: {banner.id.slice(-8)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className='text-sm text-muted-foreground max-w-[200px] truncate'>
                  {banner.description || '-'}
                </TableCell>
                <TableCell>
                  {banner.linkUrl ? (
                    <a
                      className='text-blue-600 hover:underline text-sm inline-flex items-center gap-1'
                      href={banner.linkUrl}
                      rel='noopener noreferrer'
                      target='_blank'
                      title={banner.linkUrl}
                    >
                      <ExternalLink className='h-3 w-3' />
                      링크
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <div className='text-sm space-y-1'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-3 w-3 text-muted-foreground' />
                      <span className='text-xs'>
                        {format(banner.startDate, 'MM/dd', {
                          locale: ko,
                        })}
                      </span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-3 w-3 text-muted-foreground' />
                      <span className='text-xs'>
                        {format(banner.endDate, 'MM/dd', {
                          locale: ko,
                        })}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getBannerStatusVariant(banner)}>
                    {getBannerStatus(banner)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex gap-1'>
                    <Button
                      size='sm'
                      title={banner.isActive ? '비활성화' : '활성화'}
                      variant='ghost'
                      onClick={() =>
                        handleToggleActive(banner.id, banner.isActive)
                      }
                    >
                      {banner.isActive ? (
                        <EyeOff className='size-4' />
                      ) : (
                        <Eye className='size-4' />
                      )}
                    </Button>

                    <Button
                      size='sm'
                      title='편집'
                      variant='ghost'
                      onClick={() => handleEdit(banner)}
                    >
                      <Edit className='size-4' />
                    </Button>

                    <Button
                      size='sm'
                      title='삭제'
                      variant='ghost'
                      onClick={() => handleDelete(banner.id)}
                    >
                      <Trash2 className='size-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 편집 시트 */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className='w-full max-h-full overflow-y-auto'>
          <SheetHeader>
            <SheetTitle>배너 편집</SheetTitle>
            <SheetDescription>배너 정보를 수정합니다.</SheetDescription>
          </SheetHeader>
          {editingBanner && (
            <BannerForm
              banner={editingBanner}
              onCancel={() => setIsEditSheetOpen(false)}
              onSuccess={handleEditSuccess}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
