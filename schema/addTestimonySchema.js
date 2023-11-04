const Joi = require('joi');

const addTestimonySchema = Joi.object({
  title: Joi.string().min(2).max(150).required().messages({
    'string.empty': 'El título no puede estar vacío',
    'string.min': 'El título debe tener mínimo 2 caracteres',
    'string.max': 'El título no puede tener más de 150 caracteres'
  }),
  text: Joi.string().allow(null, '').max(1000).message({
    'string.max': 'La valoración no puede tener más de 1000 caracteres'
  }),

  adopterFirstName: Joi.string().allow(null, '').max(50).message({
    'string.max': 'El nombre no puede tener más de 50 caracteres'
  }),
  adopterLastName: Joi.string().allow(null, '').max(50).message({
    'string.max': 'El apellido no puede tener más de 50 caracteres'
  }),
  petName: Joi.string().allow(null, '').max(50).message({
    'string.max': 'El nombre de la mascota no puede tener más de 50 caracteres'
  })
});


module.exports = addTestimonySchema;
