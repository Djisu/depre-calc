const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const cloudinary = require('cloudinary')

// Load validation
const validateProfileInput = require('../../validation/profile')
const validateFixedassetsInput = require('../../validation/fixedassets')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route Get api/profile/test
// Desc Test for profile routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'Profile works'
}))

// @route Get api/profile/all
// Desc Get all profile
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all')
  const errors = {}

  Profile.find()
    .populate('user', 'name avatar')
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles'
        res.status(404).json(errors)
      }
      console.log('profiles found')
      res.json(profiles)
    })
    .catch(err => res.status(404).json({
      msg: 'There are no profiles'
    }))
})



// @route Get api/profile
// Desc Get current user's profile
// Access Private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {}
  Profile.findOne({
      user: req.user.id
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route GET api/profile/handle/:handle
// @Get profile by handle
// @accesse public
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  Profile.findOne({handle: req.params.handle})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if (!profile) {
      errors.noprofile = 'There is no profile for this user'
      return res.status(404).json(errors)
    }
    res.json(profile)
  })
  .catch(err => res.status(404).json(err))
})

// @route Get api/profile/user/:user_id
// Desc Get profile by user id
// Access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {}
  Profile.findOne({
      user: req.params.user_id
    })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json({
      msg: 'There is no profile for this user'
    }))
})

// @route POST api/profile
// Desc Create/Update user's profile
// Access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)
    // Check validation
    if (!isValid) {
      // Return any with errors status
      return res.status(400).json(errors)
    }

    // GET fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.country) profileFields.country = req.body.country
    if (req.body.company) profileFields.company = req.body.company

    Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile))
        .catch(err => res.json(err))
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists'
            res.status(400).json(errors)
          }

          // Save Profile
          new Profile(profileFields).save()
          .then(profile => res.json(profile))
          .catch(err => res.json(err))
        })
      }
    })
    .catch(err => res.json(err))
  }
)

// @routepost api/profile/fixedassets
// @desc Add fixedassets to profile
// @access public
router.post('/fixedassets', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateFixedassetsInput(req.body)
  // Check validation
  if (!isValid) {
    // Return any with errors status
    return res.status(400).json(errors)
  }

  //Send image to Cloudinary site
  console.log('About to cloudinary.config')

  cloudinary.config({
    cloud_name: "softplus-solutions",
    api_key: "689541766938514",
    api_secret: "h69UMbJr5skoFo2sP-IfPI8cyJM"
  })

  //console.log('About to cloudinary.v2.uploader.upload')
  var newUrl
  cloudinary.v2.uploader.upload(req.body.imageurl,
    function(error, result) {
      console.log(result, error);
      console.log('image url is ' + result.url)

//****************************************************************************************************
console.log('About to start')
Profile.findOne({ user: req.user.id })
  .then(profile => {
    const newFix = {
      assettype : req.body.assettype,
      assetdesc : req.body.assetdesc,
      assetcost : req.body.assetcost,
      serialno : req.body.serialno,
      location : req.body.location,
      country : req.body.country,
      owner : req.body.owner,
      gpsaddress : req.body.gpsaddress,
      bank : req.body.bank,
      cobegdate : req.body.cobegdate,
      coenddate : req.body.coenddate,
      status : req.body.status,
      imageurl : result.url //'https://api.cloudinary.com/v1_1/softplus-solutions/image/upload/'  + req.body.imageurl
    }

    console.log('result.url is:' +  result.url)

    // Add to the fixedassets array
    profile.fixedassets.unshift(newFix)
    profile.save().then(profile => res.json(profile))
    })
  .catch(err => res.json(err))

console.log('End')
//******************************************************************************* */

      //req.body.imageurl =  result.url
    });
  //
  //console.log('newUrl is: ' +  newUrl)

  // Profile.findOne({ user: req.user.id })
  // .then(profile => {
  //   const newFix = {
  //     assettype : req.body.assettype,
  //     assetdesc : req.body.assetdesc,
  //     assetcost : req.body.assetcost,
  //     serialno : req.body.serialno,
  //     location : req.body.location,
  //     country : req.body.country,
  //     owner : req.body.owner,
  //     gpsaddress : req.body.gpsaddress,
  //     bank : req.body.bank,
  //     cobegdate : req.body.cobegdate,
  //     coenddate : req.body.coenddate,
  //     status : req.body.status,
  //     imageurl : 'https://api.cloudinary.com/v1_1/softplus-solutions/image/upload/'  + req.body.imageurl
  //   }

  //   console.log('req.body.imageurl is:  https://api.cloudinary.com/v1_1/softplus-solutions/image/upload/'  + req.body.imageurl)

  //   // Add to the fixedassets array
  //   profile.fixedassets.unshift(newFix)
  //   profile.save().then(profile => res.json(profile))
  //   })
  // .catch(err => res.json(err))
})

// @route DELETE api/profile/fixedassets/:fix_id
// @desc  Delete fixedassets from profile
// @access private
router.delete('/fixedassets/:fix_id', passport.authenticate('jwt', { session: false }),
(req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    // Get remove index
    const removeIndex = profile.fixedassets
      .map(item => item.id)
      .indexOf(req.params.fix_id)

     // Splice out of array
    profile.fixedassets.splice(removeIndex, 1)

    // Save
    profile.save().then(profile => res.json(profile))
  })
})

// @route DELETE api/profile
// Desc Delete user and profile
// Access Private
router.delete('/',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Profile.findOneAndRemove({
        user: req.user.id
      })
      .then(() => {
        User.findOneAndRemove({
            _id: req.user.id
          })
          .then(() => res.json({
            success: true
          }))
      })
  })


module.exports = router