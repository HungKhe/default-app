const db_modal = require('../../model/model.db'); 
module.exports = {
    initAddOneShop: (item, callback) => {
        db_modal.create(item, (err, data) => {
            if (err) {
                callback({'erorr': true, err});
                return false;
            }
            callback({'erorr': false, data});
        })
    },
    initFindOneShop: (domain, callback) => {
        db_modal.findOne({ 'shop_domain': domain }).select('shop_domain need_take info settings list_promotions list_customer totalTurned totalView').lean().exec((err,data)=>{
            if (err)
                callback(err);
            else if (!data)
                callback({'erorr': '404'});
            else
                callback(data);
        })
        // db_modal.find({ shop_domain: domain }, 'shop_domain need_take info settings list_promotions list_customer totalTurned totalView', function (err, docs) {
        //     console.log('docs: ', docs)
        // })
    }, 
    initAjaxRequestFindShop: async (domain) => {
        const request = await db_modal.findOne({ 'shop_domain': domain }).lean().exec().then(r => r )
        .catch(err => err);
        return request;
    },
    initRefreshTokenShop: (domain, newToken, callback) => {
        db_modal.findOneAndUpdate({ 'shop_domain': domain }, { $set: { 'refresh_token': newToken } }, { new: true}).lean().exec((err, data) => {
            if (err)
                callback({'erorr': true, err});
            else if (!data)
                callback({'erorr': true, 'err': '404'});
            else
                callback({'erorr': false, data});
        })
    },
    initUpdateDocumentShop: async (domain, type, objValue) => {
        const request = await db_modal.findOneAndUpdate({ 'shop_domain': domain }, { $set: { [type]: objValue } }, { new: true}).lean().exec().then(r => r )
        .catch(err => err);
        return request;
    },
    initUpdateListCustomer: (domain, list_customer, callback) => {
        db_modal.findOneAndUpdate({ 'shop_domain': domain }, { $set: { "list_customer": list_customer } }, { new: true}).lean().exec((err, data) => {
            if (err)
                callback({'error': true, err});
            else if (!data)
                callback({'error': true, data: {}});
            else
                callback({'error': false, data});
        })
    },
    initFindDataShopWithField: async (domain, field) => {
        const request = await db_modal.findOne({ 'shop_domain': domain }).select(field).lean().exec().then(r => r )
        .catch(err => err);
        return request;
    }
}