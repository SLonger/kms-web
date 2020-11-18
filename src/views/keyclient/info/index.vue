<template>
  <div>
    <el-collapse @change="handleChange"
                 accordion>
      <div>
        <el-collapse-item v-for="(value, index) in provs"
                          :key="index"
                          :name="index">
          <template slot="title">
            <span style="color: blue">{{ value }}</span>
          </template>
          <el-table :data="tableData"
                    border
                    :show-header='false'>
            <el-table-column prop="appname"
                             width="120">
            </el-table-column>
            <el-table-column prop="type"
                             width="120">
            </el-table-column>
            <el-table-column prop="ip"
                             width="120">
            </el-table-column>
            <el-table-column prop="isonline"
                             width="200">
            </el-table-column>
            <el-table-column prop="currVersion"
                             min-width="200">
            </el-table-column>
            <el-table-column width="200">
              <template slot-scope="scope">
                <el-button @click="getHistory()"
                           type="primary"
                           size="small">历史密钥</el-button>
                <el-button type="primary"
                           @click="getInfo()"
                           size="small">查看信息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </div>
    </el-collapse>
    <el-dialog title="历史密钥"
               :visible.sync="isHistoryVisible">
      <el-table :data="history">
        <el-table-column property="historykey"
                         label="密钥"
                         width="250"></el-table-column>
        <el-table-column property="time"
                         label="日期"
                         width="200"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="查看信息"
               :visible.sync="isInfoVisible"
               width="800px">
      <el-table :data="[info]">
        <el-table-column property="dueTime"
                         label="日期"
                         width="150"></el-table-column>
        <el-table-column property="email"
                         label="姓名"
                         width="200"></el-table-column>
        <el-table-column property="initiator"
                         label="地址"></el-table-column>
        <el-table-column property="ipAddrList"
                         label="日期"
                         width="150"></el-table-column>
        <el-table-column property="isVaild"
                         label="姓名"
                         width="200"></el-table-column>
        <el-table-column property="issureTime"
                         label="地址"></el-table-column>
        <el-table-column property="macAddrList"
                         label="日期"
                         width="150"></el-table-column>
        <el-table-column property="provinceName"
                         label="姓名"
                         width="200"></el-table-column>
        <el-table-column property="recordID"
                         label="地址"></el-table-column>

        <el-table-column property="sessionprovs"
                         label="日期"
                         width="150"></el-table-column>
        <el-table-column property="telephone"
                         label="姓名"
                         width="200"></el-table-column>
        <el-table-column property="type"
                         label="地址"></el-table-column>
        <el-table-column property="updateTime"
                         label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Message, Tree as ElTree } from 'element-ui';
import { TreeData } from 'element-ui/types/tree';
import { ElForm } from 'element-ui/types/form';
import { keyclinetModule } from '@/store/modules/keyclient';

@Component({
  name: 'keyclient'
})
export default class extends Vue {
  private provs = [];
  // private activeName = '1';
  private tableData: [] = [];
  private isHistoryVisible: Boolean = false;
  private isInfoVisible: Boolean = false;
  private history: [] = [];
  private info: {} = {};
  mounted() {
    this.getProvs();
  }
  private handleChange(val: String) {
    console.log(val); //val每行唯一标识
    this.getAppInfo();
  }
  private async getProvs() {
    let data = await keyclinetModule.getProvs();
    if (data.status == 1) {
      this.provs = data.data;
    }
  }
  private async getAppInfo() {
    let data = await keyclinetModule.getAppInfo();
    if (data.status == 1) {
      this.tableData = data.data;
    }
  }
  private async getHistory() {
    this.isHistoryVisible = true;
    let data = await keyclinetModule.getHistory();
    if (data.status == 1) {
      this.history = data.data;
    }
  }
  private async getInfo() {
    this.isInfoVisible = true;
    let data = await keyclinetModule.getInfo();
    console.log(data);
    if (data.status == 1) {
      this.info = data.data;
    }
  }
}
</script>
