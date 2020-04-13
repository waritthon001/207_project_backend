const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

//import authentication middleware
const auth = require('../middleware/auth')

router.post('/',async (req,res)=>{
  try {
    const user = new User(req.body)
    // triggered ".pre" middleware
    await user.save()
    const token = await user.generateAuthToken()

    res.status(201).json({message:'add user successful',id:user._id,name:user.name,token})
  } catch (error) {
    res.status(400).json({error:error})
  }
})

router.post('/login',async (req,res)=>{
  try {
    const {email, password} = req.body
    const user = await User.findByCredentials(email,password) //User is class

    if(!user){
      return res.status(401).json({error:'Login failed,please check your credentials !'})
    }

    const token = await user.generateAuthToken() // user is object
    res.status(200).json({id:user._id,token:token,name:user.name})

  } catch (error) {
    res.status(400).json({error:"email or password incorrect !"})
    
  }
})

router.get('/me',auth,(req,res)=>{
  const user = req.user
  res.status(201).json(user)
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

router.put('/name', auth, async (req,res) => {
  const update_t = {
    name: req.body.name,
    updated: new Date()
  }
  try {
    const t = await User.findByIdAndUpdate(req.user._id, update_t, { new: true })
    if (!t) {
      res.status(404).json( { error: 'UPDATE::User not found' } )
    } else {
      res.status(200).json({name:t.name})
    }
  } catch (error) {
    res.status(500).json ( { error: 'UPDATE::'+ error.message})
  }
})

router.put('/email', auth, async (req,res) => {
  const update_t = {
    email: req.body.email,
    updated: new Date()
  }
  try {
    const t = await User.findByIdAndUpdate(req.user._id, update_t, { new: true })
    if (!t) {
      res.status(404).json( { error: 'UPDATE::User not found'} )
    } else {
      res.status(200).json(t)
    }
  } catch (error) {
    res.status(500).json ( { error: 'UPDATE::'+error.message})
  }
})

router.put('/password', auth, async (req,res) => {
  try {
    const user = req.user
    user.password = req.body.password
    await user.save()
    const update_t ={
      password: user.password,
      updated: new Date()
    }
    const t = await User.findByIdAndUpdate(req.user, update_t, { new: true })
    if (!t) {
      res.status(404).json( { error:user.password} )// 'UPDATE::User not found'
    } else {
      res.status(200).json(t)
    }
  } catch (error) {
    res.status(500).json ( { error: 'UPDATE::'+error.message})
  }
})
module.exports = router