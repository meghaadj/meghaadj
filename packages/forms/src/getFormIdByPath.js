const getFormIdByPath = async (req, res) => {
  if (!req.params.path) {
    throw "No Path. Unable to get form id";
  }

  const form = await req.backend.models.Forms.find({
    path: req.params.path,
  }).select({ _id: 1 });

  return form[0]._id.toString();
};

export default getFormIdByPath;
