import express from "express";
import formRoutes from "./form.js";

const router = express.Router();

router.use("/form", formRoutes);

router.get("/", function (_req, res) {
  res.json({ response: "Nothing to see" });
});

export default router;
