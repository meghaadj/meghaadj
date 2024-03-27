const getSettings = async (req, label) => {
  try {
    const settings = req.backend.models.Settings;
    const document = await settings.findOne({
      label: label,
      deleted: null,
    });
    return document.value;
  } catch (error) {
    console.log("Error retrieving settings:", error);
    return null;
  }
};

export default getSettings;
