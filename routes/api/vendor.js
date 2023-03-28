const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Vendor = require('../../models/Vendor')
const nodemailer = require('nodemailer')

// @route Get api/vendor/test
// Desc Test for vendor routes
// Access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Vendor works',
  }),
)

// @route  GET api/vendor
// @desc   GET all vendor
// @access Public
router.get('/', async (req, res) => {
  try {
    const vendor = await Vendor.find()
    if (vendor) {
      return res.json(vendor)
    }

    res.status(401).send({ msg: 'vendor not found' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route POST api/dept
// Desc Add dept
// Access Private
router.post(
  '/',
  [
    auth,
    [
      check('vendor_name', 'Vendor name is required').not().isEmpty(),
      check('email', 'Email is required').not().isEmpty(),
      check('telno', 'Telephone number is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { vendor_name, email, telno } = req.body

    // Build vendor object
    const vendorFields = {}

    if (vendor_name) vendorFields.vendor_name = vendor_name
    if (email) vendorFields.email = email
    if (telno) vendorFields.telno = telno

    try {
      let vendor = await Vendor.findOne({
        vendor_name: req.body.vendor_name,
      })

      if (vendor) {
        // Update
        console.log('in  !!!!!!', vendor)

        vendor = await Vendor.findOneAndUpdate(
          { vendor_name: req.body.vendor_name },
          { $set: vendorFields },
          { new: true },
        )
        return res.json(vendor)
      }
      console.log('meow!!!!!')

      // Create new vendor
      vendor = new Vendor(vendorFields)

      // console.log('vendor is:', vendor)

      await vendor.save()

      return res.json(vendor)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route DELETE api/vendor/:id
// Desc Delete vendor
// Access Private
router.delete('/:name', auth, async (req, res) => {
  try {
    await Vendor.deleteMany({ vendor_name: req.params.name })
    res.json({ msg: 'Vendor deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// ************************End of vendor**************************
module.exports = router
