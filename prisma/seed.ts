import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 기존 데이터 삭제 (선택사항)
  await prisma.account.deleteMany()
  await prisma.gallery.deleteMany()
  await prisma.general.deleteMany()

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

  for (let i = 1; i <= 32; i++) {
    await prisma.gallery.create({
      data: {
        title: `갤러리 게시판 테스트 ${i}`,
        content: 'test',
        thumbnail: '',
        writer: '관리자',
        isVisible: true,
        order: i
      }
    })

    await prisma.general.create({
      data: {
        title: `일반 게시판 테스트 ${i}`,
        content: 'test',
        writer: '관리자',
        isVisible: true,
        order: i
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
