import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 기존 데이터 삭제 (선택사항)
  await prisma.user.deleteMany()

  await Promise.all([
    prisma.user.create({
      data: {
        userId: 'master',
        name: '마스터',
        password: await bcrypt.hash('master', 10), // 'password'
      },
    }),
    prisma.user.create({
      data: {
        userId: 'admin',
        name: '관리자',
        password: await bcrypt.hash('admin', 10), // 'password'
      },
    }),
  ])

  await Promise.all([
    prisma.banner.create({
      data: {
        title: '메인 배너 - 신제품 출시',
        description: '새로운 제품이 출시되었습니다. 지금 확인해보세요!',
        imageUrl:
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
        linkUrl: 'https://example.com/new-product',
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
      },
    }),
    prisma.banner.create({
      data: {
        title: '특가 할인 이벤트',
        description: '한정 시간 특가 할인! 놓치지 마세요.',
        imageUrl:
          'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop',
        linkUrl: 'https://example.com/sale',
        order: 2,
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-06-30'),
      },
    }),
    prisma.banner.create({
      data: {
        title: '고객 서비스 안내',
        description: '24시간 고객 서비스를 이용하실 수 있습니다.',
        imageUrl:
          'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=400&fit=crop',
        linkUrl: 'https://example.com/customer-service',
        order: 3,
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
      },
    }),
    prisma.banner.create({
      data: {
        title: '시즌 한정 컬렉션',
        description: '봄 시즌 한정 컬렉션을 만나보세요.',
        imageUrl:
          'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop',
        linkUrl: 'https://example.com/spring-collection',
        order: 4,
        isActive: false, // 비활성화된 배너
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-05-31'),
      },
    }),
    prisma.banner.create({
      data: {
        title: '회원가입 혜택',
        description: '신규 회원가입 시 10% 할인 쿠폰을 드립니다.',
        imageUrl:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop',
        linkUrl: 'https://example.com/register',
        order: 5,
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
      },
    }),
    prisma.banner.create({
      data: {
        title: '무료 배송 이벤트',
        description: '5만원 이상 구매 시 무료 배송!',
        imageUrl:
          'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=400&fit=crop',
        linkUrl: 'https://example.com/free-shipping',
        order: 6,
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
      },
    }),
    prisma.banner.create({
      data: {
        title: '브랜드 스토리',
        description: '우리 브랜드의 이야기를 들어보세요.',
        imageUrl:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop',
        linkUrl: 'https://example.com/brand-story',
        order: 7,
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
      },
    }),
    prisma.banner.create({
      data: {
        title: '이벤트 종료 예정',
        description: '곧 종료되는 이벤트입니다. 서둘러 참여하세요!',
        imageUrl:
          'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop',
        linkUrl: 'https://example.com/ending-soon',
        order: 8,
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-02-29'), // 곧 종료되는 배너
      },
    }),
  ])

  await Promise.all([
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 1,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 2,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 3,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 4,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 5,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 6,
      },
    }),

    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 7,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 8,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 9,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 10,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 11,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 12,
      },
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        isVisible: true,
        order: 13,
      },
    }),
  ])
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
