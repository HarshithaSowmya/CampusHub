// routes/events.js — UPDATED (adds PUT /events/:id for edit)
module.exports = (upload) => {
  const router = require("express").Router();
  const Event = require("../models/Event");

  // TEST
  router.get("/test", (req, res) => {
    res.send("Events working");
  });

  // CREATE EVENT WITH IMAGE
  router.post("/", upload.single("image"), async (req, res) => {
    try {
      const event = new Event({
        title:       req.body.title,
        description: req.body.description,
        location:    req.body.location,
        date:        req.body.date,
        tips:        req.body.tips,
        image:       req.file ? req.file.filename : ""
      });
      await event.save();
      res.json(event);
    } catch (err) {
      console.log(err);
      res.status(500).json("Error saving event");
    }
  });

  // GET ALL EVENTS
  router.get("/", async (req, res) => {
    const events = await Event.find();
    res.json(events);
  });

  // ✅ UPDATE EVENT (new route needed for edit)
  router.put("/:id", upload.single("image"), async (req, res) => {
    try {
      const updates = {
        title:       req.body.title,
        description: req.body.description,
        location:    req.body.location,
        date:        req.body.date,
        tips:        req.body.tips,
      };
      if (req.file) updates.image = req.file.filename;

      const event = await Event.findByIdAndUpdate(req.params.id, updates, { new: true });
      res.json(event);
    } catch (err) {
      res.status(500).json("Error updating event");
    }
  });

  // DELETE EVENT
  router.delete("/:id", async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json("Event deleted");
  });

  return router;
};
