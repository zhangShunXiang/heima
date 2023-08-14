// postcss.config.js
 const pxtorom = require('@minko-fe/postcss-pxtorem')

 module.exports = {
  plugins: {


    'postcss-pxtorem': {
      rootValue({file}){
        return file.indexOf('vant')!==-1?37.5:75
      },
      propList: ['*']
    }
  }
}
