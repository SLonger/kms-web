<template>
  <div>
    <el-container>
      <el-header class="header">
        <el-button type="primary" @click="isClientAddDialog = true"
          >新增</el-button
        >
      </el-header>
      <el-main>
        <el-collapse v-model="activeNames" @change="handleChange" accordion>
          <div>
            <el-collapse-item
              v-for="(value, provindex) in provs"
              :key="provindex"
              :name="provindex"
            >
              <template slot="title">
                <span style="color: blue">{{ value }}</span>
              </template>
              <el-table :data="tableData" border :show-header="false">
                <el-table-column prop="appname" width="120"> </el-table-column>
                <el-table-column prop="type" width="120">
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.type == 0 ? '加密方' : '解密方' }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="ip" width="120"> </el-table-column>
                <el-table-column prop="isonline" width="200">
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.isonline == 0 ? '在线' : '离线' }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="currVersion" min-width="200">
                </el-table-column>
                <el-table-column width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="getHistory(scope.$index)"
                      type="primary"
                      size="small"
                      >历史密钥</el-button
                    >
                    <el-button
                      type="primary"
                      @click="getInfo(scope.$index)"
                      size="small"
                      >查看信息</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </div>
        </el-collapse>
      </el-main>
    </el-container>
    <el-dialog title="历史密钥" :visible.sync="isHistoryVisible">
      <el-table :data="history">
        <el-table-column
          property="historykey"
          label="密钥"
          width="250"
        ></el-table-column>
        <el-table-column
          property="time"
          label="日期"
          width="200"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="查看信息" :visible.sync="isInfoVisible">
      <el-form :model="info">
        <el-form-item label="邮件" label-width="80px">
          <el-input v-model="info.email" @focus="changebuttonstate"></el-input>
        </el-form-item>

        <el-form-item label="截至日期" label-width="80px">
          <el-input
            v-model="info.dueTime"
            @focus="changebuttonstate"
          ></el-input>
        </el-form-item>

        <el-form-item label="发起者" label-width="80px">
          <el-input
            v-model="info.initiator"
            :disabled="changebuttonstate"
          ></el-input>
        </el-form-item>

        <el-form-item label="IP白名单" label-width="80px">
          <el-input
            v-model="info.ipAddrList"
            @focus="changebuttonstate"
          ></el-input>
        </el-form-item>

        <el-form-item label="是否有效" label-width="80px">
          <el-input v-model="isVaild" :disabled="isEditUser"></el-input>
        </el-form-item>

        <el-form-item label="发起时间" label-width="80px">
          <el-input v-model="info.issureTime" :disabled="isEditUser"></el-input>
        </el-form-item>

        <el-form-item label="maclist" label-width="80px">
          <el-input
            v-model="info.macAddrList"
            @focus="changebuttonstate"
          ></el-input>
        </el-form-item>

        <el-form-item label="省份" label-width="80px">
          <el-input
            v-model="info.provinceName"
            :disabled="isEditUser"
          ></el-input>
        </el-form-item>

        <el-form-item label="话单省份" label-width="80px">
          <el-input
            v-model="info.sessionprovs"
            @focus="changebuttonstate"
          ></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="80px">
          <el-input
            v-model="info.telephone"
            @focus="changebuttonstate"
          ></el-input>
        </el-form-item>

        <el-form-item label="应用方类型" label-width="110px">
          <el-input v-model="type" :disabled="isEditUser"> </el-input>
        </el-form-item>

        <el-form-item label="最后一次更新" label-width="120px">
          <el-input v-model="info.updateTime" :disabled="isEditUser"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isInfoVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="isButtonuse" @click="updateinfo"
          >修改</el-button
        >
      </div>
    </el-dialog>

    <!-- 新增 -->
    <el-dialog title="新增用户" :visible.sync="isClientAddDialog">
      <el-form :model="postUserData" ref="postUserForm">
        <el-form-item label="应用方名称:" label-width="80px">
          <el-input
            v-model="postUserData.nameCn"
            autocomplete="off"
            placeholder="北京应用方名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="发起者" label-width="80px">
          <el-input
            v-model="postUserData.initiator"
            autocomplete="off"
            placeholder="龙天"
          ></el-input>
        </el-form-item>

        <el-form-item label="省份" label-width="80px">
          <el-input
            v-model="postUserData.srcProv"
            autocomplete="off"
            placeholder="北京"
          ></el-input>
        </el-form-item>

        <el-form-item label="应用方类型" label-width="80px">
          <el-radio-group v-model="postUserData.applyType">
            <el-radio label="加密">加密方</el-radio>
            <el-radio label="解密">解密方</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="英文名" label-width="80px">
          <el-input
            v-model="postUserData.nameEn"
            autocomplete="off"
            placeholder="beijing-applyEname"
          ></el-input>
        </el-form-item>

        <el-form-item label="话单省份" label-width="80px">
          <el-input
            v-model="postUserData.scope"
            autocomplete="off"
            placeholder="多个用 | 分离：  北京|天津|河北 "
          ></el-input>
        </el-form-item>

        <el-form-item label="email" label-width="80px">
          <el-input
            v-model="postUserData.email"
            autocomplete="off"
            placeholder="xxx@gmail.com"
          ></el-input>
        </el-form-item>

        <el-form-item label="有效截至时间" label-width="80px">
          <!-- 这里得插入一个时间 -->

          <div>
            <el-date-picker
              v-model="postUserData.dueTime"
              value-format="timestamp"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>

          <!-- <el-input
            v-model="postUserData.dueTime"
            autocomplete="off"
          ></el-input> -->
        </el-form-item>

        <el-form-item label="电话" label-width="80px">
          <el-input
            v-model="postUserData.telephone"
            autocomplete="off"
            placeholder="139********"
          ></el-input>
        </el-form-item>

        <el-form-item label="IP白名单" label-width="80px">
          <el-input
            v-model="postUserData.ipAddrs"
            autocomplete="off"
            placeholder="多个IP 使用 | 分割 192.168.0.1|192.168.0.2"
          ></el-input>
        </el-form-item>

        <el-form-item label="Mac地址列" label-width="80px">
          <el-input
            v-model="postUserData.macAddrs"
            autocomplete="off"
            placeholder="对应多个mac使用 | 分割 ff:ff:ff:ff:ff:ff | ff:ff:ff:ff:ff:ff"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isClientAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="postUser">确 定</el-button>
      </div>
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
  private tableData: any = [];
  private isHistoryVisible: Boolean = false;
  private isInfoVisible: Boolean = false;
  private history: [] = [];
  private info: any = {};
  private activeNames: any = '';

  private postUserData = {
    nameCn: '',
    initiator: '',
    srcProv: '',
    applyType: '',
    nameEn: '',
    scope: '',
    email: '',
    dueTime: 0,
    telephone: '',
    ipAddrs: '',
    macAddrs: ''
  };

  // 用来转换数据
  private type = {};
  private isVaild = {};

  // 用来展示数据是否可修改
  private isEditUser = true;

  // 显示新增对话框
  private isClientAddDialog = false;

  // button是否能点击
  private isButtonuse = true;
  private changebuttonstate() {
    this.isButtonuse = false;
  }

  mounted() {
    this.getProvs();
  }

  /*  点击折叠面板 展开时： this.activeNames = 1 typeof is number
   *   再次点击同一面板关闭： this.activeNames = '' typeof is ''
   */
  private handleChange() {
    if (this.activeNames === '') {
      return;
    }
    this.getAppInfo({ provname: this.provs[this.activeNames] });
  }

  private async getProvs() {
    let data = await keyclinetModule.getProvs();
    if (data.status == 1) {
      this.provs = data.data;
      console.log('this.provs:', this.provs);
    }
  }

  private async getAppInfo(datascope: any) {
    let data = await keyclinetModule.getAppInfo(datascope);
    if (data.status == 1) {
      this.tableData = data.data;
    }
  }

  private async getHistory(index: number) {
    this.isHistoryVisible = true;

    let data = await keyclinetModule.getHistory({
      clientId: this.tableData[index].clientId
    });
    console.log('data: ', data);
    if (data.status == 1) {
      this.history = data.data;
    }
  }

  private async getInfo(index: number) {
    this.isInfoVisible = true;
    this.isButtonuse = true;
    let data = await keyclinetModule.getInfo({
      clientId: this.tableData[index].clientId
    });
    if (data.status == 1) {
      this.info = data.data;
      this.type = data.data.type == 1 ? '加密方' : '解密方';
      this.isVaild = data.data.isVaild == 1 ? '有效' : '无效';
    }
  }

  // 修改信息 todo
  private async updateinfo() {
    let data = await keyclinetModule.UpdateclientInfo(this.info);
    if (data.status == 1) {
      Message({
        message: '修改成功',
        type: 'success',
        duration: 5 * 1000
      });

      this.isInfoVisible = false;
    }
    console.log(data);
  }

  private async postUser() {
    let data = await keyclinetModule.AddclientInfo(this.postUserData);
    Message({
      message: '添加成功',
      type: 'success',
      duration: 5 * 1000
    });

    this.isClientAddDialog = false;
    console.log(data);
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
</style>
