const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const adminController = require('../../controllers/admin');
const locaController = require('../../controllers/location');
const { CreateBus, getBus} = require('../../controllers/bus');
const isAuth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const {createAgency,getAgency} = require('../../controllers/Agency');
const staffController = require('../../controllers/staff')

// admin signup;
router.post('/signup', [
  check('name', "name is required").not().isEmpty(),
  check('email', 'please inclde unique and valid email').isEmail(),
  check('password', 'please enter the sward passward').isLength({ min: 6 }),
  check('isAdmin', 'please enter the admin').not().isEmpty()
],
  adminController.adminSignup,
  async (req, res) => {
  }
)

router.post('/admin/Addbus', isAuth, isAdmin, [
  check("busName", "enter the bus name").not().isEmpty(),
  check("agency", "enter the bus agency").not().isEmpty(),
  check("vehicleNo", "enter the vehicle no.").not().isEmpty(),
  check("seats", "enter the seats").isInt().not().isEmpty(),
  check("busType", "enter the busType").not().isEmpty(),
  check("seatCategory", "enter the seatCategory").not().isEmpty(),
  check("policy", "enter the bus policy").not().isEmpty(),
  check("image", "enter the bus image").not().isEmpty(),
  check('from', 'boarding point of the bus is required').not().isEmpty(),
  check('to', 'dropping point of the bus is required').not().isEmpty(),
  check('busStaff', "busStaff is required").not().isEmpty(),
  check("arrivalTime", "enter the arrivalTime").not().isEmpty(),
  check("departureTime", "enter the departureTime").not().isEmpty()],
  CreateBus,
  async (req, res) => {
  })


// search bus
// router.post('/admin/:busId', isAuth, [
//   check("source", 'source is reqquired'),
//   check("destination", 'destination id required'),
//   check("date",'date is required')
  
// ], getBus, async(req, res) => { })

// get bus



// add location 
router.post('/admin/location', isAuth, isAdmin, [
  check('city', 'please inclde unique and valid email').not().isEmail(),
  check('state', 'please enter the passward').not().isEmpty()
],
  locaController.location,
  async (req, res) => {
  })
  
router.post('/admin/agency', isAuth,isAdmin,[
    check('phone', 'phone number in required').isInt()
      .isLength({ min: 10, max: 10 }),
    check('agencyName', 'agency name is required').not().isEmpty(),
    check('headOfficeLocation', 'headOffical is required').not().isEmpty()
  ], createAgency, async (req, res) => {
    
})

// get the agency 
router.get('/admin/profile',isAuth,isAdmin,getAgency );

// POST @route api/admins/:adminId/addStaff
router.post('/admin/addStaff', [isAuth, isAdmin, [
  check('phone', 'Phone number is required')
    .isInt()
    .isLength({ min: 10, max: 10 }),
  check('name', 'Agency name is required')
    .not()
    .isEmpty(),
  check('address', 'Address of the staff is required')
    .not()
    .isEmpty(),
  check('isDriver', 'Position is required')
    .isBoolean()
]], staffController.addStaff)

module.exports = router;
