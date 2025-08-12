const validator = require("validator");
async function validateUser(data) {
  const mandatoryFields = ["firstname", "lastname", "emailId", "password"];

  const IsAllowd = mandatoryFields.every((k) =>
    Object.keys(data).includes(k)
  );
  if (!IsAllowd) throw new Error("Fields are missing");

  //  firstname  and lastname
  if (
    !(
      data.firstname.length >= 3 &&
      data.firstname.length <= 20 &&
      data.lastname.length >= 3 &&
      data.lastname.length <= 20
    )
  )
    throw new Error(
      "Firstname and Lastname should be between 3 to 20 chararcters"
    );

  // password
  if (!validator.isStrongPassword(data.password))
    throw new Error("password is weak ");

  if (!validator.isEmail(data.emailId))
    throw new Error("Email is not valid");
}
module.exports = validateUser;
