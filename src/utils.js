module.exports = {
    renderShopNameFromHeader: function(str){
        if(!str || typeof str === 'undefined') return '';
        let objURL = {};
        str.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function($0, $1, $2, $3) {
                objURL[$1] = $3;
        });
        return objURL;
    },
    renderHostApi: function(){
        return process.env.DEPLOY_URI || 'http://localhost:8888/';
    }
}