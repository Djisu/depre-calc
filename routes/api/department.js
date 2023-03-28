const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Department = require('../../models/department')
const nodemailer = require('nodemailer')

// @route Get api/assettype/test
// Desc Test for country routes
// Access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Department works',
  }),
)

// @route  GET api/department
// @desc   GET all department
// @access Public
router.get('/', async (req, res) => {
  try {
    const department = await Department.find()
    if (department) {
      return res.json(department)
    }

    res.status(401).send({ msg: 'department not found' })
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
  [auth, [check('dept_desc', 'dept is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { dept_desc } = req.body

    // Build department object
    const departmentFields = {}

    if (dept_desc) departmentFields.dept_desc = dept_desc

    try {
      let dept = await Department.findOne({
        dept: req.body.dept_desc,
      })

      if (dept) {
        // Update
        console.log('in  !!!!!!', dept)

        dept = await Department.findOneAndUpdate(
          { dept: req.body.dept_desc },
          { $set: deptFields },
          { new: true },
        )
        return res.json(location)
      }
      console.log('meow!!!!!')

      // Create new department
      department = new Department(departmentFields)

      console.log('department is:', department)

      await department.save()

      return res.json(department)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route DELETE api/department/:id
// Desc Delete department
// Access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Department.deleteMany({ id: req.params._id })
    res.json({ msg: 'department deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// ************************End of department**************************
module.exports = router
