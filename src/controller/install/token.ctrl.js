const request = require('request')
const config = require('../../../config');
const modal = require('./modal.ctrl');
// const themeApi = require('../theme/theme.controller');
module.exports = {
    initGetCodeToken: (req, res) => {
        if(req.query.shop.indexOf('.myharavan') < 0){
            res.json({error: true, message:'Shop không thuộc Haravan...'})
            return false;
        }
        if (req.query.code) {
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
                    if (data.shop_domain) {
                        modal.initRefreshTokenShop(name, body.access_token, (data) => {
                            res.redirect(shopReirect);
                        })
                    } else {
                        var item = {
                            shop_domain: name,
                            access_token: body.access_token,
                            list_notify: []
                        }
                        modal.initAddOneShop(item, (data) => {
                            // console.log(item)
                            // themeApi.initInstallCodeTheme();
                            res.redirect(shopReirect);
                        }) 
                    }
                })
            });
        } else {
            var auth_url = config.protocol + req.query.shop.split('.')[0];
            auth_url += ".myharavan.com/admin/oauth/authorize?";
            auth_url += "client_id=" + config.haravan_api_key;
            auth_url += "&scope=" + config.haravan_scope;
            auth_url += "&redirect_uri=" + config.redirect_uri;
            auth_url += "&response_type=code";
            res.redirect(auth_url); 
        }
    }
}