const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateDepartmentInput = require('../../validation/department')
const Department = require('../../models/department')
const User = require('../../models/User')

// @route Get api/department/test
// Desc Test for department routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'Department works'
}))

//*************** Department Modules ******************************************
// @route POST api/department
// Desc Add department to profile
// Access Private
router.get('/all', (req, res) => {
  console.log('I am in all')
  const errors = {}

  Department.find()
    //.populate('user', 'department')
    .then(department => {
      if (!department) {
        errors.nodepartment = 'There are no department'
        res.status(404).json(errors)
      }
      res.json(department)
    })
    .catch(err => res.status(404).json({
      msg: 'There are no department'
    }))
})


// @route POST api/department
// Desc Add department to profile
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateDepartmentInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const departmentFields = {}
  departmentFields.user = req.user.id
  if (req.body.department) departmentFields.department = req.body.department

  // const newLocation = { location: req.body.location }

  new Department(departmentFields)
    .save()
    .then(department => res.json(department))
    .catch(err => console.log(err))
})

// @route DELETE api/department/:dep_id
// Desc Delete department from profile
// Access Private
router.delete('/:dep_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('req.user.id: ' + req.user.id)
    console.log('req.params.dep_id: ' + req.params.dep_id)

    Department.findOne({
        user: req.user.id
      })
      .then(department => {
        Department.findById(req.params.dep_id)
          .then(department => {
            // check for post owner
            if (department.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorised: 'User not authorised'
              })
            }

            // Delete
            department.remove().then(() => res.json({
              success: true
            }))
          })
          .catch(err => res.status(404).json({
            postnotfound: 'No post found'
          }))
      })
  })
// ************************End of Location**************************


module.exports = router