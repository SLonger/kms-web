<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="account" label="姓名" width="180"> </el-table-column>

    <el-table-column prop="gender" label="性别" width="180"> </el-table-column>

    <el-table-column prop="telephone" label="手机号"> </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Tree as ElTree } from 'element-ui';
import { TreeData } from 'element-ui/types/tree';
import { UserModule } from '@/store/modules/user';

@Component({
  name: 'usermanage'
})
export default class extends Vue {
  private tableData: [] = [];

  private userinfo = {
    allAccount: true
  };

  created() {
    this.handleUserquery().then((value) => {
      this.tableData = value;
    });
  }

  private async handleUserquery() {
    const { data } = await UserModule.Userquery(this.userinfo);
    return data;
  }
}
</script>
