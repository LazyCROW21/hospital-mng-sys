const { Op, col } = require('sequelize');
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const ReportModel = require('../models/report');
const User = require('../models/user');

ReportModel.sync();

const getAllReports = async () => {
    return ReportModel.findAll({
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
        ],
        order: [['createdAt', 'DESC']]
    });
}

const getReportById = async (id) => {
    return ReportModel.findByPk(id, {
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
        ],
        order: [['createdAt', 'DESC']]
    })
}

const getReportsByPatientId = async (patientId) => {
    return ReportModel.findAll({
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
        ],
        order: [['createdAt', 'DESC']]
    });
}

const getReportsByDoctorId = async (doctorId) => {
    return ReportModel.findAll({
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
        ],
        order: [['createdAt', 'DESC']]
    });
}

const getNewReports = async (role, id) => {
    const currDate = new Date(new Date() - 1000 * 60 * 60 * 24 * 2);
    let query = {
        where: {
            [Op.or]: {
                updatedAt: {
                    [Op.gte]: currDate
                },
                createdAt: { [Op.eq]: col('updatedAt') }
            }
        },
        order: [['createdAt', 'DESC']]
    };
    switch (role) {
        case 'admin':
            break;
        case 'doctor':
            query.where.doctorId = id;
            break;
        case 'patient':
            query.where.patientId = id;
            break;
    }
    return ReportModel.findAndCountAll(query);
}

const addReport = async ({ id, patientId, doctorId, preferredDateTime }) => {
    const reportData = {
        appointmentId: id,
        patientId,
        doctorId,
        dateAdmitted: preferredDateTime,
        dateDischarged: null,
        treatmentType: null,
        description: null,
        status: 'progress',
        patientStatus: 'unchanged'
    };
    const newReport = new ReportModel(reportData);
    await newReport.save();
    return newReport;
}

const updateReport = async (id, data) => {
    const report = await ReportModel.findByPk(id, {
        include: [
            {
                model: Appointment,
                as: 'appointment'
            },
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
    if(!report) {
        return null;
    }
    report.set(data);
    return report.save();
}

const deleteReport = async (id) => {
    return ReportModel.destroy({ where: { id } });
}



module.exports = {
    getAllReports,
    getReportById,
    getReportsByPatientId,
    getReportsByDoctorId,
    addReport,
    updateReport,
    deleteReport,
    getNewReports
}