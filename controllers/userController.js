const User = require('../models/model');
const secret = 'ouech';
const jwt = require('jsonwebtoken');

exports.signup = function(req, res, next) {
    // req.body.email, req.body.password, req.body.firtName, req.body.lastName, 
    
    User.findOne({email:req.body.email}, (err, existingUser)=> {
        if(err) {
			console.log('error bdd ', err)
			return next(err);
		}
		
		if (existingUser) {
			return res.json({status : 422,error: "Email utilisé"});
		} else {
		    const user = new User({
				email: req.body.email,
				password: req.body.password,
				firstName: req.body.firstName,
				lastName: req.body.lastName
			});
			
			user.save(function(err) {
				
				if(err) {
					console.log('erreurrrr', err)
					return next(err);
					
				}

				res.json({status: 200,success: "bien enregistré"});
			});
		}
    })
    
}
exports.signin = function(req, res, next) {
    User.findOne({email:req.body.email}, (err, existingUser)=> {
        if(err) {
			console.log('error bdd ', err)
			return next(err);
		}
		
		if(existingUser) {
            if(req.body.password == existingUser.password){
                const payload = { email: req.body.email };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '10d'
                 });
                res.json({status: 200, msg: 'good password', token: token});  
            }else {
                res.json({status: 404, error: "bad password"})
            }
		    
		} else {
		    res.json({status: 422, error: "Pas d'utilisateur avec cet email"})
		}
        
    })
}

exports.checkToken = async function(req, res, next) {
	const token = req.headers['x-access-token']
	//decode le token pour extraire l'email
	let decode = await jwt.verify(token, secret)
	//et la on recupere l'user 
	let user = await User.findOne({email:decode.email})
	
	res.json({
	     		status: 200,
	            user: user,
	            msg: 'token valide'
	        })

    
}


exports.modify =  async (req, res, next) =>{
	var email = req.body.email;
	let update = await User.updateOne({email:email}, { firstName: req.body.firstName, lastName: req.body.lastName })
	
	if(update.nModified === 0) {
		res.json({status: 404, error: 'rien modifié'})
	}
	
	let user = await User.findOne({email:email});
	
	res.json({status: 200, msg: "utilisateur modifié", user:user})

}