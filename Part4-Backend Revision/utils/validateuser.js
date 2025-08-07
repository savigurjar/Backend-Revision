const validator = require("validator");

async function validateuser(data) {
  const mandatoryField = ["name", "emailId", "password", "gender"];
  const IsAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));
  if (!IsAllowed) throw new Error("field is missing");

  //   password validation
  if (!validator.isStrongPassword(data.password))
    throw new Error("weak password");

  //  name validation
  if (!(data.name.length >= 3 && data.name.length <= 20))
    throw new Error("Enter name at least have 3 or more character");

  //   email id validation
  if (!validator.isEmail(data.emailId)) throw new Error("Enter valid email id");
}
module.exports = validateuser;
