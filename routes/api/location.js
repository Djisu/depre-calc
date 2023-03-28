const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Location = require('../../models/Location')
const User = require('../../models/User')
const nodemailer = require('nodemailer')

// @route Get api/assettype/test
// Desc Test for country routes
// Access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'location works',
  }),
)

// @route  GET api/location
// @desc   GET all location
// @access Public
router.get('/', async (req, res) => {
  try {
    const location = await Location.find()
    if (location) {
      return res.json(location)
    }

    res.status(401).send({ msg: 'location not found' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route POST api/location
// Desc Add location
// Access Private
router.post(
  '/',
  [auth, [check('location_desc', 'Location is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { location_desc } = req.body

    // Build department object
    const locationFields = {}

    if (location_desc) locationFields.location_desc = location_desc

    try {
      let location = await Location.findOne({
        location: req.body.location_desc,
      })

      if (location) {
        // Update
        console.log('in  !!!!!!', location)

        location = await Location.findOneAndUpdate(
          { location: req.body.location_desc },
          { $set: locationFields },
          { new: true },
        )
        return res.json(location)
      }
      console.log('meow!!!!!')

      // Create new location
      location = new Location(locationFields)

      console.log('location is:', location)

      await location.save()

      return res.json(location)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route DELETE api/location/:id
// Desc Delete location
// Access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Location.deleteMany({ id: req.params._id })
    res.json({ msg: 'Location deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// ************************End of location**************************
module.exports = router
