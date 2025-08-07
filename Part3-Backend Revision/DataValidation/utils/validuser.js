const validator = require("validator");

async function validuser(data) {
  const mandatoryField = ["firstname", "age", "emailId","password"];
  const IsAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));
  if (!IsAllowed) {
    throw new Error("Missing Fields");
  }

  //   password validation
  if (!validator.isStrongPassword(data.password)) {
    throw new Error("weak password");
  }
  if (!validator.isEmail(data.emailId)) {
    throw new Error("invalid email");
  }
// Name length validation
  if (!(data.firstname.length >= 3 && data.firstname.length <= 20)) {
    throw new Error("name should have at least 3 characters and max 20");
  }
}
module.exports = validuser;
