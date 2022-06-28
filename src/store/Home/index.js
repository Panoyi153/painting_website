import { reqAuthorList, reqPaintList, reqTypeList } from '@/api'
const actions = {
    // 获取绘画列表数据
    async getPaintList(store, searchParams) {
        let result = await reqPaintList(searchParams);
        if (result.code === 200) {
            store.commit('GETPAINTLIST', result.data)
        } else {
            console.log(result.message);
            return Promise.reject(new Error('error'))
        }
    },
    // 获取流派列表数据
    async getTypeList(store, searchParams) {
        let result = await reqTypeList(searchParams)
        if (result.code === 200) {
            store.commit('GETTYPELIST', result.data)
        } else {
            console.log(result.message);
            return Promise.reject(new Error('error'))
        }
    },
    // 获取作者列表数据
    async getAuthorList(store, searchParams) {
        let result = await reqAuthorList(searchParams)
        if (result.code === 200) {
            store.commit('GETAUTHORLIST', result.data)
        } else {
            console.log(result.message);
            return Promise.reject(new Error('error'))
        }
    }
}
const mutations = {
    // 获取绘画列表数据
    GETPAINTLIST(state, paintList) {
        state.paintList = paintList
    },
    // 获取流派列表数据
    GETTYPELIST(state, typeList) {
        state.typeList = typeList
    },
    // 获取作者列表数据
    GETAUTHORLIST(state, authorList) {
        state.authorList = authorList
    }
}
const state = {
    // 绘画列表返回的结果
    paintList: {},
    // 流派列表数据
    typeList: {},
    // 作者列表数据
    authorList: {}
}
const getters = {
    /***** 绘画列表相关 *****/
    // 获取到总数据条数
    artTotalCount(state) {
        return state.paintList.totalCount
    },
    // 获取到所有的数据
    artworkTotal(state) {
        return state.paintList.listData || []
    },
    // 获取到每页的数据
    artwork(state) {
        return state.paintList.newData || []
    },

    /***** 流派列表相关 *****/
    // 获取到流派表总数据条数
    typeTotalCount(state) {
        return state.typeList.totalCount
    },
    // 获取到流派总数据
    typedataTotal(state) {
        return state.typeList.listData || []
    },
    // 获取到当前页面的流派数据
    typeData(state) {
        return state.typeList.newData || []
    },

    /***** 作者列表相关 *****/
    // 获取到作者表总数据条数
    authorTotalCount(state) {
        return state.authorList.totalCount
    },
    // 获取到作者总数据
    authordataTotal(state) {
        return state.authorList.listData || []
    },
    // 获取到当前页面的作者数据
    authorData(state) {
        return state.authorList.newData || []
    },

}
export default {
    actions,
    mutations,
    state,
    getters
}