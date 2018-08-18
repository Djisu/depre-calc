const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateCountryInput = require('../../validation/country')
const UserCountry = require('../../models/Country')
const User = require('../../models/User')

// @route Get api/country/test
// Desc Test for country routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'Country works'
}))

//*************** Country Modules ******************************************
// @route POST api/profile/country
// Desc Add country to profile
// Access Private
router.post('/country', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('req.body.name: ' + req.body.country)
  const {
    errors,
    isValid
  } = validateCountryInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      const newCountry = {
        country: req.body.country
      }

      // Add to country array
      profile.country.unshift(newCountry)

      // Save
      profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json({
          msg: 'Error in adding record'
        }))
    })
})

// @route DELETE api/profile/country/:cou_id
// Desc Delete country from profile
// Access Private
router.delete('/country/:cou_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('in country/:cou_id')

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.country
          .map(item => item.id)
          .indexOf(req.params.ins_id)

        // Splice out of array
        profile.country.splice(removeIndex, 1)

        // Save
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err))
      })
  })
// ************************End of Country*************************************

module.exports = router
