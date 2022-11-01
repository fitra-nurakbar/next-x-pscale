import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    return await deletePost(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function deletePost(req, res) {
  const { id } = req.query;

  const body = req.body;

  try {
    const delPost = await prisma.Post.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error deleted post", success: false });
  }
}
