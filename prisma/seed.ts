import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 기존 데이터 삭제 (선택사항)
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // 사용자 생성
  const user1 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: '관리자',
      password: await bcrypt.hash('password', 10), // 'password'
      role: 'ADMIN',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: '일반사용자',
      password: await bcrypt.hash('password', 10), // 'password'
      role: 'USER',
    },
  })

  // 게시물 생성
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: '첫 번째 게시물',
        content: '안녕하세요! 이것은 첫 번째 게시물입니다.',
        author: user1.id,
        isPublished: true,
      },
    }),
    prisma.post.create({
      data: {
        title: '두 번째 게시물',
        content: '두 번째 게시물의 내용입니다.',
        author: user2.id,
        isPublished: false,
      },
    }),
    prisma.post.create({
      data: {
        title: '공지사항',
        content: '중요한 공지사항입니다.',
        author: user1.id,
        isPublished: true,
      },
    }),
  ])

  console.log('Seed 완료!')
  console.log('생성된 사용자:', { user1: user1.email, user2: user2.email })
  console.log('생성된 게시물:', posts.length, '개')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
