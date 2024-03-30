const getFormById = async (req, res) => {
  let form = await req.backend.models.Forms.findById(req.params.id);
  // console.log(req.backend.models.Forms);
  if (!form || !form.access) {
    return res.status(404).json({ error: "No form found" });
  }

  form = form.toObject();

  res.status(200).json({ form: form });
};

export default getFormById;
