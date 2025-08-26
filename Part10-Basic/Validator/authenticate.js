const validator = require("validator");


async function validUser(data) {
  
        const mandatoryFields = ["name", "password", "emailId"];
        const IsAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k))

        if (!IsAllowed) throw new Error("Field is missing");

        if (!(data.name.length >= 3 && data.name.length <= 20)) throw new Error("name have atleast three character")

        if (!(validator.isEmail(data.emailId))) throw new Error("Write right email")

        if (!(validator.isStrongPassword(data.password))) throw new Error("enter strong password")

}

module.exports = validUser;