<template>
    <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
import api from "../../api/index"
export default {
    data() {
        return {
            total: 0
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.$bus.$emit("onPage",val)
        }
    },
    mounted () {
        api.total().then(res=>{
            if (res.data.status === 200) {
                this.total = res.data.result[0]["count(*)"]
            }
        }).catch(err=>{
            console.log(err);
        });
    },
}
</script>

<style lang="less" scoped>
.pagination {
    margin-top: 30px;
}
</style>