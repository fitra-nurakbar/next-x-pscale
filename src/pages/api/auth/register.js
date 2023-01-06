import prisma from "../../../../lib/prisma"

const Login = (req, res) => {
    if(req.method !== "POST") return res.status(401).json({ message: "Method not allowed", success: false })

}

export default Login