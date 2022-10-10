<template>
    <div class="head">

        <el-form :model="search"  ref="searchForm" label-width="100px" @submit.native.prevent>
            <el-form-item label="模糊查询">
                <el-input type="text" v-model="search.content"  @keyup.enter.native="onSubmitSearch"></el-input>
            </el-form-item>
            <el-form-item class="btn-container">
                <el-button type="primary" @click="onSubmitSearch">查询</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
    methods: {
        ...mapMutations("loginModel",["setSearch"]),
        onSubmitSearch() {
            this.setSearch(this.search.content)
        }
    },
    data() {
        return {
            search: {
                content:""
            }
        }
    },
}
</script>

<style lang="less" scoped>
.el-form {
    overflow: hidden;
    clear: both;
    display: flex;
    width: 100%;
    display: flex;
   .btn-container{
    margin-left: -100px;
   }
    .el-form-item {
        float: left;
        margin-right: 10px;
        // flex: 1;
        .el-input {
            .el-input__inner {
                flex: 1;
            }
            width: 950px;
        }
    }
}

.head {
    margin-top: 20px;
    width: 100%;
}
</style>