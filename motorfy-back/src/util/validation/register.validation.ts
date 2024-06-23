import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/
    )
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Invalid Password, Must contain Required Charachters",
    }),
});

export default registerSchema;
