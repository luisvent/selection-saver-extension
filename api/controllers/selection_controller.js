const userService = require("../services/user_service");
const UserSelection = require("../database/models/UserSelection");
const Selection = require("../database/models/Selection");
const { error, success, bad } = require("node-http-response-wrapper");

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const list = async (req, res) => {
  if (!req.query.token) {
    return error(res, "no token specified");
  }

  const page = req.query.page || 1;
  const itemsPerPage = 15;

  const userSelections = await userService.getSelectionsForUser(
    req.query.token
  );

  const selections = (
    userSelections ? userSelections.selections : []
  ).reverse();

  const pages = chunk(selections, itemsPerPage);

  const pageSelection =
    pages.length > page ? pages[page - 1] : pages[pages.length - 1];

  return success(res, "User Selections", pageSelection);
};

const save = async (req, res) => {
  console.log(req.body);

  if (!req.body.user || !req.body.selection) {
    return error(res, "missing data");
  }

  let user = await UserSelection.findOne({ user: req.body.user });

  if (!user) {
    user = new UserSelection({ user: req.body.user, selections: [] });
  }

  const selection = new Selection(req.body.selection);

  selection
    .save()
    .then((selectionSaved) => {
      user.selections.push(selectionSaved._id);

      user
        .save()
        .then((userSaved) => {
          return success(res, "selection saved successfully", userSaved);
        })
        .catch((error) => {
          return bad(res, "error saving selection", error);
        });
    })
    .catch((error) => {
      return bad(res, "error adding selection", error);
    });
};

module.exports = {
  list,
  save,
};
