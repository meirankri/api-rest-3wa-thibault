const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRoutes = require('./routes/userRoutes')

//type c'est pour dire qu'il prend tout type de donnée0
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
//mongodb+srv://clemadmin@cluster0-5jg2q.mongodb.net/pro06?retryWrites=true&w=majority
//mongodb+srv://root:Azerty123!@nodejs0-kaqf7.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://meir:Azerty123@cluster0-abdzp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=> {
	console.log('connecté à mongodb');
	
})
.on('error', (err)=> {
	console.log('erreur de connexion à mongodb', err);
})

//mongodb+srv://<username>:<password>@cluster0-abdzp.mongodb.net/test?retryWrites=true&w=majority
const port = process.env.PORT || 5000

app.listen(port, () =>{
    console.log("server listen on port " + port);
    
})
usersRoutes(app)