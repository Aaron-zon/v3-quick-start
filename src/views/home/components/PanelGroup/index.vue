<script setup>
import { ref } from 'vue'

const emit = defineEmits(['active']);
// 激活的卡片
const activeCode = ref(0);
// 选择卡片进行激活
const active = (key) => {
    emit('active', key);
    activeCode.value = key;
}

</script>

<template>
    <el-row class="panel-group-cantainer">
        <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="card-panel-col">
            <el-card shadow="hover" class="top-card" :class="{'active-card': activeCode == 0}" @click="active(0)">
                <el-row>
                    <el-col class="card-panel-content-wrapper" :span="16">
                        <div class="title">
                            月总销量（9）
                        </div>
                        <div class="content">
                            <p>￥11,214.00</p>
                        </div>
                        <div class="description">
                            自上月增长 10%
                        </div>
                    </el-col>
                    <el-col class="card-panel-icon-wrapper" :span="8">
                        <SvgIcon name="money-cny-circle-line" />
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="card-panel-col">
            <el-card shadow="hover" class="top-card" :class="{'active-card': activeCode == 1}" @click="active(1)">
                <el-row>
                    <el-col class="card-panel-content-wrapper" :span="16">
                        <div class="title">
                            月总销量（9）
                        </div>
                        <div class="content">
                            <p>￥11,214.00</p>
                        </div>
                        <div class="description">
                            自上月增长 10%
                        </div>
                    </el-col>
                    <el-col class="card-panel-icon-wrapper" :span="8">
                        <SvgIcon name="money-cny-circle-line" />
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="card-panel-col">
            <el-card shadow="hover" class="top-card" :class="{'active-card': activeCode == 2}" @click="active(2)">
                <el-row>
                    <el-col class="card-panel-content-wrapper" :span="16">
                        <div class="title">
                            月总销量（9）
                        </div>
                        <div class="content">
                            <p>￥11,214.00</p>
                        </div>
                        <div class="description">
                            自上月增长 10%
                        </div>
                    </el-col>
                    <el-col class="card-panel-icon-wrapper" :span="8">
                        <SvgIcon name="money-cny-circle-line" />
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="card-panel-col">
            <el-card shadow="hover" class="top-card" :class="{'active-card': activeCode == 3}" @click="active(3)">
                <el-row>
                    <el-col class="card-panel-content-wrapper" :span="16">
                        <div class="title">
                            月总销量（9）
                        </div>
                        <div class="content">
                            <p>￥11,214.00</p>
                        </div>
                        <div class="description">
                            自上月增长 10%
                        </div>
                    </el-col>
                    <el-col class="card-panel-icon-wrapper" :span="8">
                        <SvgIcon name="money-cny-circle-line" />
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
    margin-bottom: 10px;

    .top-card {
        height: 168px;
        cursor: pointer;

        &.active-card {
            background: linear-gradient(90deg,rgba(43,57,84,0.6), #2B3954);
            color: #fff;
        }
        
        :deep(.el-card__body) {
            height: calc(100% - 40px);
        }

        .el-row {
            height: 100%;

            .card-panel-content-wrapper {
                height: 100%;
                display: flex;
                flex-direction: column;
                overflow: hidden;

                .title {
                    flex: 1;
                }

                .content {
                    flex: 3;
                    display: flex;
                    
                    & > p {
                        width: 100%;
                        margin: auto 10px;
                        font-size: 24px;
                    }
                }

                .description {
                    flex: 1;
                    font-size: 12px;
                }
            }

            .card-panel-icon-wrapper {
                height: 100%;

                .svg-icon-container {
                    padding: 10px;
                    width: calc(100% - 10px);
                    height: calc(100% - 10px);
                }
            }
        }
    }

}
</style>
