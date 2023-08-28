<script setup>
    
</script>

<template>
    <el-row class="panel-group-cantainer">
        <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="card-panel-col">
            <el-card shadow="hover" class="top-card">
                <el-row>
                    <div class="card-panel-icon-wrapper">
                        <SvgIcon name="menu" />
                    </div>
                    <div class="card-panel-description">
                        1
                    </div>
                </el-row>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="card-panel-col">
            <el-card shadow="hover" class="top-card">
                <el-row>
                    <div class="card-panel-icon-wrapper">
                        <SvgIcon name="menu" />
                    </div>
                    <div class="card-panel-description">
                        1
                    </div>
                </el-row>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="card-panel-col">
            <el-card shadow="hover" class="top-card">
                <el-row>
                    <div class="card-panel-icon-wrapper">
                        <SvgIcon name="menu" />
                    </div>
                    <div class="card-panel-description">
                        1
                    </div>
                </el-row>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="card-panel-col">
            <el-card shadow="hover" class="top-card">
                <el-row>
                    <el-col class="card-panel-content-wrapper" :span="16">
                        <div class="title">
                            总销量
                        </div>
                        <div class="content">
                            <span>5,219.00</span>
                        </div>
                        <div class="description">
                            自上月依赖 10%
                        </div>
                    </el-col>
                    <el-col class="card-panel-icon-wrapper" :span="8">

                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.card-panel-col {
    padding-right: 10px;
    padding-left: 10px;

    .top-card {
        height: 168px;

        :deep(.el-card__body) {
            height: calc(100% - 40px);
        }

        .el-row {
            height: 100%;

            .card-panel-content-wrapper {
                border: 1px solid #e2e2e2;
            }

            .card-panel-icon-wrapper {
                border: 1px solid #e2e2e2;
            }
        }
    }
}
</style>
