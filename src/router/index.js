// 引入插件
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Home from '../pages/Home'
import ArtList from '../pages/ArtList'
import AuthorList from '../pages/AuthorList'
import TypeList from '../pages/TypeList'
import ArtDetail from '../pages/ArtDetail'
import AuthorDetail from '../pages/AuthorDetail'
import TypeDetail from '../pages/TypeDetail'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PersonalCenter from '@/pages/PersonalCenter'
import Findpas from '@/pages/Findpas'
// 二级路由
import CollectList from '@/pages/PersonalCenter/CollectList'
import UpUserInfo from '@/pages/PersonalCenter/UpUserInfo'
// 引入仓库
import store from '@/store'

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/home',
            component: Home,
        },
        {
            name: 'artlist',
            path: '/artlist',
            component: ArtList,
        },
        {
            name: 'authorlist',
            path: '/authorlist',
            component: AuthorList
        },
        {
            name: 'typelist',
            path: '/typelist',
            component: TypeList
        },
        {
            name: 'authordetail',
            path: '/authordetail/:authorid',
            component: AuthorDetail
        },
        {
            name: 'artdetail',
            path: '/artdetail/:artid',
            component: ArtDetail
        },
        {
            name: 'typedetail',
            path: '/typedetail/:typeid',
            component: TypeDetail
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'register',
            path: '/register',
            component: Register
        },
        {
            name: 'personalcenter',
            path: '/personalcenter',
            component: PersonalCenter,
            children: [
                { name: 'collectlist', path: 'collectlist', component: CollectList },
                { name: 'upuserinfo', path: 'upuserinfo', component: UpUserInfo },
                { path: '/personalcenter', redirect: '/personalcenter/collectlist' }
            ],
        },
        {
            name: 'findpas',
            path: '/findpas',
            component: Findpas
        },
        {
            path: '/',
            redirect: '/home'
        },
    ],
    // 滚动事件，固定到顶部
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
export default router;

// 全局前置守卫

router.beforeEach(async (to, from, next) => {
    let token = store.state.User.token;
    let userInfo = store.state.User.userInfo
    if (token) {
        console.log('有token');
        // 登录的情况，有token
        if (to.path == '/login') {
            console.log('登录之后不能再去登录页');
            // 登录之后不能再去登录页
            next('/personalcenter')
        } else {
            // 去的不是登录页
            console.log('去的不是登录页');
            if (userInfo.username) {
                // 如果已经有用户信息存在
                console.log('有用户信息');
                next();
            }
            else {
                // 如果没有用户信息（刷新页面的情况），重新获取用户信息，发送请求
                console.log('刷新页面');
                try {
                    console.log('发送获取用户信息的请求');
                    await store.dispatch('getUserinfo', token);
                    next();
                } catch (error) {
                    // return Promise.reject(new Error('fail'));
                    // token失效，获取不到用户信息，需要重新登录
                    // 要清除储存的token
                    // console.log('token失效，获取不到用户信息');
                    console.log('清除存储的token');
                    this.$store.dispatch("loginOut");
                    // await store.dispatch('clearInfo');
                    next();

                }
            }
        }
    }
    else {
        // 没登录的情况
        // let toPath = to.path;
        if (to.path.indexOf('/personalcenter') != -1) {
            // 如果要去的个人中心，则跳转至登录页
            console.log('未登录', to.path);
            next('/login?redirect=' + to.path);
        }
        else {
            next();
        }
    }
    // else {
    //     next();
    // }
})
//解决点击相同路由报错 NavigationDuplicated: Avoided redundant navigation to current location: "/home".
// 尝试了在main.js 中写 push未定义 会报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
