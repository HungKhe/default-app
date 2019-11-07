const express = require('express');
const router = express.Router();
const authToken = require('../controller/install/token.ctrl');
const notification = require('../controller/install/notification.ctrl');

router.route('/notification')
    .get(notification.initGetListNotify)
    .post(notification.initAddNotification)
    .put(notification.initUpdateNotification)

router.route('/delete-notification')
    .post(notification.initDeleteNotification)

router.route('/authenticate')
    .get(authToken.initGetCodeToken);

// router.route('/promotion')
//     .get(promotion.initGetPromotion)
//     .post(promotion.initAddPromotion)

module.exports = router;