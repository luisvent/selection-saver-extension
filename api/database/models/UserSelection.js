const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Joi = require("joi");

const UserSelectionSchema = Schema({
  user: {
    type: String,
    required: true,
  },
  selections: {
    type: [Schema.Types.ObjectId],
    ref: "Selection",
  },
});

UserSelectionSchema.plugin(mongoosePaginate);

const validateUser = (user) => {
  const validation = {
    user: Joi.string().required().trim(),
    selections: Joi.array(),
  };

  const schema = Joi.object(validation).options({ allowUnknown: true });
  const result = schema.validate(user);
  return result.error ? result.error.details[0].message : false;
};

UserSelectionSchema.methods.invalid = validateUser;

module.exports = model("UserSelection", UserSelectionSchema, "user_selections");
