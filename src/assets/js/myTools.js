export default {

  setDate(time) {
    var oDate = new Date(time * 1),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oTime = oYear + '.' + getBz(oMonth) + '.' + getBz(oDay) + ' ' + getBz(oHour) + ':' + getBz(oMin)
    return oTime

    function getBz(num) {
      if (parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    }
  },
  setYYY_MM_ddDate(time) {
    var oDate = new Date(time * 1),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oTime = oYear + '-' + getBz(oMonth) + '-' + getBz(oDay)
    return oTime

    function getBz(num) {
      if (parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    }
  },
  //格式化时期的方法
  setYYYYMMddDate(time) {
    var oDate = new Date(time * 1),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oTime = oYear + '.' + getBz(oMonth) + '.' + getBz(oDay)
    return oTime

    function getBz(num) {
      if (parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    }
  },

/**
 * 获取当前月的最后一天
 * @returns {Date}
 */
  getCurrentMonthLast(){
    let date=new Date();
    let currentMonth=date.getMonth();
    let nextMonth=++currentMonth;
    let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    let oneDay=1000*60*60*24;
    let lastTime = new Date(nextMonthFirstDay-oneDay);
    let month = parseInt(lastTime.getMonth()+1);
    let day = lastTime.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return date.getFullYear() + '.' + month + '.' + day;
  }
}
