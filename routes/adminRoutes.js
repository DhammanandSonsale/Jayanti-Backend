import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  const { userId, password } = req.body;

  if (userId === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid ID or password" });
  }
});

export default router;
