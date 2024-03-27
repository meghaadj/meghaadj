import { ObjectId } from "../queries/index.js";

const FormIds = {
  ACCOUNT: ObjectId("57919c3d4589dc01005f1a0e"),
  ADMIN: ObjectId("5730e7135c676f6f56bd7267"),
  AGENT: ObjectId("583b17760401970100604516"),
  AGENT_SERVICES: ObjectId("65d96c9f57d6c9010060d2ae"),
  APPLICATIONS: ObjectId("57b371e4733cfa01001f7b5e"),
  APPLICATIONS_AGENT: ObjectId("65dbcda5e502640100b31638"),
  EMAIL_TEMPLATE: ObjectId("5946cd9e4b8cb19c64ce6144"),
  EMPLOYEE: ObjectId("5747b51f310a5c01007d84e9"),
  LOCATION: ObjectId("601b577cb32d2800180fdb0a"),
  ONBOARDING: ObjectId("6125b39072d455437945b7d8"),
  SYSTEM_USER: ObjectId("5c638dc4e114320100d0a268"),
  USER: ObjectId("5d93f7b09e24a101001456be"), //actually user refactor
  USER_SERVICES: ObjectId("5d9400bb9e24a101001456c9"),
};

export default FormIds;
