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
                <el-tab-pane label="注册" name="register">
                    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px">
                        <el-form-item label="用户名" prop="username">
                            <el-input type="text" v-model="registerForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input type="email" v-model="registerForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="registerForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkpassword">
                            <el-input type="password" v-model="registerForm.checkpassword"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitRegisterForm('registerForm')">提交</el-button>
                        </el-form-item>
                    </el-form>

                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
import api from '../../api'
import { mapMutations } from "vuex"
import jwtDedode from "jwt-decode";
export default {
    data() {
        //用户名验证规则
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入用户名'));
            }
            setTimeout(() => {
                if (value.length < 4 || value.length > 11) {
                    return callback(new Error('请正确输入用户名'));
                }
            }, 1000);

            callback();
        };
        //邮箱验证规则
        var checkEmail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入邮箱'));
            }
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (!regEmail.test(value)) {
                return callback(new Error('邮箱不符合规则'));
            }
            callback();
        };
        //密码验证规则
        var checkPassword = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'));
            }
            callback();
        };
        //确认密码
        var check2Password = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'));
            }
            if (value !== this.registerForm.password) {
                return callback(new Error('两次输入的密码必须相同'));
            }
            callback();
        };
        return {
            activeName: "login",
            loginForm: {
                username: 'swz',
                password: 'swz',
            },
            registerForm: {
                username: '',
                password: '',
                email: '',
                checkpassword: ''
            },
            rules: {
                //验证 失去焦点触发
                username: [{ validator: checkUsername, trigger: 'blur' }],
                email: [{ validator: checkEmail, trigger: 'blur' }],
                password: [{ validator: checkPassword, trigger: 'blur' }],
                checkpassword: [{ validator: check2Password, trigger: 'blur' }],
            }
        }
    },
    methods: {
        ...mapMutations("loginModel", ["updataUsername", "updataToken"]),
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //提交登陆信息
        submitLoginForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //表单校验通过
                    //console.log(this.loginForm);
                    api.login({
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                    }).then(res => {
                        /* console.log(res.data); */
                        if (res.data.status === 200) {
                            //this.updataUsername(res.data.result[0].username)
                            //存入vuex
                            this.updataToken(res.data.token) 
                            localStorage.setItem("shop-token", res.data.token);
                            //存储用户名
                            const logUsername = jwtDedode(res.data.token).username
                            this.updataUsername(logUsername);
                            localStorage.setItem("shop-username", logUsername);
                            this.$router.push("/")
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //提交注册信息
        submitRegisterForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.register({
                        username: this.registerForm.username,
                        password: this.registerForm.password,
                        email: this.registerForm.email
                    }).then(res => {
                        console.log(res);
                        if (res.data.status === 200) {
                            this.$message({
                                showClose: true,
                                message: res.data.mag,
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.mag,
                                type: 'error'
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    console.log('注册失败');
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