// 引入
import Vue from 'vue'
import Vuex from 'vuex'
// 使用
Vue.use(Vuex)
// 引入小store
import Home from './Home'
import ArtDetail from './ArtDetail'
import TypeDetail from './TypeDetail'
import AuthorDetail from './AuthorDetail'
import User from './User'
import Collect from './Collect'
import Comment from './Comment'
// 导出
export default new Vuex.Store({
    modules: {
        Home,
        ArtDetail,
        TypeDetail,
        AuthorDetail,
        User,
        Collect,
        Comment
    }
})
