import express from "express";

import authRoutes from "./auth.js";
import formRoutes from "./form.js";
import pathRoutes from "./path.js";

const router = express.Router();

router.use("/", authRoutes);
router.use("/form", formRoutes);
router.use("/path", pathRoutes);

router.get("/", function (_req, res) {
  res.json({ response: "Nothing to see" });
});

export default router;
