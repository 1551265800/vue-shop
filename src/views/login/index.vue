<template>
    <div>
        <div class="banner">商城后台系统</div>
        <el-card class="box-card">
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                <el-tab-pane label="登陆" name="login">
                    <el-form :model="loginForm" status-icon ref="loginForm" label-width="100px">
                        <el-form-item label="密码">
                            <el-input type="text" v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input type="password" v-model="loginForm.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitLoginForm('loginForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">注册</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: "login",
            loginForm: {
                username: 'admin',
                password: 'admin',
            },
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        submitLoginForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //表单校验通过
                    //console.log(this.loginForm);
                    alert('数据已提交!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
}
</script>

<style lang="less" scoped>
.banner {
    font-size: 30px;
    margin-top: 100px;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 600px;
    margin: 0 auto;
    margin-top: 20px;
}
</style>