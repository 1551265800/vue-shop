import Vue from "vue"
import VueI18n from "vue-i18n"

Vue.use(VueI18n)

const messages = {
    en: {
        message: {
            project: "project",
            parmas: "parmas",
            content: "content",
            search:"search",
            add:"add"

        }
    },
    ja: {
        message: {
            project: "商品管理",
            parmas: "仕様パラメータ",
            content: "広告の分類",
            search: "検索",
            add:"追加"
        }
    },
    zh: {
        message: {
            project: "商品管理",
            parmas: "规格参数",
            content: "广告分类",
            search:"查询",
            add:"添加"
        }
    }
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})


export default i18n