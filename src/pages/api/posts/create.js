import prisma from "../../../../lib/prisma"

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createPost(req, res)
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}

async function createPost(req, res) {
  const body = req.body
  try {
    const newPost = await prisma.Post.create({
      data: {
        title: body.title,
        description: body.description,
        category_id: parseInt(body.category_id),
      },
    })
    return res.status(200).json(newPost, { success: true })
  } catch (error) {
    console.error("Request error", error)
    res.status(500).json({ error: "Error creating post", success: false })
  }
}
