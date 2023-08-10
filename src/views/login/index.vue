<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { User, Lock } from '@element-plus/icons-vue'
import router from '@/router';

/** 表单区域DOM */
const loginFormRef = ref(null)

/** 登录按钮 Loading */
const loading = ref(false)

// 存放登录表单的信息
const loginFormData = reactive({
    username: 'admin',
    password: '12345678',
    remember: '0'
})

/** 登录表单校验规则 */
const loginFormRules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
    ],
}

/** 登录处理 */
const handleLogin = () => {
    loginFormRef.value?.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            useUserStore()
                .login(loginFormData)
                .then((res) => {
                    if (loginFormData.remember) {
                        const { username, password, remember } = loginFormData;
                    }
                    router.push({name: 'home'})
                })
                .catch(() => {
                    loginFormData.password = ''
                })
                .finally(() => {
                    loading.value = false
                })
                
        } else {
            console.error("表单校验不通过", fields)
        }
    })
}

</script>

<template>
    <div class="login-container">
        <div class="login-card">

            <div class="title">
                <img src="@/assets/layout/logo-text-2.png" />
            </div>

            <div class="content">
                <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
                    <!-- username -->
                    <el-form-item prop="username">
                        <el-input 
                            v-model="loginFormData.username"
                            placeholder="账户"
                            type="text"
                            tabindex="1"
                            :prefix-icon="User"
                            size="large"
                            :disabled="loading"
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
                            size="large"
                            show-password
                            :disabled="loading"
                        />
                    </el-form-item>
                    <el-form-item prop="remember">
                        <el-radio-group v-model="loginFormData.remember">
                            <el-radio :label="true" size="large">记住密码</el-radio>
                        </el-radio-group>
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