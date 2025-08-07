const bcrypt = require("bcrypt");

async function hashing() {
  const password = "Savi@12!!30!";

  //   const hashpass = await bcrypt.hash(password, 10);

  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(password, salt);
  console.log(hashpass);

  const ans = await bcrypt.compare(password, hashpass);
  console.log(ans);
}
hashing();
