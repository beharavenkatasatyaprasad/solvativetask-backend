const express = require("express");
const reviews = require("../models/review");
const router = express.Router();

router.post("/new", async (req, res) => {
  //create
  try {
    const { title, content } = req.body;

    const reviewInstance = new reviews({
      title,
      content,
    });

    await reviewInstance.save();

    res.json({ success: true });
  } catch (err) {
    console.trace(err);
    res.json({ success: false });
  }
});

router.post("/read", async (req, res) => {
  //read
  try {
    const { query } = req.body;

    let where = {};

    if (query) where._id = query;

    const result = await reviews.find(where);

    res.json({ success: true, result });
  } catch (err) {
    console.trace(err);
    res.json({ success: false });
  }
});

router.post("/update", async (req, res) => {
  //update
  try {
    const { review } = req.body;

    let where = {};

    if (review && review._id) where._id = review._id;

    const result = await reviews.findOne(where);
    if (result) {
        console.log(review);
      if (review && review.title) result.title = review.title;
      if (review && review.content) result.content = review.content;

      await result.save();
      res.json({ success: true });
    }
  } catch (err) {
    console.trace(err);
    res.json({ success: false });
  }
});

router.post("/delete", async (req, res) => {
  //delete
  try {
    const { review } = req.body;

    let where = {};

    if (review && review._id) where._id = review._id;

    await reviews.deleteOne(where);

    res.json({ success: true });
  } catch (err) {
    console.trace(err);
    res.json({ success: false });
  }
});
module.exports = router;
