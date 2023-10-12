<script setup>
import { ref, reactive } from 'vue';

// 当前步骤
const active = ref(0);
// 表单实例
const ruleFormRef = ref(null);
// 提交按钮loading
const submitLoading = ref(false);
// 表单数据
const ruleForm = ref({
    name: '',
    phone: '',
    address: '',
    insurance: '',
    desc: '',
});
// 表单规则
const rules = reactive({
    name: [
        { required: true, message: '请输入收货人姓名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    ],
    phone: [{ required: true, message: '请输入收货人手机号', trigger: 'blur' }],
});

/** 下一步按钮按下 */
const nextForm = () => {
    ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
            active.value = 1;
        }
    });
};

/** 上一步按钮按下 */
const prevForm = () => {
    active.value = 0;
};

/** 提交按钮按下 */
const submitForm = () => {
    submitLoading.value = true;
    // 此处应该是调用ajax的处理
    setTimeout(() => {
        submitLoading.value = false;
        active.value = 2;
    }, 1000);
};

/** 完成按钮按下 */
const success = () => {
    ruleFormRef.value.resetFields();
    active.value = 0;
};
</script>

<template>
    <div class="step-form-container app-container">
        <el-card>
            <!-- 步骤显示区域 -->
            <el-row class="step-wrapper">
                <el-col :lg="10" :xl="10" :md="20" :sm="20" :xs="24">
                    <el-steps :active="active">
                        <el-step title="第一步" description="填写单号信息" />
                        <el-step title="第二步" description="确认单号信息" />
                        <el-step title="第三步" description="完成" />
                    </el-steps>
                </el-col>
            </el-row>
            <!-- 成功状态 -->
            <el-row class="result-wrapper" v-if="active == 2">
                <el-col :lg="10" :xl="10" :md="20" :sm="20" :xs="24">
                    <el-result icon="success"> </el-result>
                </el-col>
            </el-row>
            <!-- 表单区域 -->
            <el-row class="form-wrapper" :class="{ 'form-wrapper-space': active != 2 }">
                <el-col :lg="10" :xl="10" :md="20" :sm="20" :xs="24">
                    <el-form
                        ref="ruleFormRef"
                        :class="{ success: active == 2 }"
                        label-width="100px"
                        :model="ruleForm"
                        :rules="rules"
                        status-icon>
                        <el-form-item label="收货人" prop="name">
                            <el-input v-if="active == 0" v-model="ruleForm.name" />
                            <div class="red-only" v-else>{{ ruleForm.name }}</div>
                        </el-form-item>
                        <el-form-item label="收货人电话" prop="phone">
                            <el-input v-if="active == 0" v-model="ruleForm.phone" />
                            <div class="red-only" v-else>{{ ruleForm.phone }}</div>
                        </el-form-item>
                        <el-form-item label="收货地址" prop="address">
                            <el-input v-if="active == 0" v-model="ruleForm.address" />
                            <div class="red-only" v-else>{{ ruleForm.address }}</div>
                        </el-form-item>
                        <el-form-item label="保金" prop="insurance">
                            <el-input v-if="active == 0" v-model="ruleForm.insurance" />
                            <div class="red-only" v-else>{{ ruleForm.insurance }}</div>
                        </el-form-item>
                    </el-form>
                    <div class="button-wrapper">
                        <el-button v-show="active == 0" type="primary" @click="nextForm()"
                            >下一步</el-button
                        >
                        <el-button
                            v-show="active == 1"
                            type="primary"
                            @click="submitForm()"
                            :loading="submitLoading"
                            >提交</el-button
                        >
                        <el-button v-show="active == 1" type="primary" @click="prevForm()"
                            >上一步</el-button
                        >
                        <el-button v-show="active == 2" type="primary" @click="success()"
                            >完成</el-button
                        >
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.step-form-container {
    height: calc(var(--v3-appmain-height) - 40px);

    .el-card {
        height: 100%;

        .step-wrapper {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            .el-col {
                padding: 0 100px;
            }
        }

        .result-wrapper {
            display: flex;
            justify-content: center;
        }

        .form-wrapper-space {
            margin-top: 50px;
        }

        .form-wrapper {
            display: flex;
            justify-content: center;

            .red-only {
                font-size: 12px;
                font-weight: 900;
            }

            .success {
                background: #ccc;
            }

            .button-wrapper {
                text-align: center;
            }
        }
    }
}
</style>
