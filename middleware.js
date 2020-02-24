const jwt = require('jsonwebtoken');
const secret = 'ouech';

//on verifie le token si il est valide
const withAuth = function(req, res, next) {
  const token = req.headers['x-access-token']
  if(!token){
      res.json({
          status: 404,
          msg: "token not found"
      })
  } else {
      jwt.verify(token , secret, (err, decode)=>{
          if(err){
              res.json({
                  status: 401,
                  msg: "error token invalid"
              })
          }else{
              next()
          }
      })
  }
  
}

module.exports = withAuth