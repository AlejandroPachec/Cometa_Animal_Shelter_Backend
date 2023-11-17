const Joi = require('joi');

const updatePetStatusSchema = Joi.object({

  status: Joi.any().valid('Buscando', 'En proceso de adopción', 'Adoptado').required().messages({
    'string.empty': 'Tienes que escribir el estado de la mascota.',
    'any.required': 'El estado de la mascota es obligatorio.'
  }),
  adoptionDate: Joi.date().messages({
    'date.base': 'La fecha de adopción debe ser una fecha'
  })
});

module.exports = updatePetStatusSchema;
