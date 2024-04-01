db.getCollection("settings").insertMany([
  {
    _id: ObjectId("657932fda0cfa8f8f78d8530"),
    label: "SPECIAL_CHARS_WHITELIST",
    value: " \"'`,.@-()[]{}:;+",
    description: "Special characters that are allowed in text fields on forms.",
    created: new Date(),
    modified: new Date(),
    deleted: null,
  },
]);
