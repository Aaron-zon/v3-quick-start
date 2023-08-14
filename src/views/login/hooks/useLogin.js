import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/store/modules/user'
import router from '@/router'
import Cookies from 'js-cookie'

/**
 * 
 * @param {*} loginFormRef 登录页面的表单实体
 * @returns 
 */
export default function useLogin (loginFormRef) {

    onMounted(() => {
        init()
    })



    /** 登录按钮 Loading */
    const loading = ref(false)

    /** 存放登录表单的信息 */
    const loginFormData = reactive({
        account: '',
        password: '',
        remember: false
    })

    /** 登录表单校验规则 */
    const loginFormRules = {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ],
    }

    /** 登录处理 */
    const handleLogin = () => {
        loginFormRef.value?.validate((valid, fields) => {
            debugger
            if (valid) {
                loading.value = true
                useUserStore()
                    .login(loginFormData)
                    .then((res) => {
                        // 记住密码
                        if (loginFormData.remember) {
                            const { account, password, remember } = loginFormData
                            Cookies.set('user-account', account)
                            Cookies.set('user-password', password)
                            Cookies.set('user-remember', remember)
                        }
                        // 跳转至 Home 画面
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

    /** 页面初始化，检查是否有记住密码 */
    const init = () => {
        if (Cookies.get('user-remember') === 'true') {
            loginFormData.account = Cookies.get('user-account')
            loginFormData.password = Cookies.get('user-password')
            loginFormData.remember = true
        }
    }

    return {
        loading, // loading是否启用
        loginFormData, // 表单数据
        loginFormRules, // 表单规则
        handleLogin // 按钮按下
    }
}