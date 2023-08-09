/** 免登录白名单（匹配路由 path） */
const whiteListByPath = ['/login']

/** 免登录白名单（匹配路由 name） */
const whiteListByName = ['login']

/** 判断访问页面是否在白名单内 */
const isWhiteList = (to) => {
    return whiteListByPath.indexOf(to.path) !== -1 || whiteListByName.indexOf(to.name) != -1
}

export default isWhiteList
