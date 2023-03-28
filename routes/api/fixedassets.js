const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Fixedassets = require('../../models/Fixedasset')
const nodemailer = require('nodemailer')

// @route Get api/vendor/test
// Desc Test for vendor routes
// Access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'fixedassets works',
  }),
)

// @route  GET api/fixedassets
// @desc   GET all fixedassets
// @access Public
router.get('/', async (req, res) => {
  try {
    const fixedassets = await Fixedassets.find()
    if (fixedassets) {
      return res.json(fixedassets)
    }

    res.status(401).send({ msg: 'fixedassets not found' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  GET api/fixedassets/:id
// @desc   GET all fixedassets
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const fixedassets = await Fixedassets.find({ _id: req.params.id })
    if (fixedassets) {
      return res.json(fixedassets)
    }

    res.status(401).send({ msg: 'fixedassets not found' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route PUT api/fixedassets
// Desc Add fixedassets
// Access Private
router.put(
  '/',
  [
    auth,
    [
      check('asset_desc', 'Asset name is required').not().isEmpty(),
      check('department', 'Department is required').not().isEmpty(),
      check('custodian', 'Custodian of asset is required').not().isEmpty(),
      check('location', 'location of asset is required').not().isEmpty(),
      check('general_ledger_class', 'General ledger class is required')
        .not()
        .isEmpty(),
      check('aquis_date', 'Asset purchase date is required').not().isEmpty(),
      check('asset_cost', 'Asset purchase cost is required').not().isEmpty(),
      check('depre_method', 'Asset depreciation method is required')
        .not()
        .isEmpty(),
      check('salvage_value', 'Asset residual value is required')
        .not()
        .isEmpty(),
      check('useful_years', 'Asset useful years is required').not().isEmpty(),
      check('vendor_name', 'Asset vendor is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      asset_desc,
      department,
      custodian,
      location,
      general_ledger_class,
      aquis_date,
      asset_cost,
      depre_method,
      depre_rate,
      salvage_value,
      useful_years,
      accum_depre,
      vendor_name,
      imageurl,
      asset_status,
      date,
    } = req.body

    try {
      console.log('meow!!!!! PUT')

      const fixedassetId = req.params.id
      const fixedasset = await Fixedassets.findById(fixedassetId)

      // Build vendor object
      const fixedassetsFields = {}

      if (fixedassetId) {
        if (asset_desc) fixedassetsFields.asset_desc = asset_desc
        if (department) fixedassetsFields.department = department
        if (custodian) fixedassetsFields.custodian = custodian
        if (location) fixedassetsFields.location = location
        if (general_ledger_class)
          fixedassetsFields.general_ledger_class = general_ledger_class
        if (aquis_date) fixedassetsFields.aquis_date = aquis_date
        if (asset_cost) fixedassetsFields.asset_cost = asset_cost

        if (depre_method) fixedassetsFields.depre_method = depre_method
        if (depre_rate) fixedassetsFields.depre_rate = depre_rate
        if (salvage_value) fixedassetsFields.salvage_value = salvage_value
        if (useful_years) fixedassetsFields.useful_years = useful_years
        fixedassetsFields.accum_depre = 0
        if (vendor_name) fixedassetsFields.vendor_name = vendor_name
        if (imageurl) fixedassetsFields.imageurl = imageurl
        fixedassetsFields.asset_status = true
        fixedassetsFields.date = Date.now()

        const updatedFixedassets = await fixedassets.save()

        return res.json(fixedassets)
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route POST api/fixedassets
// Desc Add fixedassets
// Access Private
router.post(
  '/',
  [
    auth,
    [
      check('asset_desc', 'Asset name is required').not().isEmpty(),
      check('department', 'Department is required').not().isEmpty(),
      check('custodian', 'Custodian of asset is required').not().isEmpty(),
      check('location', 'location of asset is required').not().isEmpty(),
      check('general_ledger_class', 'General ledger class is required')
        .not()
        .isEmpty(),
      check('aquis_date', 'Asset purchase date is required').not().isEmpty(),
      check('asset_cost', 'Asset purchase cost is required').not().isEmpty(),
      check('depre_method', 'Asset depreciation method is required')
        .not()
        .isEmpty(),
      check('salvage_value', 'Asset residual value is required')
        .not()
        .isEmpty(),
      check('useful_years', 'Asset useful years is required').not().isEmpty(),
      check('vendor_name', 'Asset vendor is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    console.log('in fixedassets post')

    const {
      asset_desc,
      department,
      custodian,
      location,
      general_ledger_class,
      aquis_date,
      asset_cost,
      depre_method,
      depre_rate,
      salvage_value,
      useful_years,
      accum_depre,
      vendor_name,
      imageurl,
      asset_status,
      date,
    } = req.body

    try {
      console.log('meow!!!!! post')

      // Build vendor object
      const fixedassetsFields = {}

      if (asset_desc) fixedassetsFields.asset_desc = asset_desc
      if (department) fixedassetsFields.department = department
      if (custodian) fixedassetsFields.custodian = custodian
      if (location) fixedassetsFields.location = location
      if (general_ledger_class)
        fixedassetsFields.general_ledger_class = general_ledger_class
      if (aquis_date) fixedassetsFields.aquis_date = aquis_date
      if (asset_cost) fixedassetsFields.asset_cost = asset_cost

      if (depre_method) fixedassetsFields.depre_method = depre_method
      if (depre_rate) fixedassetsFields.depre_rate = depre_rate
      if (salvage_value) fixedassetsFields.salvage_value = salvage_value
      if (useful_years) fixedassetsFields.useful_years = useful_years
      fixedassetsFields.accum_depre = 0
      if (vendor_name) fixedassetsFields.vendor_name = vendor_name
      if (imageurl) fixedassetsFields.imageurl = imageurl
      fixedassetsFields.asset_status = true
      fixedassetsFields.date = Date.now()

      // Create new fixedassets
      fixedassets = new Fixedassets(fixedassetsFields)
      const createdFixedassets = await fixedassets.save()

      return res.json(createdFixedassets)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route DELETE api/fixedassets/:id
// Desc Delete fixedassets
// Access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Fixedassets.deleteOne({ _id: req.params.id })
    res.json({ msg: 'fixedassets deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.get('/calcdepre', async (req, res) => {
  // console.log('in calcdepre')
  try {
    let fixedassets = await Fixedassets.find()

    if (fixedassets) {
      let fdjson = JSON.parse(JSON.stringify(fixedassets))

      let [
        {
          asset_desc,
          department,
          custodian,
          location,
          general_ledger_class,
          aquis_date,
          asset_cost,
          depre_method,
          depre_rate,
          salvage_value,
          useful_years,
          accum_depre,
          vendor_name,
          imageurl,
          asset_status,
          date,
        },
      ] = fdjson

      if ((depre_method = 'Straight Line')) {
        accum_depre = (asset_cost - salvage_value) / useful_years
      } else if ((depre_method = 'Diminishing Balance Method')) {
        accum_depre = (asset_cost * depre_rate) / 100
      }

      // Update fixedasseds
      fixedassets = await Fixedassets.updateMany({
        $set: { accum_depre: accum_depre },
      })

      return res.json(fixedassets)
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
// ************************End of fixedassets**************************
