import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    return await updatePost(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function updatePost(req, res) {
  const { id } = req.query;
  const body = req.body;

  try {
    const upPost = await prisma.Post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: body.title,
        description: body.description,
        category_id: parseInt(body.category_id),
      },
    });
    return res.status(200).json(upPost, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error updated post", success: false });
  }
}
