const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()

async function seed() {
  const password = await bcrypt.hash('123', 8)

  const createdUser = await prisma.user.create({
    data: {
      email: 'mario_italy@email.com',
      password: password
    }
  })

  const adminUser = await prisma.user.create({
    data: {
      email: 'deandangerous@admin.com',
      password: password
    }
  })
}

seed().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
