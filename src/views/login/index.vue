<script setup>
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import useLogin from './hooks/useLogin';

/** 表单区域DOM */
const loginFormRef = ref(null);

/**
 * loading：登录时按钮loading效果
 * loginFormData：表单数据
 * loginFormRules：表单规则
 * handleLogin：登录按钮按下
 */
const { loading, loginFormData, loginFormRules, handleLogin, visitorHandle } =
    useLogin(loginFormRef);
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <div class="title">
                <img src="@/assets/layout/logo-text-2.png" />
            </div>

            <div class="content">
                <el-form
                    ref="loginFormRef"
                    :model="loginFormData"
                    :rules="loginFormRules"
                    @keyup.enter="handleLogin">
                    <!-- account -->
                    <el-form-item prop="account">
                        <el-input
                            v-model="loginFormData.account"
                            placeholder="账户"
                            type="text"
                            tabindex="1"
                            :prefix-icon="User"
                            size="large"
                            :disabled="loading" />
                    </el-form-item>
                    <!-- password -->
                    <el-form-item prop="password">
                        <el-input
                            v-model="loginFormData.password"
                            placeholder="密码"
                            type="password"
                            tabindex="2"
                            :prefix-icon="Lock"
                            size="large"
                            show-password
                            :disabled="loading" />
                    </el-form-item>
                    <el-form-item prop="remember" class="remember-box">
                        <el-checkbox v-model="loginFormData.remember"
                            >记住密码</el-checkbox
                        >
                    </el-form-item>

                    <el-button
                        :loading="loading"
                        type="primary"
                        size="large"
                        @click.prevent="handleLogin"
                        >登 录</el-button
                    >
                    <div class="visitor-wrapper" @click="visitorHandle">
                        游客登录
                    </div>
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

            .remember-box {
                :deep(.el-form-item__content) {
                    justify-content: end;
                }
            }

            .el-button {
                width: 100%;
                margin-top: 10px;
            }
        }
    }

    .visitor-wrapper {
        text-align: center;
        font-size: 12px;
        margin: 10px 0;
        color: rgb(50, 205, 50);
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>
