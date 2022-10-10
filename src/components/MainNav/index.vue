<template>
    <div>
        <div class="header">
            <div class="login">
                <el-badge :value="12" class="item">
                    <i class="el-icon-message-solid"></i>
                </el-badge>
                <span class="user-name">{{username}}</span>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <router-link to="/user" tag="span">个人中心</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <div @click="logout">退出</div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-menu :default-active="currentIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
            <el-menu-item index="/product">
                <i class="el-icon-menu"></i>
                <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/params">
                <i class="el-icon-document"></i>
                <span slot="title">规格参数</span>
            </el-menu-item>
            <el-menu-item index="/content">
                <i class="el-icon-setting"></i>
                <span slot="title">广告分类</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import store from "../../store/index"
import { mapState } from "vuex"
export default {
    data() {
        return {
            currentIndex: "/product",
        }
    },
    computed: {
        ...mapState("loginModel", ["username"])
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //退出登陆
        logout() {
            //清除vuex和localstorage中的数据
            store.commit("loginModel/clearToken");
            localStorage.removeItem("shop-token");
            store.commit("loginModel/clearUsername");
            localStorage.removeItem("shop-username");
            this.$router.push("/login")
        }
    }

}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
    width: 200px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    text-align: left;
    z-index: 1000;
}

.lang {
    margin-right: 10px;
}

.header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fff;
    box-shadow: 0px 0px 4px 1px rgba(153, 153, 153, 0.53);
}

.header .user-name {
    color: #fff;
    margin-right: 10px;
    font-size: 15px;
    border: 1px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    background: #999;
}

.header .login {
    height: 50px;
    float: right;
    margin-right: 20px;
}

.header .login .item {
    height: 25px;
    margin-right: 30px;
}

.header .login .item i {
    display: block;
    font-size: 25px;
}
</style>