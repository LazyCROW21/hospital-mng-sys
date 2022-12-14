const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Appointment = require('./appointment');
const Doctor = require('./doctor');
const Patient = require('./patient');

const Report = sequelize.define('Report', {
    appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateAdmitted: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateDischarged: {
        type: DataTypes.DATE,
        allowNull: true
    },
    treatmentType: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    patientStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unchanged'
    }
}, {
    timestamps: true
});

Report.belongsTo(Appointment, { foreignKey: 'appointmentId', as: 'appointment' });
Report.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Report.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = Report;