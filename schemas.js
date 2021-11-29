const Joi = require('joi')
const shortenSchema = Joi.object({
  url: Joi.string().uri().required(),
}).required()

module.exports = {
  shortenSchema,
}
