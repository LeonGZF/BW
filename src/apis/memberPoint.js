import request from '@/utils/request'
import Cookie from '@/assets/js/cookie'

export function getMembershipPointInfo() {
  try {
    return request.post('/ponitManager/getMembershipPointInfo', {
      token:Cookie.getCookie(document.cookie,'token'),
      // token: "ef0a47ad-93b3-4bb8-b942-fd2999955ca9"
    })
  } catch (error) {
    return error;
  }
}
export function getPointHistoryActionList(cuurentPage) {
  try {
    return request.post('/ponitManager/getPointHistoryActionList', {
      token: Cookie.getCookie(document.cookie,'token'),
      // token: "ef0a47ad-93b3-4bb8-b942-fd2999955ca9",
      cuurentPage: cuurentPage,
      pageSize: 10

    })
  } catch (error) {
    return error;
  }
}
