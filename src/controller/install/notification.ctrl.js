const modal = require('./modal.ctrl');
const utils = require('../../utils');
module.exports = {
    initGetListNotify: async (req, res) => {
        var shopName = req.query.shop || 'inspire-apps.myharavan.com';
        // if(shopName === '' || !shopName){
        //     let { referer } = req.headers;
        //     shopName = utils.renderShopNameFromHeader(referer).shop || '';
        // }
        // if(typeof shopName === 'undefined' || !shopName || shopName === ''){
        //     res.json({ error: true, message: 'Lỗi! thiếu shop name...', db_shop: {} });
        //     return false;
        // }
        const { id } = req.query;
        const dataShop = await modal.initFindDataShopWithField(shopName, 'list_notify').then(r => r).catch(err => err);
        if(id){
            var obj = null;
            for(let i=0; i<dataShop.list_notify.length; i++){
                if(dataShop.list_notify[i]._id.toString() === id.toString()){
                    obj = dataShop.list_notify[i];
                    break;
                }
            }
            if(!obj){
                res.json({ error: true, message: 'Lỗi! Không tìm thấy thông báo...', db_shop: {} });
                return false;
            }
            res.json({ error: false, message: 'Lấy thông báo thành công...', db_shop: obj });
            return true;
        }
        res.json({ error: false, message: 'Lấy dữ liệu thành công...', db_shop: dataShop.list_notify });
    },
    initAddNotification: async (req, res) => {
        var shopName = req.query.shop || 'inspire-apps.myharavan.com';
        // if(shopName === '' || !shopName){
        //     let { referer } = req.headers;
        //     shopName = utils.renderShopNameFromHeader(referer).shop || '';
        // }
        // if(typeof shopName === 'undefined' || !shopName || shopName === ''){
        //     res.json({ error: true, message: 'Lỗi! thiếu shop name...', db_shop: {} });
        //     return false;
        // }
        let item = req.body;
        item.notifyCreateTime = new Date().toLocaleDateString();
        let dataShop = await modal.initFindDataShopWithField(shopName, 'list_notify').then(r => r).catch(err => err);
        let notifyArr = dataShop.list_notify;
        if(notifyArr.length === 0){
            notifyArr.push(item);
        }else{
            let ind = notifyArr.findIndex(i => { return item.notifyName === i.notifyName });
            if(ind !== -1){
                res.json({ error: true, message: 'Lỗi! Tên thông báo này đã tồn tại...' });
                return false;
            }
            notifyArr.push(item);
        }
        let dataAdd = await modal.initUpdateDocumentShop(shopName, 'list_notify', notifyArr).then(r => r).catch(err => err);
        if(dataAdd.error){
            res.json({ error: true, message: 'Lỗi! Không thể tạo thông báo...' });
        }
        res.json({ error: false, message: 'Tạo mới thông báo thành công...' });
    },
    initUpdateNotification: async (req, res) => {
        var shopName = req.query.shop || 'inspire-apps.myharavan.com';
        // if(shopName === '' || !shopName){
        //     let { referer } = req.headers;
        //     shopName = utils.renderShopNameFromHeader(referer).shop || '';
        // }
        // if(typeof shopName === 'undefined' || !shopName || shopName === ''){
        //     res.json({ error: true, message: 'Lỗi! thiếu shop name...', db_shop: {} });
        //     return false;
        // }
        let item = req.body;
        console.log(item);
        item.notifyCreateTime = new Date().toLocaleDateString();
        let dataShop = await modal.initFindDataShopWithField(shopName, 'list_notify').then(r => r).catch(err => err);
        let notifyArr = dataShop.list_notify;
        if(notifyArr.length === 0){
            res.json({ error: true, message: 'Lỗi! Không tìm thấy thông báo nào...' });
            return false;
        }
        let ind = notifyArr.findIndex(i => { return item._id.toString() === i._id.toString() });
        if(ind < 0){
            res.json({ error: true, message: 'Lỗi! Không tìm thấy thông báo này...' });
            return false;
        }
        notifyArr[ind] = item;
        let dataAdd = await modal.initUpdateDocumentShop(shopName, 'list_notify', notifyArr).then(r => r).catch(err => err);
        if(dataAdd.error){
            res.json({ error: true, message: 'Lỗi! Không thể cập nhật thông báo...' });
        }
        res.json({ error: false, message: 'Cập nhật thông báo thành công...', db_shop: item });
    },
    initDeleteNotification: async (req, res) => {
        var shopName = req.query.shop || 'inspire-apps.myharavan.com';
        // if(shopName === '' || !shopName){
        //     let { referer } = req.headers;
        //     shopName = utils.renderShopNameFromHeader(referer).shop || '';
        // }
        // if(typeof shopName === 'undefined' || !shopName || shopName === ''){
        //     res.json({ error: true, message: 'Lỗi! thiếu shop name...', db_shop: {} });
        //     return false;
        // }
        let reqArray = req.body;
        let dataShop = await modal.initFindDataShopWithField(shopName, 'list_notify').then(r => r).catch(err => err);
        let notifyArr = dataShop.list_notify;
        if(notifyArr.length === 0){
            res.json({ error: true, message: 'Lỗi! Không tìm thấy thông báo nào...' });
            return false;
        }
        let newArray = notifyArr, i = 0;
        while(i < reqArray.length){
            let currentItem = reqArray[i];
            let ind = notifyArr.findIndex(x => currentItem._id.toString() === x._id.toString());
            if(ind !== -1)
                newArray.splice(ind, 1);
            i++;
        }
        let dataAdd = await modal.initUpdateDocumentShop(shopName, 'list_notify', newArray).then(r => r).catch(err => err);
        if(dataAdd.error){
            res.json({ error: true, message: 'Lỗi! Không thể cập nhật thông báo...' });
        }
        res.json({ error: false, message: 'Xóa thông báo thành công...', db_shop: newArray });
    }
}