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
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        this.$bus.$on("onPage", val => {
            this.http(val)
        })
        //页面刷新
        this.$bus.$on("onRefresh", flag => {
            this.http()
        })
    },
    computed: {
        ...mapState("loginModel", ["search"]),
        searchChange() {
            return this.search
        }
    },
    watch: {
        searchChange(newValue) {
            api.search({
                search: newValue
            }).then(res => {
                if (res.data.status === 200) {
                    this.tableData = res.data.result
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    methods: {
        http(page) {
            api.selectTbItemAllByPage({ page }).then(res => {
                if (res.data.status === 200) {
                    this.tableData = res.data.result
                }
                /* console.log(res.data.result); */
            }).catch(err => {
                console.log(err);
            })
        },
        //编辑
        handleEdit(index, row) {
            
        },
        //删除
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.deleteItemById({
                    id: row.id
                }).then(res => {
                    if (res.data.status === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.http()
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    },
}
</script>

<style lang="less" scoped>

</style>