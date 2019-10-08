export default {
  /**
   * [setCookie 设置cookie]
   * @param json  [键是cookie的键,值是cookie的值]
   * @param exdays  过期时间 天
   * @param domain  host 域
   */
  setCookie: function (json, exdays ,domain) {

    if (json) {
      for (let k in json) {
        var cookieString = k + "=" + json[k]+";path='/'";
        console.log(exdays);
        //判断是否设置过期时间 
        if (exdays > 0) {
          var d = new Date();
          d.setTime(d.getTime() + exdays * 1000 * 60 * 60 * 24);
          console.log(d.toGMTString());
          cookieString = cookieString + "; expires=" + d.toGMTString();
        }
        console.log("domian"+cookieString);
        if(domain){
          cookieString=cookieString+";domain="+domain;
        }
        console.log("domian"+cookieString);
        document.cookie = cookieString;
      }
    }
  },

  /**
   * 获取cookie
   * @param  {系统中已经存的cookie} cookie 就是documen.cookie
   * @param  {字符串} key     想要获取的cookie的键
   * @return {字符串}        想要获取的cookie的值
   */
  getCookie: function (cookie, key) {
    if (cookie) {
      let arr = cookie.split(";");
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i].trim());
      }
      for (let i = 0; i < newArr.length; i++) {
        let keyAndValueArr = newArr[i].split("=");
        if (keyAndValueArr[0] == key) {
          return keyAndValueArr[1];
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  },

  /**
   * 删除指定cookie
   * @param  {字符串} key 想要删除的cookie的键
   * @return {没有返回值}     
   */
  deleteCookie(key) {
    let date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = key + "=" + this.getCookie(document.cookie, key) + "; expires=" + date.toGMTString();
  }
}



