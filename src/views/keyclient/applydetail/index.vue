<template>
  <div>
    <el-container>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="appname" label="名字" width="180">
          </el-table-column>

          <el-table-column prop="dueTime" label="截至时间" width="180">
          </el-table-column>

          <el-table-column prop="initiator" label="发起者"> </el-table-column>
          <el-table-column prop="email" label="邮件"> </el-table-column>
          <el-table-column prop="ipAddrList" label="ip地址列">
          </el-table-column>
          <el-table-column prop="isVaild" label="是否正在使用">
            <template slot-scope="scope">
              <div>
                {{ scope.row.isVaild == 0 ? '是' : '否' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="issureTime" label="发起时间">
          </el-table-column>
          <el-table-column prop="provinceName" label="省份"> </el-table-column>
          <el-table-column prop="sessionprovs" label="话单省份">
          </el-table-column>
          <el-table-column prop="telephone" label="电话"> </el-table-column>
          <el-table-column prop="type" label="应用方类型">
            <template slot-scope="scope">
              <div>
                {{ scope.row.type == 0 ? '加密方' : '解密方' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="最后一次更新">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Message, Tree as ElTree } from 'element-ui';
import { ElForm } from 'element-ui/types/form';
import { keyclinetModule } from '@/store/modules/keyclient';

@Component({
  name: 'keyclientapplyinfo'
})
export default class extends Vue {
  private tableData: [] = [];

  created() {
    this.provkeyquery().then((value) => {
      this.tableData = value;
    });
  }

  // 查询工单记录
  private async provkeyquery() {
    const { data } = await keyclinetModule.getrecords();
    return data;
  }
}
</script>
