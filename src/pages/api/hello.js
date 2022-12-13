export default function Index(req, res) {
    if(req.method === "POST") {
        return res.status(200).json({ message: "POST", success: true })
    } else if (req.method === "GET") {
        return res.status(200).json({ message: "GET", success: true })
    } else {
        return res.status(405).json({ message: "Method not allowed", success: false })
    }
}