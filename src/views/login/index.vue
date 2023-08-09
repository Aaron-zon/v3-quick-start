<script setup>
import { ref, reactive } from 'vue'

/** 登录按钮 Loading */
const loading = ref(false)

// 存放登录表单的信息
const loginFormData = reactive({
    username: 'admin',
    password: '12345678',
    code: ''
})

/** 登录表单校验规则 */
const loginFormRules = {
    username: [],
    password: [

    ],
    code: []
}

/** 登录处理 */
const handleLogin = () => {

}

</script>

<template>
    <div class="login-container">
        <div class="login-card">

            <div class="title">
                <img src="@/assets/layout/logo-text-2.png" />
            </div>

            <div class="content">
                <el-form v-model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
                    <!-- username -->
                    <el-form-item prop="username">
                        <el-input 
                            v-model="loginFormData.username"
                            placeholder="账户"
                            type="text"
                            tabindex="1"
                            :prefix-icon="User"
                            size="large"
                        />
                    </el-form-item>
                    <!-- password -->
                    <el-form-item prop="password">
                        <el-input 
                            v-model="loginFormData.password"
                            placeholder="密码"
                            type="password"
                            tabindex="2"
                            :prefix-icon="Lock"
                        />
                    </el-form-item>
                    <!-- code -->
                    <el-form-item prop="code">

                    </el-form-item>
                    <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">登 录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100%;

    .login-card {
        width: 480px;
        border-radius: 20px;
        box-shadow: 0 0 10px #dcdfe6;
        background: #fff;
        overflow: hidden;
        
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;

            img {
                height: 100%;
            }
        }

        .content {
            padding: 20px 50px 50px 50px;

            :deep(.el-input-group__append) {
                padding: 0;
                overflow: hidden;

                .el-image {
                    width: 100px;
                    height: 40px;
                    border-left: 0px;
                    user-select: none;
                    cursor: pointer;
                    text-align: center;
                }
            }

            .el-button {
                width: 100%;
                margin-top: 10px;
            }
        }
    }

}
</style>