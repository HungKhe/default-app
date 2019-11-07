const request = require('request')
const config = require('../../../config');
const modal = require('../../model/model.db');
// const themeApi = require('../theme/theme.controller');
module.exports = {
    initGetCodeToken: (req, res) => {
        if(req.query.shop.indexOf('.myharavan') < 0){
            res.json({error: true, message:'Shop không thuộc Haravan...'})
            return false;
        }
        console.log('zzzzzzzzz', req.query);
        if (req.query.code) {
            return false;
            var shopReirect = config.protocol + req.query.shop.split('.')[0] + '.myharavan.com/admin/app#/embed/' + config.haravan_api_key;
            config.shop = req.query.shop;
            var options = {
                method: 'POST',
                url: config.protocol + req.query.shop.split('.')[0] + '.myharavan.com/admin/oauth/access_token',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                form: {
                    client_id: config.haravan_api_key,
                    redirect_uri: config.redirect_uri,
                    client_secret: config.haravan_shared_secret,
                    grant_type: 'authorization_code',
                    code: req.query.code
                }
            };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                body = JSON.parse(body);
                var name = req.query.shop;
                config.access_token = body.access_token;
                modal.initFindOneShop(name, (data) => {
                    // console.log("name: ", name)
                    // console.log(data)
                    if (data.shop_domain) {
                        modal.initRefreshTokenShop(name, body.access_token, (data) => {
                            res.redirect(shopReirect);
                        })
                    } else {
                        var item = {
                            shop_domain: name,
                            access_token: body.access_token,
                            totalTurned: 0,
                            totalView: 0,
                            need_take: {
                                take_name: false,
                                take_email: true,
                                take_phone: false
                            },
                            info: {
                                name_button: 'Bắt đầu quay',
                                name_button_turnning: 'Đang quay',
                                name_button_view: 'Xem quà',
                                name_popup: 'Danh sách quà tặng đạt được',
                                name_list_gift: 'Quà tặng bạn có thể đạt được',
                                name_miss_gift: 'Chúc bạn may mắn lần sau!!!'
                            },
                            settings: {
                                limit_turn: 3,
                                require_login: false,
                                time_return: 1
                            },
                            list_promotions: [
                                {
                                    promotionName: '',
                                    promotionLevel: -1,
                                    promotionCode: ''
                                }
                            ]
                        }
                        modal.initAddOneShop(item, (data) => {
                            //console.log(item)
                            // themeApi.initInstallCodeTheme();
                            res.redirect(shopReirect);
                        }) 
                    }
                })
            });
        } else {
            var auth_url = "https://accounts.haravan.com/connect/authorize";
            auth_url += "?response_mode=form_post";
            auth_url += "&response_type=" + config.response_type;
            auth_url += "&scope=" + config.haravan_scope_v2;
            auth_url += "client_id=" + config.haravan_api_key;
            auth_url += "&redirect_uri=" + config.redirect_uri;
            auth_url += "&nonce=" + new Date().getTime();
            res.redirect(auth_url); 
        }
    }
}