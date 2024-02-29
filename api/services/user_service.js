const UserSelection = require("../database/models/UserSelection");

const getSelectionsForUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userSelection = await UserSelection.findOne({
        user: user,
      }).populate("selections");
      resolve(userSelection);
    } catch (e) {
      reject(new Error("Error getting user selection"));
    }
  });
};

module.exports = {
  getSelectionsForUser,
};
