'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
let domain="bwplus";
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"//172.24.182.76:8081"',
  GOOGLE_APP_CLIENT_ID:'"157122725629-vmjji99ukd62pbdmhl0ul1cnir7hip89.apps.googleusercontent.com"',
  FACEBOOK_APP_CLIENT_ID:'"685267178601621"',
  COOKIE_DOMAIN:'".bwplus.com.tw"',
})
