const env = process.env.ENV || "LOCAL";
const config = {
  apiLimit: 10_000,
  bcryptSaltRounds: 10,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  port: process.env.PORT || "4001",
  mongo: process.env.MONGO_URL || "",
  runnerUrl: process.env.RUNNER_URL || "http://localhost:4001/iws",
  env,
  disableLocalhost: env === "LOCAL" ? false : true,
};

export default config;
