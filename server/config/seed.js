/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var moment = require('moment'),
    q = require('q'),
    Medication = require('../api/medication/medication.model');

// q(Medication.findOne({}).exec()).then(function (med) {
//     var currentDate = moment().startOf('day'),
//         numMeds,
//         i;

    Medication.remove({ }, function(err, result) {if (err) throw err});
    Medication.create({
        name: 'Memantine',
        dosage: 10 + ' mL',
        time: moment().subtract(0.5, 'hours').toDate(),
        completed: true,
        d: {
            c: moment().toDate()
        }
    }, function (err, result) {
        if (err) {
            console.error(err);
        }
    });
    Medication.create({
        name: 'donepezil (Aricept)',
        dosage: 10 + ' mL',
        time: moment().subtract(2, 'hours').toDate(),
        completed: false,
        d: {
            c: moment().toDate()
        }
    }, function (err, result) {
        if (err) {
            console.error(err);
        }
    });
    Medication.create({
        name: 'Vitamin E',
        dosage: 20 + ' mL',
        time: moment().subtract(3, 'minutes').toDate(),
        completed: false,
        d: {
            c: moment().toDate()
        }
    }, function (err, result) {
        if (err) {
            console.error(err);
        }
    });
    Medication.create({
        name: 'galantamine (Razadyne)',
        dosage: 20 + ' mL',
        time: moment().add(3, 'minutes').toDate(),
        completed: false,
        d: {
            c: moment().toDate()
        }
    }, function (err, result) {
        if (err) {
            console.error(err);
        }
    });
    Medication.create({
        name: 'Pravachol (pravastatin)',
        dosage: 20 + ' mL',
        time: moment().add(1, 'hours').toDate(),
        completed: false,
        d: {
            c: moment().toDate()
        }
    }, function (err, result) {
        if (err) {
            console.error(err);
        }
    });
    Medication.create({
        name: 'Crestor (rosuvastatin)',
        dosage: 20 + ' mL',
        time: moment().add(2, 'hours').toDate(),
        completed: false,
        d: {
            c: moment().toDate()
        }
    }, function (err, result) {
        if (err) {
            console.error(err);
        }
    });




//     while (!med && currentDate.isBefore(moment().add(1, 'year'))) {
//         numMeds = Math.floor((Math.random() * 24) + 1);
//         for (i = 1; i <= numMeds; i++) {
//             Medication.create({
//                 name: 'Medication ' + i,
//                 dosage: i * 10 + ' mL',
//                 time: currentDate.clone().add(i * 24 / numMeds, 'hours').toDate(),
//                 completed: false,
//                 d: {
//                     c: moment().toDate()
//                 }
//             }, function (err, result) {
//                 if (err) {
//                     console.error(err);
//                 }
//             });
//         }
//         currentDate.add(1, 'day')
//     }
// }).catch(function (err) {
//     console.log('Error running seed', err);
// });
