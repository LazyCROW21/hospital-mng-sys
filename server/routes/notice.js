const express = require('express');
const router = express.Router();
const client = require('../config/redis');

const noticeValidationSchema = require('../helper/validation/notice');
const validation = require('../middlewares/validation');
const access = require('../middlewares/access');

router.get(
    '/:role(patient|doctor|admin)',
    async (req, res) => {
        const notice = await client.get('notice-' + req.params.role);
        res.send(JSON.parse(notice));
    });


router.put(
    '/:role(patient|doctor|admin)',
    access(['A'], null, null, null, ['SA', 'CHG_N']),
    validation(noticeValidationSchema), 
    async (req, res) => {
        const notice = { ...req.body, date: new Date() };
        await client.set('notice-' + req.params.role, JSON.stringify(notice), {
            'EX': 84000
        });
        res.send(notice);
        const io = await req.app.get("socket");
        io.emit('notice-' + req.params.role, notice);
    });

module.exports = router;