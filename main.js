const express = require('express');//express is a light js framework
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post Working.',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'ishita',
    email: 'ishi@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '60s' }, (err, token) => {
    res.json({
      token
    });
  });
});


function verifyToken(req, res, next) {

  const bearerHeader = req.headers['authorization'];
 
  if(typeof bearerHeader !== 'undefined') {
   
    const bearer = bearerHeader.split(' ');
   
    const bearerToken = bearer[1];
   
    req.token = bearerToken;
  
    next();
  } else {
    
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'))