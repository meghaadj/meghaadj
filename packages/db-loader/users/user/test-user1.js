db.getCollection("users").insertOne({
  _id: ObjectId("65582b838cf5760a3862bdcc"),
  form: ObjectId("5d93f7b09e24a101001456be"),
  created: new Date(),
  modified: new Date(),
  deleted: null,
  data: {
    firstName: "Test User",
    lastName: "test user",
    email: "test-user@iwsaustralia.com.au",
    address: "150/40DE South Australia.",
    gender: "Male",
  },
  owner: ObjectId("641bde665badf30100610bf9"),
});
