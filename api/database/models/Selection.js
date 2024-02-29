const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Joi = require("joi");

const SelectionSchema = Schema({
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: "",
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

SelectionSchema.plugin(mongoosePaginate);

const validateSelection = (selection) => {
  const validation = {
    text: Joi.string().required(),
    url: Joi.string().required(),
    timestamp: Joi.string().required(),
  };

  const schema = Joi.object(validation).options({ allowUnknown: true });
  const result = schema.validate(selection);
  return result.error ? result.error.details[0].message : false;
};

SelectionSchema.methods.invalid = validateSelection;

module.exports = model("Selection", SelectionSchema, "selections");
