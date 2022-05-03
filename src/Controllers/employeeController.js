import employeeModel from '../models/employeeModel.js';
import jwt from 'jsonwebtoken';

//#region registerEmployee
export const registerEmployee = async (req, res) => {
    try {
        const employee = await employeeModel.create(req.body);
        res.status(201).send(employee);
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};
//#endregion



//#region employeeLogin
export const employeeLogin = async (req, res) => {
    try {
        const employee = await employeeModel.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if (!employee) {
            return res.status(401).send({ message: 'Invalid email or password' });
        } else {
            const token = jwt.sign({
                email: employee.email, _id: employee._id
            }, 'SecretKey', {
                expiresIn: '1h'
            });
            return res.status(200).send({ message: 'Login successful', token: token });
        }
    } catch (err) {
        return res.status(500).send({ status: err.message })
    }
};
//#endregion



//#region getAllEmployees

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find({isDeleted:false});
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
//#endregion



//#region updateEmployee

export const updateEmployee = async (req, res) => {
    try {

        let requestBody = req.body
        let employeeId = req.params.employeeId;
        let employeeIdFromToken = req.employeeId

        const findEmployeeProfile = await employeeModel.findOne({ employeeId })

        if (!findEmployeeProfile) {
            return res.send(400).send({ status: false, message: "Employee not found" })
        }
       
        if (findEmployeeProfile._id.toString() !== employeeIdFromToken) {
            return res.send(401).send({ status: false, message: `unauthorized access! Employee info doesn't match` })
        }

        const { name, age, email, password, department } = requestBody
        let obj = {}
        if (name) {
            obj['name'] = name;
        }
        if (age) {
            obj['age'] = age;
        }
        if (email) {
            obj['email'] = email;
        }
        if (password) {
            obj['password'] = password;
        }
        if (department) {
            obj['department'] = department;
        }

        const updatedData = await employeeModel.findOneAndUpdate({ employeeId }, obj, { new: true })

        return res.status(200).send({ data: updatedData })

    } catch (err) {
       return res.status(500).send({ status: err.message })
    }
}
//#endregion



//#region deleteEmployee

export const deleteEmployee = async (req, res) => {
    try {

        let employeeId = req.params.employeeId

        let employeeIdFromToken = req.employeeId

        const findEmployeeProfile = await employeeModel.findOne({ employeeId })

        if (!findEmployeeProfile) {
            return res.send(400).send({ status: false, message: "Employee not found" })
        }
       
        if (findEmployeeProfile._id.toString() !== employeeIdFromToken) {
            return res.send(401).send({ status: false, message: `unauthorized access! Employee info doesn't match` })
        }
        await employeeModel.findOneAndUpdate({employeeId }, { isDeleted: true })

        return res.status(200).send({ status: true, message: "Employee deleted successfully" })

    } catch (err) {
        return res.status(500).send({ status: err.message })
    }
}

//#endregion