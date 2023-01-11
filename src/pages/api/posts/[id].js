import prisma from "../../../../lib/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getPost(req, res)
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}

async function getPost(req, res) {
  const { id } = req.query
  const body = req.body

  try {
    const post = await prisma.Post.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    return res.status(200).json(post, { success: true })
  } catch (error) {
    console.error("Request error", error)
    res.status(500).json({ error: "Error get post", success: false })
  }
}
