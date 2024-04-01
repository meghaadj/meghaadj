db.getCollection("forms").insertOne({
  _id: ObjectId("5d93f7b09e24a101001456be"),
  name: "user",
  path: "user",
  collectionName: "Users",
  useToasts: true,
  created: new Date(),
  modified: new Date(),
  deleted: null,
  components: [
    {
      type: "textfield",
      label: "First Name",
      key: "firstName",
      validate: {
        required: true,
        custom:
          "const re = /^[a-zA-Z'\\-\\s0-9]{2,}$/;\nvalid = (re.test(input)) ? true : 'Enter Valid First Name';",
      },
    },
    {
      type: "textfield",
      label: "Last Name",
      key: "lastName",
      validate: {
        required: true,
        custom:
          "const re = /^[a-zA-Z'\\-\\s0-9]{2,}$/;\nvalid = (re.test(input)) ? true : 'Enter Valid Last Name';",
      },
    },
    {
      type: "email",
      key: "email",
      label: "Email",
      validate: {
        custom:
          'const emailRegex = /^[^@]+@([^@.]+\\.)+[^@.]+$/;\nif (emailRegex.test(input)) {\n  valid = true;\n} else {\n  valid = "Invalid Email";\n}',
        required: true,
      },
    },
    {
      type: "textarea",
      key: "address",
      label: "Address",
      validate: {
        required: true,
      },
    },
    {
      type: "select",
      label: "Gender",
      key: "gender",
      data: {
        values: [
          {
            value: "male",
            label: "Male",
          },
          {
            value: "female",
            label: "Female",
          },
          {
            value: "other",
            label: "Other",
          },
        ],
      },
      validate: {
        required: true,
      },
    },
    {
      type: "button",
      label: "Submit",
      key: "submit",
      action: "submit",
      theme: "primary",
    },
  ],
  access: [],
  version: 0.1,
  tags: [],
  actions: [],
});
