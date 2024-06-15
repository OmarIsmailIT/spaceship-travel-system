import express from "express";
const router = express.Router();

// mock list of valid user IDs
const validUserIds = ["user1", "user2", "user3"];

router.post("/login", (req, res) => {
  const { userId } = req.body;
  if (validUserIds.includes(userId)) {
    req.session.userId = userId;
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(400).json({ message: "Invalid user ID" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

export default router;
