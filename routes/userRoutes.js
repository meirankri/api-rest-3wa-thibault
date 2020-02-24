const userControllers = require('../controllers/userController')
const withAuth = require('../middleware');

module.exports = function(app){
    app.get('/', (req, res, next)=>{
        res.json({"ouech" : "alors" })
    })
    app.post('/user/signup', userControllers.signup)
    app.post('/user/signin', userControllers.signin)
    //le deuxieme params permet de passer par une verif de token avant d'accomplir la tache
    app.get('/api/user/checkToken', withAuth, userControllers.checkToken)
    app.post('/api/user/modify',withAuth, userControllers.modify);


}