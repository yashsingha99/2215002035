const { Router } = require('express');
const { calculater } = require('../controller/number.controller');
const { validateID } = require('../middleware/validateId');

const router = Router();

router.get('/:numid', validateID, calculater);

module.exports=  router;
