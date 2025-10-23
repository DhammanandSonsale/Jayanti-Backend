import express from "express"
import Member from "../models/Member.js"

const router = express.Router()

// Get all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ datePaid: -1 })
    res.json(members)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add new member
router.post("/", async (req, res) => {
  const member = new Member({
    name: req.body.name,
    amount: req.body.amount,
    datePaid: req.body.datePaid || new Date(),
  })

  try {
    const newMember = await member.save()
    res.status(201).json(newMember)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete member
router.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id)
    if (!member) return res.status(404).json({ message: "Member not found" })
    res.json({ message: "Member deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
