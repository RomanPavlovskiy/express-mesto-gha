const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUserId,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9-.]+\.[a-zA-Z\w\d\S]{2,}/),
    }),
  }),
  updateAvatar,
);

module.exports = router;
