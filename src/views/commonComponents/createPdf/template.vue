<script setup>
const props = defineProps(['data'])
</script>

<template>
    <div class="pdf-wrapper" id="el-to-pdf">
      <div class="header">
        <h2 class="title">项目任务单</h2>  
        <div class="company">——中外建华诚（大连）有限公司</div>
      </div>
      <div>
        <div class="no">No: HCXM-jL-001</div>
        <div class="content">
          <!-- 基本信息 -->
          <el-row class="base-info">
            <el-col :span="12">
              <el-row>
                <el-col class="td" :span="6">起草时间</el-col>
                <el-col class="td" :span="18">{{ data.baseInfo.col1 }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col class="td" :span="6">任务单编号</el-col>
                <el-col class="td" :span="18">{{ data.baseInfo.col2 }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row class="base-info">
            <el-col :span="12">
              <el-row>
                <el-col class="td" :span="6">项目编号</el-col>
                <el-col class="td" :span="18">1</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col class="td" :span="6">我方负责人</el-col>
                <el-col class="td" :span="18">2</el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row  class="base-info">
            <el-col :span="12">
              <el-row>
                <el-col class="td" :span="6">委托单位</el-col>
                <el-col class="td" :span="18">1</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col class="td" :span="6">委托方联系人</el-col>
                <el-col class="td" :span="18">2</el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row class="base-info">
            <el-col :span="12">
              <el-row>
                <el-col class="td" :span="6">工程名称</el-col>
                <el-col class="td" :span="18">1</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col class="td" :span="6">委托方联系电话</el-col>
                <el-col class="td" :span="18">2</el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row class="scheme-stage stage">
            <el-col class="stage-title" :span="3">
              方案阶段
            </el-col>
            <el-col :span="4">
              核心任务内容及描述：
            </el-col>
            <el-col :span="17">
              <el-checkbox label="总图" size="large" />
              <el-checkbox label="效果图（鸟瞰/单体）" size="large" />
              <el-checkbox label="平立剖" size="large" />
              <el-checkbox label="彩平" size="large" />
              <el-checkbox label="文本" size="large" />
              <el-checkbox label="概算" size="large" />
            </el-col>
          </el-row>

          <el-row class="stage">
            <el-checkbox label="________" size="large" />
            <el-checkbox label="________" size="large" />
          </el-row>

          <el-row class="stage department">
            <el-col class="title" :span="5">
              任务主要承担部门：
            </el-col>
            <el-col :span="19">
              <div class="button">建筑所</div>
              <div class="button">结构所</div>
              <div class="button">设备所</div>
              <div class="button">深化所</div>
              <div class="button">造价所</div>
              <div class="button">项目所</div>
            </el-col>
          </el-row>

          <el-row class="table">
            <el-col :span="8">
              <el-row>
                <el-col class="tb-col title" :span="12">
                  <el-row class="td">
                    <el-col>市 场 部</el-col>
                    <el-col>（签字/日期）</el-col>
                  </el-row>
                </el-col>
                <el-col class="tb-col" :span="12">
                  <el-row>
                    <el-col class="td">1</el-col>
                    <el-col class="td">2</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="12">
                  <el-row class="tb-col title">
                    <el-col>主管领导</el-col>
                    <el-col>（签字/日期）</el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row  class="tb-col">
                    <el-col class="td">1</el-col>
                    <el-col class="td">2</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="12">
                  <el-row class="tb-col title">
                    <el-col>总经理</el-col>
                    <el-col>（签字/日期）</el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row class="tb-col no-last-border">
                    <el-col class="td">1</el-col>
                    <el-col class="td">2</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row class="table no-last-border">
            <el-col class="tb-col title single-title" :span="4">
              接受人（签字/日期）
            </el-col>
            <el-col class="tb-col single-td" :span="4">
              1
            </el-col>
            <el-col class="tb-col single-td" :span="4">
              2
            </el-col>
            <el-col class="tb-col single-td" :span="4">
              3
            </el-col>
            <el-col class="tb-col single-td" :span="4">
              4
            </el-col>
            <el-col class="tb-col single-td" :span="4">
              5
            </el-col>
          </el-row>

          <el-row class="table no-last-border">
            <el-col class="tb-col title break" :span="4">
              <el-col>下单时间</el-col>
              <el-col>子 单 号</el-col>
            </el-col>
            <el-col class="tb-col break" :span="4">
              <el-col>1</el-col>
              <el-col>2</el-col>
            </el-col>
            <el-col class="tb-col center" :span="4">
              <el-col>一次变更</el-col>
              <el-col>（签字/时间）</el-col>
            </el-col>
            <el-col class="tb-col center" :span="4">
              <el-col>二次变更</el-col>
              <el-col>（签字/时间）</el-col>
            </el-col>
            <el-col class="tb-col center" :span="4">
              <el-col>三次变更</el-col>
              <el-col>（签字/时间）</el-col>
            </el-col>
            <el-col class="tb-col center" :span="4">
              <el-col>四次变更</el-col>
              <el-col>（签字/时间）</el-col>
            </el-col>

          </el-row>

          <el-row class="table no-last-border">
            <el-col class="tb-col title single-title" :span="4">完成时间</el-col>
            <el-col class="tb-col single-td" :span="4">1</el-col>
            <el-col class="tb-col single-td" :span="4">2</el-col>
            <el-col class="tb-col single-td" :span="4">3</el-col>
            <el-col class="tb-col single-td" :span="4">4</el-col>
            <el-col class="tb-col single-td" :span="4">5</el-col>
          </el-row>
        </div>
      </div>
      
    </div>
</template>

<style lang="scss" scoped>
.pdf-wrapper {
    z-index: 1000;
    border: 1px solid #ccc;
    margin: 20px auto;
    background-color: #fff;
    padding: 10px;
    font-size: 12px;
    width: 750px;
    min-height: 900px;
    .header {
      text-align: center;
      .company {
        font-size: 12px;
      }
    }

    .no {
      font-size: 12px;
    }

    .content {
      border: 1px solid #000;

      .base-info {
        .td {
          text-align: center;
          border: 1px solid #000;
          height: 24px;
          line-height: 24px;
        }
      }

      .stage {
        border: 1px solid #000;
        padding-left: 15px;

        .stage-title {
          font-weight: 800;
          font-size: 15px;
        }
        .el-col {
          line-height: 40px;
        }

        &.department {
          .title {
            line-height: 52px;
          }
          .button {
            border: 1px solid #000;
            color: #000;
            width: 50px;
            display: inline-block;
            margin-left: 15px;
            border-radius: 10px;
            margin: 10px;
            height: 30px;
            line-height: 30px;
            text-align: center;
          }
        }
      }

      .table {
        border: 1px solid #000;

        .tb-col {
          border-right: 1px solid #000;
          height: 30px;
          text-align: center;
          padding-top: 2px;

          &.no-last-border {
            border-right: 0px;
          }
        }

        &.no-last-border {
          .tb-col:last-child {
            border-right: 0px;
          }
        }

        .title {
          text-align: center;
          padding-top: 2px;
        }

        .single-title {
          line-height: 30px;
        }

        .single-td {
          line-height: 30px;
        }

        .center {
          text-align: center;
        }

        .break {
          .el-col:nth-child(1) {
            border-bottom: 1px solid #000;
          }
        }
      }

      
    }
}
</style>