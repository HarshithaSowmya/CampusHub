const router = require("express").Router();
const Registration = require("../models/Registration");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Registration API working");
});

// REGISTER
router.post("/", async (req, res) => {
  const { userId, eventId } = req.body;

  const already = await Registration.findOne({ userId, eventId });

  if (already) {
    return res.status(400).json("Already Registered");
  }

  const reg = new Registration({ userId, eventId });
  await reg.save();

  res.json("Registered Successfully");
});

// COUNT
router.get("/:eventId", async (req, res) => {
  const count = await Registration.countDocuments({
    eventId: req.params.eventId
  });

  res.json({ count });
});

module.exports = router;
