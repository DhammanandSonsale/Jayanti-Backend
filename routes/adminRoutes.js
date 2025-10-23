import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { userId, password } = req.body;

  if (userId === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid ID or password" });
  }
});

export default router;
