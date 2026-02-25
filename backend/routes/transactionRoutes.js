import express from "express";
import Transaction from "../models/Transaction.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const transaction = await Transaction.create({
    user: req.user,
    ...req.body
  });

  res.json(transaction);
});

router.get("/", protect, async (req, res) => {
  const transactions = await Transaction.find({ user: req.user });
  res.json(transactions);
});

router.delete("/:id", protect, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;