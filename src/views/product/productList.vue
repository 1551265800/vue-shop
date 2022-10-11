<template>
    <div>
        <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="id" label="商品ID" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="title" label="商品名称" width="140" show-overflow-tooltip></el-table-column>
            <!--  <el-table-column prop="image" label="商品图片" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="sellPoint" label="介绍" show-overflow-tooltip></el-table-column>
            <el-table-column prop="price" label="商品价格" width="80">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.price }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="商品数量" width="80"></el-table-column>
            <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-html="scope.row.descs"></div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import api from '../../api/index'
import { mapState } from "vuex"
export default {
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.http(1)
        //接受eventBus 传来的页码信息
        this.$bus.$on("onPage",val=>{
            this.http(val)
        })
        //页面刷新
        this.$bus.$on("onRefresh",flag =>{
            this.http()
        })
    },
    computed: {
        ...mapState("loginModel",["search"]),
        searchChange(){
            return this.search
        }
    },
    watch: {
        searchChange(newValue) {
            api.search({
                search:newValue
            }).then(res=>{
                if (res.data.status === 200) {
                    this.tableData = res.data.result
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    methods: {
        http(page) {
            api.selectTbItemAllByPage({page}).then(res => {
            if (res.data.status === 200) {
                this.tableData = res.data.result
            }
            /* console.log(res.data.result); */
        }).catch(err => {
            console.log(err);
        })
        }
    },
}
</script>

<style lang="less" scoped>

</style>