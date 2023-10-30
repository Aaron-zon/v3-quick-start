import router from '.';
import { useUserStoreHook } from '@/store/modules/user.js';
import { usePermissionStoreHook } from '@/store/modules/permission.js';
import { getToken } from '@/utils/cache/cookies';
import asyncRouteSettings from '@/config/async-route';
import isWhiteList from '@/config/white-list';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 取消右上角旋转的默认样式
NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, _from, next) => {
    NProgress.start();
    const userStore = useUserStoreHook();
    const permissionStore = usePermissionStoreHook();
    // 判断用户是否已登录
    if (getToken()) {
        const token = getToken();

        // 游客访问时执行以下代码，不经过接口直接登录
        if (token == 'visitor-user') {
            if (to.name === 'Login') {
                next({ name: 'Home' });
                NProgress.done();
            } else {
                userStore.visitorInfo();
                const roles = userStore.roles;
                permissionStore.setRoutes(roles);
                next();
            }
            return;
        }

        // 已登录且访问画面是login时直接跳转至Home画面
        if (to.name === 'Login') {
            next({ name: 'Home' });
            NProgress.done();
        } else {
            // 检查用户权限（防止当前页面是用户无权限查看的画面）
            if (userStore.roles.length === 0) {
                try {
                    // 检查是否为动态路由模式
                    if (asyncRouteSettings.open) {
                        // 动态路由模式
                        await userStore.getInfo();
                        const roles = userStore.roles;
                        // 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
                        permissionStore.setRoutes(roles);
                    } else {
                        // 没有开启动态路由功能，则启用默认角色
                        userStore.setRoles(asyncRouteSettings.defaultRoles);
                        permissionStore.setRoutes(
                            asyncRouteSettings.defaultRoles,
                        );
                    }
                    // 将'有访问权限的动态路由' 添加到 Router 中
                    permissionStore.dynamicRoutes.forEach((route) => {
                        router.addRoute(route);
                    });
                    // 确保添加路由已完成
                    // 设置 replace: true, 因此导航将不会留下历史记录
                    next({ ...to, replace: true });
                } catch (err) {
                    userStore.resetToken();
                    next({ name: 'Login' });
                    NProgress.done();
                }
            } else {
                next();
            }
        }
    } else {
        // 没有Token代表用户没有登陆过
        if (isWhiteList(to)) {
            // 在白名单内
            next();
        } else {
            // 不在白名单内，重定向到登录画面
            next({ name: 'Login' });
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});
