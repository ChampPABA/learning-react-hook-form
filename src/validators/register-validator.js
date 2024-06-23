import Joi from "joi";

const registerSchema = Joi.object({
  username: Joi.string().required().min(3).max(30).messages({
    "string.base": `Username should be a type of 'text'`,
    "string.empty": `Username cannot be an empty field`,
    "string.min": `Username should have a minimum length of {#limit}`,
    "string.max": `Username should have a maximum length of {#limit}`,
    "any.required": `Username is a required field`,
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should have a minimum length of {#limit}`,
    "any.required": `Password is a required field`,
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm Password is a required field",
  }),
});

export default registerSchema;
