import express from "express";
import jwt from "jsonwebtoken";

import config from "../config.js";
import { FormIds } from "../lib/enums/index.js";
import { ObjectId } from "../lib/queries/index.js";
import { convertRoles } from "../lib/helper/index.js";

const router = express.Router();
const MS_TO_SECONDS_RATIO = 1000;

router.post("/login", async (req, res) => {
  try {
    const token = req.header("x-jwt-token");
    const { app } = req.body;

    if (!token || !app) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const secret = config.jwtSecretKey;
    const decoded = jwt.verify(token, secret);

    if (decoded.exp < Date.now() / MS_TO_SECONDS_RATIO) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    let apps = [];
    let user = decoded;

    user = await req.backend.models.Users.findOne({
      _id: ObjectId(user._id),
      deleted: null,
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    let response = { user };
    const roles = convertRoles(user.roles);
    if (roles.includes("admin")) {
      if (app === "Admin") {
        apps = await req.backend.models.Submissions.find({
          form: FormIds.APPLICATIONS_AGENT,
          deleted: null,
        }).select(["id", "data"]);
      } else if (app === "Customer") {
        apps = await req.backend.models.Submissions.find({
          form: FormIds.APPLICATIONS,
          deleted: null,
        }).select(["id", "data"]);
      } else if (app === "Employee") {
        //TODO
      }
    } else {
      if (app === "Admin") {
        apps = await req.backend.models.Submissions.find({
          form: FormIds.AGENT_SERVICES,
          deleted: null,
          role__in: roles,
        });
      } else if (app === "Customer") {
        apps = await req.backend.models.Submissions.find({
          form: FormIds.USER_SERVICES,
          deleted: null,
          "data.user._id": user._id,
        });
      } else if (app === "Employee") {
        apps = await req.backend.models.Submissions.find({
          form: FormIds.EMPLOYEE,
          deleted: null,
          "data.user._id": user._id,
        });
      }
    }

    response.apps = apps;
    delete response.user.data.password;
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
