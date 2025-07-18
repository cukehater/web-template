import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    const email = 'admin@example.com'
    const password = 'admin123'
    const name = '관리자'

    // 기존 사용자 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('관리자 사용자가 이미 존재합니다.')
      return
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 12)

    // 관리자 사용자 생성
    const adminUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN',
      },
    })

    console.log('관리자 사용자가 생성되었습니다:')
    console.log('이메일:', adminUser.email)
    console.log('이름:', adminUser.name)
    console.log('역할:', adminUser.role)
    console.log('비밀번호:', password)
  } catch (error) {
    console.error('관리자 사용자 생성 중 오류 발생:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()
