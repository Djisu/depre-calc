const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateDepartmentInput = require('../../validation/department')
const User = require('../../models/User')

// @route Get api/department/test
// Desc Test for department routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'Department works'
}))

//*************** Department Modules ******************************************
// @route POST api/profile/department
// Desc Add department to profile
// Access Private
router.post('/department', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('req.body.name: ' + req.body.name)
  const {
    errors,
    isValid
  } = validateDepartmentInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      const newDepartment = {
        department: req.body.department
      }

      // Add to department array
      profile.department.unshift(newDepartment)

      // Save
      profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json({
          msg: 'Error in adding record'
        }))
    })
})

// @route DELETE api/profile/department/:dep_id
// Desc Delete department from profile
// Access Private
router.delete('/department/:dep_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('in department/:dep_id' + req.params.dep_id)

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.department
          .map(item => item.id)
          .indexOf(req.params.dep_id)

        // Splice out of array
        profile.department.splice(removeIndex, 1)

        // Save
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err))
      })
  })
// ************************End of Department*************************************

module.exports = router