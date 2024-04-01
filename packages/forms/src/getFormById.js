import { getSettings } from "../lib/queries/index.js";

const getFormById = async (req, res) => {
  let form = await req.backend.models.Forms.findById(req.params.id);

  if (!form || !form.access) {
    return res.status(404).json({ error: "No form found" });
  }

  const specialCharsWhitelist = await getSettings(
    req,
    "SPECIAL_CHARS_WHITELIST"
  );

  form = form.toObject();
  form.specialCharsWhitelist = specialCharsWhitelist;

  res.status(200).json({ form: form });
};

export default getFormById;
