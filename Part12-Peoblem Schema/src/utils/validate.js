
const validator = require("validator")
async function validateUser (data){
 
    const mandatoryField = ["firstname","emailId","password"];

    const IsallField = mandatoryField.every((k)=>Object.keys(data).includes(k));
    if(!IsallField) throw new Error("Fields are missing");

    const {firstname,emailId,password} = data;

    if(!(firstname.length>=3 && firstname<=20)) throw new Error("name have atleast 3 and more characters");

    if(!validator.isEmail(emailId)) throw new Error("Enter right email");

    if(!validator.isStrongPassword(password)) throw new Error("Enter strong password");

}
module.exports = validateUser;