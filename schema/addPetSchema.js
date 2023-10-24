const Joi = require('joi');

const addPetSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Tienes que escribir el nombre de la mascota.',
    'string.min': 'El nombre de la mascota debe tener mínimo 2 caracteres.',
    'string.max': 'El nombre de la mascota no puede tener más de 50 caracteres.',
    'any.required': 'El nombre de la mascota es obligatorio.'
  }),
  species: Joi.any().valid('Gato', 'Perro', 'Otros').required().messages({
    'string.empty': 'Tienes que escribir la especie de la mascota.',
    'any.required': 'La especie de la mascota es obligatoria.'
  }),
  sex: Joi.any().valid('Macho', 'Hembra', 'Desconocido').required().messages({
    'string.empty': 'Tienes que escribir el sexo de la mascota.',
    'any.required': 'El sexo de la mascota es obligatorio.'
  }),
  weight: Joi.number().positive().max(120).required().messages({
    'number.base': 'El peso debe contener sólo números',
    'number.empty': 'El peso de la mascota no puede estar vacío.',
    'number.positive': 'El peso de la mascota tiene que ser una cantidad positiva.',
    'any.required': 'El peso de la mascota es obligatorio.'
  }),
  estimated_birthdate: Joi.date().required().messages({
    'date.base': 'La fecha de nacimiento debe ser una fecha',
    'date.empty': 'La fecha de nacimiento de la mascota no puede estar vacía.',
    'any.required': 'La fecha de nacimiento de la mascota es obligatoria.'
  }),
  breed: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Tienes que escribir la raza de la mascota.',
    'string.min': 'La raza de la mascota debe tener mínimo 2 caracteres.',
    'string.max': 'La raza de la mascota no puede tener más de 50 caracteres.',
    'any.required': 'La raza de la mascota es obligatoria.'
  }),
  status: Joi.any().valid('Buscando', 'En proceso de adopción', 'Adoptado').required().messages({
    'string.empty': 'Tienes que escribir el estado de la mascota.',
    'any.required': 'El estado de la mascota es obligatorio.'
  }),
  description: Joi.string().min(2).max(700).required().messages({
    'string.empty': 'La descripción es obligatoria',
    'string.min': 'La descripción de la mascota tiene que tener mínimo 2 caracteres.',
    'string.max': 'La descripción no puede tener más de 700 caracteres.',
    'any.required': 'La descripción de la mascota es obligatoria.'
  }),
  date_added: Joi.date().required().messages({
    'date.base': 'La fecha de alta debe ser una fecha',
    'date.empty': 'La fecha de alta de la mascota no puede estar vacía.',
    'any.required': 'La fecha de alta de la mascota es obligatoria.'
  }),
  adoption_date: Joi.date().messages({
    'date.base': 'La fecha de adopción debe ser una fecha'
  })
});

module.exports = addPetSchema;
