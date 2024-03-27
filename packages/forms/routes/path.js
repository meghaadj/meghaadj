import express from "express";

import { authenticateToken } from "../middlewares/index.js";

import {
  getFormById,
  getAllSubmissionsById,
  getSubmissionById,
  editSubmissionById,
  createSubmissionById,
  getFormIdByPath,
  deleteSubmissionById,
} from "../src/index.js";

const router = express.Router();

// returns json of a form
router.get("/:path", authenticateToken, async (req, res) => {
  req.params.id = await getFormIdByPath(req, res);
  getFormById(req, res);
});

// get all submissions form a form
router.get("/:path/submissions", authenticateToken, async (req, res) => {
  req.params.id = await getFormIdByPath(req, res);
  getAllSubmissionsById(req, res);
});

// get a submission
router.get("/:path/submission/:sub", authenticateToken, async (req, res) => {
  req.params.id = await getFormIdByPath(req, res);
  getSubmissionById(req, res);
});

// edit a submission
router.put("/:path/submission/:sub", authenticateToken, async (req, res) => {
  req.params.id = await getFormIdByPath(req, res);
  editSubmissionById(req, res);
});

// edit a submission
router.delete("/:path/submission/:sub", authenticateToken, async (req, res) => {
  req.params.id = await getFormIdByPath(req, res);
  deleteSubmissionById(req, res);
});

// create a submission
router.post("/:path", authenticateToken, async (req, res) => {
  req.params.id = await getFormIdByPath(req, res);
  createSubmissionById(req, res);
});

export default router;
