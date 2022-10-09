const router = require('express').Router();
const User  =require('../model/User');
const Joi = require("@hapi/joi");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const schema = {
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
// };
const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const schemas = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });


router.post('/ragister',async (req, res) => {
    // const validation  = Joi.validate(req.body,schema)
    // res.send(validation)
    const { error } = schema.validate(req.body);
    // const { error } = val(req.body);
    if (error) {
        return res.status(400).send({ ErrorMessage: error.details[0].message })
        // res.json({ ErrorMessage: error.details[0].message });
    } 
    //email exist
    const emailexist = await User.findOne({ email: req.body.email });
    if (emailexist) {
        return res.status(400).send({ ErrorMessage: "Email already exist" })
        // res.json({ ErrorMessage: "Email already exist" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    


    // const {error}  = Joi.validate(req.body,schema);
    // if(error) return .send(error);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword

    })
    try{
        const saveuser  =  await user.save()
        res.send(saveuser)
        res.send('user saved')
    }catch(err){
        res.status(400).send(err)
    }


}) 

router.post('/login', async (req, res) => {
    const { error } = schemas.validate(req.body);
    if (error) {
        return res.status(400).send({ ErrorMessage: error.details[0].message })
    }
    //email exist
    const emailaxist  = await  User.findOne({ email: req.body.email });
    if(!emailaxist)
    {
        return res.status(404).send({ ErrorMessage: "Email not found" })
    }
    //compare email
    const validpassword  = await bcrypt.compare(req.body.password, emailaxist.password);
    if(!validpassword)
    {
        return res.status(400).send({ ErrorMessage: "Invalid password" })
    }
    const token  = jwt.sign({_id: emailaxist._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)
    
    res.send('login success')

})

module.exports = router
