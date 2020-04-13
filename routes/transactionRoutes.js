const express = require('express')
const router = express.Router()
const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

//import authentication middleware
const auth = require('../middleware/auth')

router.post('/', auth, async (req,res) => {
    const user = req.user
    const t = new Transaction(req.body)
    t._uid=user._id
    t.name=user.name
    try {
        await t.save()
        res.status(200).json(t)
    } catch (error) {
        res.status(500).json( { error: error.message})
    }
})

router.delete('/:id', auth, async (req,res) => {
    try {
        const delete_s = await Transaction.findById(req.params.id)
        if(delete_s._uid.toString() == req.user._id.toString()) 
            await Transaction.findByIdAndDelete(req.params.id)
        else throw new Error()
        res.status(200).json( { message: 'Transaction deleted!'})
    } catch (error) {
        res.status(404).json( { error: 'DELETE::transaction not found' })
    }
})

router.post('/comment/:id', auth, async (req,res) => {
    try {
      const update_t = await Transaction.findById(req.params.id)
      const user = await User.findById(req.user._id)
      const comment = {
        _uid:req.user._id,
        name:user.name,
        comment:req.body.comment
      }
      update_t.comments.push(comment)
      await update_t.save()
      res.status(200).json({comments:update_t.comments})
    } catch (error) {
      res.status(404).json( { error: error.message }) 
    }
})

router.post('/good/:id', auth, async (req,res) => {
    try {
        const t = await Transaction.findById(req.params.id)
        const goods_t = t.goods
        
        if(!goods_t || (goods_t && goods_t.filter(item => item._uid == req.user._id)).length == 0){
            t.goods.push({_uid:req.user._id})
        }else {
            t.goods = goods_t.filter(item => item._uid != req.user._id)
        }
        await t.save()
        res.status(200).json({user:t})
    } catch (error) {
      res.status(404).json( { error: error.message }) 
    }
})

router.get('/', async (req,res) => {
    try {
      const transactions = await Transaction.find()
      res.status(200).json(transactions)
    } catch (error) {
      res.status(500).json( {error: error.message})
    }
})

module.exports = router