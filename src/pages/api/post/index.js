import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getPosts(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function getPosts(req, res) {
  const body = req.body;
  try {
    const allPosts = await prisma.Product.findMany();
    return res.status(200).json(allPosts, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error getting posts", success: false });
  }
}
