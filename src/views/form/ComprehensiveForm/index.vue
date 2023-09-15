<script setup>
import { ref, reactive } from 'vue'

// 表单位置设定
const containerRadio = ref('center');
// 表单的label设定
const labelRadio = ref('right');
// 表单绑定值
const ruleForm = ref({
    name: null,
    phone: '',
    email: '',
    address: '',
    merchant: '',
    type: [],
    resources: '',
    grade: null,
    desc: '',
});

// 表单规则
const rules = reactive({
    name: [
        {required: true, message: '请输入姓名', trigger: 'blur'},
        {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
    ],
    phone: [
        {required: true, message: '请输入手机号', trigger: 'blur'},
        {min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur'}
    ]
});

const submitForm = (refName) => {

}

const resetForm = (refName) => {

}
</script>

<template>
    <div class="comprehensive-form-container app-container">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>Card name</span>
                </div>
            </template>
            <!-- 1. 表单位置设定 -->
            <el-row :class="{'form-center': containerRadio == 'center', 'form-left': containerRadio == 'left'}">
                <el-radio-group class="set-wrapper" v-model="containerRadio" size="large">
                    <el-radio-button label="left">居左</el-radio-button>
                    <el-radio-button label="center">居中</el-radio-button>
                </el-radio-group>
            </el-row>
            <!-- 2. 表单的label设定 -->
            <el-row :class="{'form-center': containerRadio == 'center', 'form-left': containerRadio == 'left'}">
                <el-radio-group class="set-wrapper" v-model="labelRadio" size="large">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
            </el-row>
            <!-- 3. 表单详细 -->
            <el-row class="form-wrapper" :class="{'form-center': containerRadio == 'center', 'form-left': containerRadio == 'left'}">
                <el-col :lg="12" :xl="12" :md="20" :sm="20" :xs="24">
                    <el-form ref="ruleFormRef" label-width="100px" :model="ruleForm" :rules="rules" :label-position="labelRadio" status-icon>
                        <!-- 3.1 用户姓名 -->
                        <el-form-item label="用户姓名" prop="name">
                            <el-input v-model="ruleForm.name" />
                        </el-form-item>
                        <!-- 3.2 手机号 -->
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="ruleForm.phone" />
                        </el-form-item>
                        <!-- 3.3 邮箱 -->
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="ruleForm.email" />
                        </el-form-item>
                        <!-- 3.4送货地址 -->
                        <el-form-item label="送货地址" prop="address">
                            <el-input v-model="ruleForm.address" />
                        </el-form-item>
                        <!-- 3.5 选择商家 -->
                        <el-form-item label="选择商家" prop="merchant">
                            <el-select v-model="ruleForm.merchant" placeholder="请选择商家">
                                <el-option label="淘宝" value="shanghai" />
                                <el-option label="京东" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <!-- 3.6 经营模式 -->
                        <el-form-item label="经营模式" prop="type">
                            <el-checkbox-group v-model="ruleForm.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type" />
                                <el-checkbox label="地推活动" name="type" />
                                <el-checkbox label="线下主题活动" name="type" />
                                <el-checkbox label="单纯品牌曝光" name="type" />
                            </el-checkbox-group>
                        </el-form-item>
                        <!-- 3.7 经营资源 -->
                        <el-form-item label="经营资源" prop="resources">
                            <el-radio-group v-model="ruleForm.resources">
                                <el-radio label="线上品牌商赞助" />
                                <el-radio label="线下场地免费" />
                            </el-radio-group>
                        </el-form-item>
                        <!-- 3.8 评分 -->
                        <el-form-item label="评分" prop="grade">
                            <el-rate v-model="ruleForm.grade" />
                        </el-form-item>
                        <!-- 3.9 被指 -->
                        <el-form-item label="备注" prop="desc">
                            <el-input v-model="ruleForm.desc" type="textarea" />
                        </el-form-item>
                        <!-- 3.10 功能按钮 -->
                        <el-form-item class="button-wrapper">
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.comprehensive-form-container {
    .set-wrapper {
        margin: 10px 40px;
    }

    .form-wrapper {
        margin-bottom: 100px;

        .button-wrapper {
            margin-left: 100px;
        }
    }

    .form-left {
        margin-left: 50px;
    }
    .form-center {
        display: flex;
        justify-content: center;
    }
}
</style>