import prisma from "../lib/prisma.js"
import { categories, posts } from "./data.js"

const load = async () => {
  try {
    await prisma.category.deleteMany()
    console.log("Deleted records in category table")

    await prisma.post.deleteMany()
    console.log("Deleted records in post table")

    await prisma.$queryRaw`ALTER TABLE Post AUTO_INCREMENT = 1`
    console.log("reset post auto increment to 1")

    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
    console.log("reset category auto increment to 1")

    await prisma.Category.createMany({
      data: categories,
    })
    console.log("Added category data")

    await prisma.Post.createMany({
      data: posts,
    })
    console.log("Added post data")
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
