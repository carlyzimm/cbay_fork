const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env


const volleyball = require('volleyball')
apiRouter.use(volleyball)


apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer "
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith(prefix)) {
    
    const token = auth.slice(prefix.length);
    
    try {
     
      const { email } = jwt.verify(token, JWT_SECRET)

      if (email) {
        req.user = await getUserByEmail(email)
        next()
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token malformed'`
        })
      }

    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});


apiRouter.get('/', (req,res)=>{
  res.send('In the /api routes, dude!')
})


apiRouter.get('/records', require ('./records'))

const usersRouter = require('./users');
const { getUserByEmail } = require('../db');
const recordsRouter = require('./records');
apiRouter.use('/users', usersRouter);
apiRouter.use('/records', require('./records'))

apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

module.exports = apiRouter;