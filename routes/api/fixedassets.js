const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateFixedasstsInput = require('../../validation/fixedassets')
const User = require('../../models/User')


// @route Get api/fixedassets/test
// Desc Test for fixedassets routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'Fixed assets works'
}))

module.exports = router
