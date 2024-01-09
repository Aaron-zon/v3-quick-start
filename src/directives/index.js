import { permission } from './permission';

/** 挂载自定义指令 */
export function loadDirectives(app) {
    app.directive("permission", permission)
}
