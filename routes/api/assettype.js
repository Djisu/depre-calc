const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateAssettypeInput = require('../../validation/assettype')
const Assettype = require('../../models/Assettype')
const User = require('../../models/User')

// @route Get api/assettype/test
// Desc Test for country routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'Asset type works'
}))

//*************** Assettype Modules ******************************************
// @route POST api/assettype
// Desc Add assettype to profile
// Access Private
router.post('/assettype', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('req.body.name: ' + req.body.assettype)
  const {
    errors,
    isValid
  } = validateAssettypeInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      const newAssettype = {
        assettype: req.body.assettype
      }

      // Add to assettype array
      profile.assettype.unshift(newAssettype)

      // Save
      profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json({
          msg: 'Error in adding record'
        }))
    })
})
// @route DELETE api/profile/assettype/:ass_id
// Desc Delete assettype from profile
// Access Private
router.delete('/assettype/:ass_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('in assettype/:ass_id' + req.params.ass_id)

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.assettype
          .map(item => item.id)
          .indexOf(req.params.ass_id)

        // Splice out of array
        profile.assettype.splice(removeIndex, 1)

        // Save
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err))
      })
  })
// ************************End of Assettype*************************************

module.exports = router