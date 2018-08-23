const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateAssettypeInput = require('../../validation/assettype')
const Assettype = require('../../models/assettype')
const User = require('../../models/User')

// @route Get api/assettype/test
// Desc Test for country routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'assettype works'
}))

//*************** assettype Modules ******************************************
// @route POST api/assettype
// Desc Add assettype to profile
// Access Private
router.get('/all', (req, res) => {
  console.log('I am in all')
  const errors = {}

  Assettype.find()
    //.populate('user', 'assettype')
    .then(assettype => {
      if (!assettype) {
        errors.noassettype = 'There are no assettype'
        res.status(404).json(errors)
      }
      res.json(assettype)
    })
    .catch(err => res.status(404).json({
      msg: 'There are no assettype'
    }))
})


// @route POST api/assettype
// Desc Add assettype to profile
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateAssettypeInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const assettypeFields = {}
  assettypeFields.user = req.user.id
  if (req.body.assettype) assettypeFields.assettype = req.body.assettype

  // const newCountry = { country: req.body.location }

  new Assettype(assettypeFields)
    .save()
    .then(assettype => res.json(assettype))
    .catch(err => console.log(err))
})

// @route DELETE api/assettype/:cou_id
// Desc Delete assettype from profile
// Access Private
router.delete('/:ass_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('req.user.id: ' + req.user.id)
    console.log('req.params.ass_id: ' + req.params.ass_id)

    Assettype.findOne({
        user: req.user.id
      })
      .then(assettype => {
        Assettype.findById(req.params.ass_id)
          .then(assettype => {
            // check for post owner
            if (assettype.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorised: 'User not authorised'
              })
            }

            // Delete
            assettype.remove().then(() => res.json({
              success: true
            }))
          })
          .catch(err => res.status(404).json({
            assettypenotfound: 'No assettype found'
          }))
      })
  })
// ************************End of country**************************


module.exports = router