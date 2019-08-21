export default {

setDate(time){

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
  setYYY_MM_ddDate(time){

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
  }

}
