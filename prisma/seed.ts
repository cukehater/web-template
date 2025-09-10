import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 기존 데이터 삭제 (선택사항)
  await prisma.account.deleteMany()

  await Promise.all([
    prisma.account.create({
      data: {
        accountId: 'master',
        name: '마스터',
        password: await bcrypt.hash('master', 10) // 'password'
      }
    }),
    prisma.account.create({
      data: {
        accountId: 'admin',
        name: '관리자',
        password: await bcrypt.hash('admin', 10) // 'password'
      }
    }),
    prisma.account.create({
      data: {
        accountId: 'admin2',
        name: '관리자2',
        password: await bcrypt.hash('admin', 10) // 'password'
      }
    })
  ])

  await Promise.all([
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 1
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 2
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 3
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 4
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 5
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 6
      }
    }),

    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 7
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 8
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 9
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 10
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 11
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 12
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'test',
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: 13
      }
    })
  ])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
