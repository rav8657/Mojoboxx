import mongoose from 'mongoose';

 const employeeSchema = new mongoose.Schema({
    name: {
        'type': String,
        required: true
    },
    email: {
        'type': String,
        required: true,
        unique: true
    },
    password: {
        'type': String,
        required: true
    },
    age: {
        'type': Number,
        required: true
    },
    department: {
        'type': String,
        required: true
    },
    isDeleted: {'type': Boolean, default: false}

});

export default mongoose.model('Employee', employeeSchema);
