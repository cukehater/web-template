import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 기존 데이터 삭제 (선택사항)
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // 사용자 생성
  const admins = await Promise.all([
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

  // 게시물 생성
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: '첫 번째 게시물',
        content: '안녕하세요! 첫 번째 게시물입니다.',
        author: admins[0].id,
        isPublished: true,
      },
    }),
    prisma.post.create({
      data: {
        title: '두 번째 게시물',
        content: '두 번째 게시물의 내용입니다.',
        author: admins[1].id,
        isPublished: false,
      },
    }),
    prisma.post.create({
      data: {
        title: '공지사항',
        content: '중요한 공지사항입니다.',
        author: admins[0].id,
        isPublished: true,
      },
    }),
  ])

  console.log('Seed 완료!')
  console.log('생성된 사용자:', {
    master: admins[0].userId,
    admin: admins[1].userId,
  })
  console.log(`생성된 게시물: ${posts.length}개`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
