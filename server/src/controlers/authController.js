const router = require('express').Router();
const userManager = require('../managers/userManager');

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;
  try {
    await userManager.register({
      firstName,
      lastName,
      email,
      password,
      repeatPassword,
    });

    res.status(200).json('User registered')
  } catch (error) {
    res.status(400).json(error.message);
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userManager.login(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;