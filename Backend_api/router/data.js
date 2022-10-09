// const express = require('express')
const router  = require('express').Router();

const verify  =require('./tokanpass')
router.get('/',verify ,(req, res) => {
  res.send(req.user)
})
// res.json({
//     data: {
//         'name':'hiren solanki',
//         'age':'20'
//     }
// }
module.exports = router 