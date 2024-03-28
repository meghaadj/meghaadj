const env = process.env.ENV || "LOCAL";
const config = {
  apiLimit: 10_000,
  bcryptSaltRounds: 10,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  port: process.env.PORT || "4001",
  mongo: process.env.MONGO_URL || "",
  env,
  disableLocalhost: env === "LOCAL" ? false : true,
};

export default config;
