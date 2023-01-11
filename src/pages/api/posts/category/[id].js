import prisma from "../../../../../lib/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getCategories(req, res)
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}

async function getCategories(req, res) {
  const { id } = req.query
  const body = req.body

  try {
    const allCategories = await prisma.Category.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    return res.status(200).json(allCategories, { success: true })
  } catch (error) {
    console.error("Request error", error)
    res.status(500).json({ error: "Error getting categories", success: false })
  }
}
