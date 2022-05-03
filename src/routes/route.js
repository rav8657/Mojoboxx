import express from 'express';

import { employeeAuth } from '../middlewares/auth.js';

import { registerEmployee, employeeLogin, getAllEmployees, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';

const router = express.Router();


router.post('/registerEmployee', registerEmployee);

router.post('/employeeLogin', employeeLogin)

router.get('/getAllEmployees', getAllEmployees)

router.put('/updateEmployee/:employeeId', employeeAuth,updateEmployee)

router.delete('/deleteEmployee/:employeeId',employeeAuth, deleteEmployee)

export default router;