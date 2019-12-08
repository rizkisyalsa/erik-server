const auth = require("../auth/migration")

let migration = async () => {
  await auth.migration();
};

migration();