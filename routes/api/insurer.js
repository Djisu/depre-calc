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

// @route Get api/location/all
// Desc Get all locations
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all')
  const errors = {}

  Insurer.find()
    //.populate('user', 'location')
    .then(insurers => {
      if (!insurers) {
        errors.noInsurer = 'There are no insurers'
        res.status(404).json(errors)
      }
      res.json(insurers)
    })
    .catch(err => res.status(404).json({
      msg: 'There are no insurers'
    }))
})

//*************** Insurer Modules *********************************
// @route POST api/insurer
// Desc Add insurer to profile
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  // console.log('In insurer')
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

  new Insurer(insurerFields)
    .save()
    .then(insurer => res.json(insurer))
    .catch(err => console.log(err))
})

// @route DELETE api/profile/insurer/:ins_id
// Desc Delete insurer from profile
// Access Private
router.delete('/:ins_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('req.user.id: ' + req.user.id)
    console.log('req.params.ins_id: ' + req.params.ins_id)

    Insurer.findOne({
        user: req.user.id
      })
      .then(insurer => {
        Insurer.findById(req.params.ins_id)
          .then(insurer => {
            // check for insurer owner
            if (insurer.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorised: 'User not authorised'
              })
            }

            // Delete
            insurer.remove().then(() => res.json({
              success: true
            }))
          })
          .catch(err => res.status(404).json({
            insurernotfound: 'No insurer found'
          }))
      })
  })

// ************************End of Insurer*************************************

module.exports = router