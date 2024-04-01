import express from "express";

import { getFormById, createSubmissionById } from "../src/index.js";

const router = express.Router();

// returns json of a form
router.get("/:id", async (req, res) => {
  getFormById(req, res);
});

// create a submission
router.post("/:id", async (req, res) => {
  createSubmissionById(req, res);
});

export default router;
