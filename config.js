    
module.exports = {
    haravan_api_key_v2: 'fbd1473807780ce3fbe9ab07a11f7947',
    haravan_api_key: '4aa3dfdfa6c1f5e79046e38dacdf966a',
    haravan_shared_secret_v2: '9f27af9ac4cf23709ba595ff10152567f4e24cdb8f40ba7bf31b0b1c2a2db77e',
    haravan_shared_secret: '16d27b623120436f802cd108aaa42911',
    haravan_scope: 'read_themes,write_themes,read_script_tags,write_script_tags',
    haravan_scope_v2: 'openid profile email org userinfo grant_service web.write_script_tags',
    host: process.env.DEPLOY_URI || 'http://localhost:8888/',
    redirect_uri: `${process.env.DEPLOY_URI ? process.env.DEPLOY_URI : 'http://localhost:8888/'}api/authenticate`,
    timestamp: '1402539839',
    signature: '0132e77d7fb358ecd4645d86cfc39d27',
    access_token: "",
    verbose: true,
    port: 443,
    api_shop: {},
    response_type: 'code id_token',
    shop: '',
    code: '',
    protocol: 'https://'
}