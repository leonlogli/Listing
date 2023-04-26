//********************************************************
//* Fake backend to handle the react native app requests *
//********************************************************

const express = require('express');
let fakeProducts = require('./fakeProducts.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + Date.now();

const fakeProfile = {
  _id: '62efd2ea957f85781f5352ee',
  fullName: 'John Doe',
  email: 'johndoe@gmail.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

app.post('/user/login', async (req, res) => {
  fakeProfile.email = req.email;

  res.json({ token: fakeToken });
});

app.post('/user/register', async (req, res) => {
  fakeProfile.fullName = req.fullName;
  fakeProfile.email = req.email;

  res.json({ token: fakeToken });
});

app.get('/user/profile', async (req, res) => {
  res.json(fakeProfile);
});

app.patch('/user/profile', async (req, res) => {
  res.json({ ...fakeProfile, ...req.body });
});

app.get('/services', async (req, res) => {
  res.json(fakeProducts);
});

app.delete('/services/:id', async (req, res) => {
  fakeProducts = fakeProducts.filter((f) => f._id === req.params.id);

  res.json({ _id: req.params.id, ...req.body });
});

app.patch('/services/:id', async (req, res) => {
  const i = fakeProducts.findIndex((f) => f._id === req.params.id);

  fakeProducts[i] = { ...fakeProducts[i], ...req.body };
  res.json({ _id: req.params.id, ...req.body });
});

app.post('/services', async (req, res) => {
  const product = { ...req.body, _id: Date.now() };

  fakeProducts.push(product);
  res.json(product);
});

const port = process.env.PORT || process.argv[2] || 6000;

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
