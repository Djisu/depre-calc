const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateInsurerInput = require('../../validation/insurer')
const User = require('../../models/User')
const Insurer = require('../../models/Insurer')

// @route Get api/insurer/test
// Desc Test for insurer routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'Insurer works'
}))

//*************** Insurer Modules ******************************************
// @route POST api/insurer
// Desc Add insurer to profile
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('In insurer')
  const {
    errors,
    isValid
  } = validateInsurerInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const insurerFields = {}
  insurerFields.user = req.user.id
  if (req.body.name) insurerFields.name = req.body.name
  if (req.body.email) insurerFields.email = req.body.email
  if (req.body.telno) insurerFields.telno = req.body.telno

  new insurer(insurerFields)
    .save()
    .then(insurer => res.json(insurer))
    .catch(err => console.log(err))
})

// @route DELETE api/profile/insurer/:ins_id
// Desc Delete insurer from profile
// Access Private
router.delete('/insurer/:ins_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('in insurer/:ins_id')

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.insurer
          .map(item => item.id)
          .indexOf(req.params.ins_id)

        // Splice out of array
        profile.insurer.splice(removeIndex, 1)

        // Save
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err))
      })
  })


// ************************End of Insurer*************************************

module.exports = router