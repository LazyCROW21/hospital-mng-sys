const AppointmentModel = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const User = require('../models/user');

AppointmentModel.sync();

const getAllAppointments = async () => {
    const appointments = await AppointmentModel.findAll({
        include: [
            {
                model: Doctor,
                as: 'doctor',
                include: {
                    model: User,
                    as: 'user'
                }
            },
            {
                model: Patient,
                as: 'patient',
                include: {
                    model: User,
                    as: 'user'
                }
            }
        ]
    });
    return appointments;
}

const getAppointmentById = async (id) => {
    const appointment = await AppointmentModel.findByPk(id, {
        include: [
            {
                model: Doctor,
                as: 'doctor',
                include: {
                    model: User,
                    as: 'user'
                }
            },
            {
                model: Patient,
                as: 'patient',
                include: {
                    model: User,
                    as: 'user'
                }
            }
        ]
    });
    return appointment;
}

const getAppointmentsByPatientId = async (patientId) => {
    const appointments = await AppointmentModel.findAll({
        where: {
            patientId: patientId
        },
        include: [
            {
                model: Doctor,
                as: 'doctor',
                include: {
                    model: User,
                    as: 'user'
                }
            },
            {
                model: Patient,
                as: 'patient',
                include: {
                    model: User,
                    as: 'user'
                }
            }
        ]
    });
    return appointments;
}

const getAppointmentsByDoctorId = async (doctorId) => {
    const appointments = await AppointmentModel.findAll({
        where: {
            doctorId: doctorId
        },
        include: [
            {
                model: Doctor,
                as: 'doctor',
                include: {
                    model: User,
                    as: 'user'
                }
            },
            {
                model: Patient,
                as: 'patient',
                include: {
                    model: User,
                    as: 'user'
                }
            }
        ]
    });
    return appointments;
}

const addAppointment = async (appointmentData) => {
    const newAppointment = new AppointmentModel(appointmentData);
    newAppointment.save();
    return newAppointment;
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByPatientId,
    getAppointmentsByDoctorId,
    addAppointment
}