const express = require('express');
const app = express();
const routes = require('./routes');
const { body, validationResult } = require('express-validator');

app.use(express.json());

  app.post('/register', 
body('first_name').notEmpty(),
body('second_name').notEmpty(),
body('password').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  routes
);

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});