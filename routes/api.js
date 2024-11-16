const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send ('vao api mobile');
})

const mongoose = require('mongoose');

const carModel = require('../models/carModels')

const COMMON = require('../bin/COMMON');

router.get('/list', async (req, res) => {
    await mongoose.connect(COMMON.uri);

    let cars = await carModel.find();

    console.log(cars);

    res.send(cars);
})

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/add_xe', async (req, res) => {
    await mongoose.connect(COMMON.uri);

    // let car = {
    //     ten: 'xe 3',
    //     namSX: 2024,
    //     hang: 'Mitsubishi',
    //     gia: 7500
    // }

    let car = req.body;

    console.log(car)

    let kq = await carModel.create(car);
    console.log(kq);

    let cars = await carModel.find();

    res.send(cars);

})

router.get('/xoa/:id', async (req, res) => {
    await mongoose.connect(COMMON.uri);

    let id = req.params.id;
    console.log(id);

    // xu ly loi khi id khong dung
    await carModel.deleteOne({_id: id});

    res.redirect('../')
}) 

router.get('/update/:ten', async (req, res) => {
    await mongoose.connect(COMMON.uri);

    console.log('Ket noi DB thanh cong');

    let tenXe = req.params.ten;
    console.log(tenXe);

    let tenXeMoi = tenXe + ' Phien ban moi 2024';

    await carModel.updateOne({ten: tenXe}, {ten: tenXeMoi});

    let xehois = await carModel.find({});

    res.send(xehois);
})