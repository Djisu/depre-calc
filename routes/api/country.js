const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateCountryInput = require('../../validation/country')
const Country = require('../../models/country')
const User = require('../../models/User')

// @route Get api/country/test
// Desc Test for country routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'country works'
}))

//*************** country Modules ******************************************
// @route POST api/country
// Desc Add country to profile
// Access Private
router.get('/all', (req, res) => {
  console.log('I am in all')
  const errors = {}

  Country.find()
    //.populate('user', 'country')
    .then(country => {
      if (!country) {
        errors.nocountry = 'There are no country'
        res.status(404).json(errors)
      }
      res.json(country)
    })
    .catch(err => res.status(404).json({
      msg: 'There are no country'
    }))
})


// @route POST api/country
// Desc Add country to profile
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateCountryInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const countryFields = {}
  countryFields.user = req.user.id
  if (req.body.country) countryFields.country = req.body.country

  // const newCountry = { country: req.body.location }

  new Country(countryFields)
    .save()
    .then(country => res.json(country))
    .catch(err => console.log(err))
})

// @route DELETE api/country/:cou_id
// Desc Delete country from profile
// Access Private
router.delete('/:cou_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('req.user.id: ' + req.user.id)
    console.log('req.params.cou_id: ' + req.params.cou_id)

    Country.findOne({
        user: req.user.id
      })
      .then(country => {
        Country.findById(req.params.cou_id)
          .then(country => {
            // check for post owner
            if (country.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorised: 'User not authorised'
              })
            }

            // Delete
            country.remove().then(() => res.json({
              success: true
            }))
          })
          .catch(err => res.status(404).json({
            postnotfound: 'No post found'
          }))
      })
  })
// ************************End of country**************************


module.exports = router