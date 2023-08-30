<script setup>

</script>

<template>
    <el-row class="operate-serve-cantainer">
        <el-card class="operate-serve-card">
            <template #header>
                <div class="card-header">
                    <span>经营服务</span>
                </div>
            </template>
            <el-row>
                <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                    <a href="https://www.boc.cn/" target="_black">
                        <el-card class="serve-item">
                            <el-row>
                                <div class="serve-icon">
                                    <SvgIcon name="bank"></SvgIcon>
                                </div>
                                <div class="serve-title">
                                    <p class="title">中国银行</p>
                                    <p class="desciption">中国银行快速入口</p>
                                </div>
                            </el-row>
                        </el-card>
                    </a>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                    <a href="https://wenshu.court.gov.cn/" target="_black">
                        <el-card class="serve-item">
                            <el-row>
                                <div class="serve-icon">
                                    <SvgIcon name="bank"></SvgIcon>
                                </div>
                                <div class="serve-title">
                                    <p class="title">中国裁判文书网</p>
                                    <p class="desciption">裁判文书网快速入口</p>
                                </div>
                            </el-row>
                        </el-card>
                    </a>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                    <a href="http://www.bankcomm.com/BankCommSite/default.shtml" target="_black">
                        <el-card class="serve-item">
                            <el-row>
                                <div class="serve-icon">
                                    <SvgIcon name="bank"></SvgIcon>
                                </div>
                                <div class="serve-title">
                                    <p class="title">交通银行</p>
                                    <p class="desciption">交通银行快速入口</p>
                                </div>
                            </el-row>
                        </el-card>
                    </a>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                    <a href="http://www.baidu.com" target="_black">
                        <el-card class="serve-item">
                            <el-row>
                                <div class="serve-icon">
                                    <SvgIcon name="bank"></SvgIcon>
                                </div>
                                <div class="serve-title">
                                    <p class="title">著作权保护中心</p>
                                    <p class="desciption">著作权保护中心快速入口</p>
                                </div>
                            </el-row>
                        </el-card>
                    </a>
                </el-col>
            </el-row>
        </el-card>
    </el-row>
</template>

<style lang="scss" scoped>
.operate-serve-cantainer {
    .operate-serve-card {
        width: 100%;

        .serve-item {
            height: 55px;
            border: none;
            box-shadow: none;
            cursor: pointer;

            :deep(.el-card__body) {
                padding: 5px;
                width: 100%;
                height: 100%;
            }

            .el-row {
                width: 100%;
                height: 100%;
            }
            .serve-icon {
                width: 50px;
                height: 50px;
                margin-left: 10px;
                background: rgba(43,57,84,0.1);
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;

                .svg-icon-container {
                    width: 30px;
                    height: 30px;
                }
            }
            .serve-title {
                margin-left: 10px;
                height: 100%;

                p {
                    margin: 0;
                }

                .title {
                    line-height: 30px;
                    font-size: 16px;
                    font-weight: 800;
                }
                .desciption {
                    line-height: 20px;
                    font-size: 12px;
                    color: #aaa;
                }
            }
        }
    }
}
</style>