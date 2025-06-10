import express from "express";

const router = express.Router();

// placeholder
router.route("/").get((req, res) => res.send("EpiMap: Trang chủ mặc định"));

export default router;
