const { Op } = require('sequelize');
require('dotenv').config({ path: '../.env' });
const UserModel = require('../models/user');
const PatientModel = require('../models/patient');
const DoctorModel = require('../models/doctor');
const AdminModel = require('../models/admin');

UserModel.sync();

const getUserById = async (id) => {
    const user = await UserModel.findByPk(id);
    let role;
    if (user) {
        const queryOption = { where: { userId: user.id } };
        switch (user.role) {
            case 'P':
                role = await PatientModel.findOne(queryOption);
                break;
            case 'D':
                role = await DoctorModel.findOne(queryOption);
                break;
            case 'A':
                role = await AdminModel.findOne(queryOption)
                break;
            default:
                role = null;
        }
    }
    return { user, role };
}

const getAllUsers = async () => {
    return UserModel.findAll();
}

const getAllNewUsers = async () => {
    return UserModel.findAll({
        where: {
            status: 'N'
        }
    });
}

const addPatient = async (userData) => {
    userData.status = 'N';
    let newUser = new UserModel(userData);
    await newUser.save();
    let newPatient = new PatientModel({ userId: newUser.id, ...userData });
    await newPatient.save();
    return { user: newUser, patient: newPatient };
}

const addDoctor = async (userData) => {
    userData.status = 'N';
    let newUser = new UserModel(userData);
    await newUser.save();
    let newDoctor = new DoctorModel({ userId: newUser.id, ...userData });
    await newDoctor.save();
    return { user: newUser, doctor: newDoctor };
}

const addAdmin = async (userData) => {
    userData.status = 'A';
    userData.pwd = process.env.DEFAULT_ADMIN_PWD;
    let newUser = new UserModel(userData);
    await newUser.save();
    let newAdmin = new AdminModel({ userId: newUser.id, ...userData });
    await newAdmin.save();
    return { user: newUser, admin: newAdmin };
}

const commitUser = async (id, commit) => {
    let user = await UserModel.findByPk(id);
    if(!user) {
        return null;
    }
    user.status = commit;
    return user.save();
}

const updateUser = async (id, data) => {
    let user = await UserModel.findByPk(id);
    if(!user) {
        return null;
    }
    const keys = Object.keys(data);
    for(const element of keys) {
        user[element] = data[element];
    }
    return user.save();
}

const changePWD = async (id, oldPWD, newPWD) => {
    const user = await UserModel.findOne({
        where: {
            id,
            pwd: oldPWD,
            status: { [Op.notIn]: ['X', 'N'] }
        }
    });
    if (!user) {
        return null;
    }
    user.pwd = newPWD;
    return user.save();
}

const deleteUser = async (id) => {
    return UserModel.update({ status: 'X' }, { where: { id }});
}

module.exports = {
    getUserById,
    getAllUsers,
    addPatient,
    addDoctor,
    addAdmin,
    getAllNewUsers,
    deleteUser,
    commitUser,
    updateUser,
    changePWD
}