<script setup>
</script>

<template>
    <div class="personal-container app-margin-scroll-container">
        <el-row class="personal-layout">
            <el-tabs :tab-position="'left'" class="demo-tabs">
                <el-tab-pane label="公开资料">
                    
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>公开资料</span>
                            </div>
                        </template>

                        <template #default>
                            <el-row>
                                <!-- 资料 -->
                                <el-col :lg="12" :xl="12" :md="20" :sm="20" :xs="24">
                                    <el-form ref="ruleFormRef" label-width="100px" label-position="top" status-icon>
                                        <!-- 姓名 -->
                                        <el-form-item label="姓名" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                        <!-- 个人邮箱 -->
                                        <el-form-item label="个人邮箱" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                        <!-- 手机号 -->
                                        <el-form-item label="手机号" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                        <!-- 简介 -->
                                        <el-form-item label="简介" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                        <!-- 社交账号 -->
                                        <el-form-item label="社交账号" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                        <!-- 合同公司 -->
                                        <el-form-item label="合同公司" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                        <!-- 工作地点 -->
                                        <el-form-item label="工作地点" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                        <!-- 部门 -->
                                        <el-form-item label="部门" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                        <!-- 职位 -->
                                        <el-form-item label="职位" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                        <!-- 职能 -->
                                        <el-form-item label="职能" prop="name">
                                            <el-input  />
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                                <!-- 头像 -->
                                <el-col :lg="12" :xl="12" :md="4" :sm="4" :xs="24">
                                
                                </el-col>
                            </el-row>
                            
                            
                        </template>
                    </el-card>

                </el-tab-pane>
                <el-tab-pane label="个人信息">
                    个人信息
                </el-tab-pane>
                <el-tab-pane label="登录设定">
                    登录设定
                </el-tab-pane>
            </el-tabs>
            
            
            <!-- <el-col :span="6">
                <el-menu>
                    <el-menu-item index="1">
                        <span>公开资料</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <span>个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <span>登录设定</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="17">
                
            </el-col> -->
        </el-row>
        <!-- 公开资料 -->
            <!-- 头像 -->
            <!-- 姓名 -->
            <!-- 个人邮箱 -->
            <!-- 手机号 -->
            <!-- 简介 -->
            <!-- 社交账号 -->
            <!-- 合同公司 -->
            <!-- 工作地点 -->
            <!-- 部门 -->
            <!-- 职位 -->
            <!-- 职能 -->
        <!-- 个人信息 -->
            <!-- 登陆用账户 -->
            <!-- 调休/年假 -->
            <!-- 接收通知邮箱 -->
            <!-- 项目成员 -->
            <!-- 你的权限 -->
            <!-- 主题配置 -->
        <!-- 登录设定 -->
            <!-- 修改密码 -->
            <!-- 其他身份验证 -->
        
    </div>
</template>

<style lang="scss" scoped>
.personal-container {
    .personal-layout {
        margin: 0 auto;
        max-width: 1248px;
        height: 100%;
        justify-content: space-between;

        .el-tabs {
            width: 100%;
            padding: 20px;
        }
    }
    
}
</style>