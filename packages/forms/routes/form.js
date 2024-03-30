import express from "express";

import {
  getFormById,
  // getAllSubmissionsById,
  // getSubmissionById,
  // editSubmissionById,
  createSubmissionById,
  // deleteSubmissionById,
} from "../src/index.js";

const router = express.Router();

// returns json of a form
router.get("/:id", async (req, res) => {
  getFormById(req, res);
});

// get all submissions form a form
// router.get("/:id/submissions", async (req, res) => {
//   getAllSubmissionsById(req, res);
// });

// get a submission
// router.get("/:id/submission/:sub", async (req, res) => {
//   getSubmissionById(req, res);
// });

// edit a submission
// router.put("/:id/submission/:sub", async (req, res) => {
//   editSubmissionById(req, res);
// });

// delete a submission
// router.delete("/:id/submission/:sub", async (req, res) => {
//   deleteSubmissionById(req, res);
// });

// create a submission
router.post("/:id", async (req, res) => {
  createSubmissionById(req, res);
});

export default router;
