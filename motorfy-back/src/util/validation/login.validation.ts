import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().lowercase().required().messages({
    "any.required": "Email is required",
    "email.base": "Email must be a valid email",
  }),
  password: Joi.string().min(5).required().messages({
    "string.min": "Password must contain atleast 5 charachters",
    "any.required": "Password is required",
  }),
});

export default loginSchema;
