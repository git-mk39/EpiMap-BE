import express from "express";

const router = express.Router();

// placeholder
router.route("/").get((req, res) => res.send("EpiMap default landing page"));

export default router;
