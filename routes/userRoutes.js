const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

//import authentication middleware
const auth = require('../middleware/auth')

router.post('/',async (req,res)=>{
  console.log(req.body)

  try {
    
    const user = new User(req.body)
    // triggered ".pre" middleware
    await user.save()
    const token = await user.generateAuthToken()

    res.status(201).json({message:'add user successful',id:user._id,name:user.name,token})
  } catch (error) {
    console.log(error)
    res.status(400).json({message:error})
  }
})

router.post('/login',async (req,res)=>{
  try {
    const {name,email, password} = req.body
    // console.log(req.body)
    const user = await User.findByCredentials(name,email,password) //User is class

    if(!user){
      return res.status(401).json({error:'Login failed,please check your credentials !'})
    }

    // const token = await user.generateAuthToken() // user is object
    res.status(200).json({id:user._id,name:user.name})

  } catch (error) {
    res.status(400).json({error:"email or password incorrect !"})
    
  }
})

router.get('/', async (req,res) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json( {error: error.message})
  }
})


router.post('/logout', auth, async (req,res)=>{
  const user = req.user
  const current_token = req.token
  try {
    // console.log(current_token)
    user.tokens = user.tokens.filter(item => {return item.token !== current_token})
    await user.save()
    res.status(201).json({message:'Logout successful!'})
  } catch (error) {
    console.log(current_token)
    res.status(500).json({error:'Cannot logout, Please try again !'})
  }
})

router.post('/logoutall', auth, async (req,res)=>{
  const user = req.user
  try {
    user.tokens.splice(0,user.tokens.length) //splice is remove at (a,b) a attach b
    await user.save()
    res.status(200).json({message:'All logout successful!'})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})


module.exports = router