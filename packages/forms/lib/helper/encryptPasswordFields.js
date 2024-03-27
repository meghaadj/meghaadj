import bcrypt from "bcrypt";

const encryptPasswordFields = async (form, data) => {
  const SALT_ROUNDS = 10;

  for (const component of form.components) {
    if (component.type !== "password") continue;

    const key = component.key;
    if (!data?.[key]) continue;

    const input = data[key];

    try {
      const hashedPassword = await bcrypt.hash(input, SALT_ROUNDS);
      data[key] = hashedPassword;
    } catch (error) {
      console.log("Error encrypting:", error);
      return;
    }
  }
};

export default encryptPasswordFields;
