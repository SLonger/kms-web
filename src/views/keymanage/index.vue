<template>
  <div>
    <el-container>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="省份" width="180">
          </el-table-column>

          <el-table-column prop="keyversion" label="密钥版本号" width="180">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" @click="Historyprovkey(scope.row)"
                  >历史密钥</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>

      <el-dialog title="历史密钥" :visible.sync="keymanageVisible">
        <el-table :data="history">
         <el-table-column property="keyversion"
                         label="密钥版本号"
                         width="250"></el-table-column>
        <el-table-column property="time"
                         label="创建日期"
                         width="200"></el-table-column>
        </el-table>
        
        </el-table-column>
      </el-dialog>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Message, Tree as ElTree } from 'element-ui';
import { TreeData } from 'element-ui/types/tree';
import { ElForm } from 'element-ui/types/form';
import { KeyManageModule } from '@/store/modules/keymanages';

@Component({
  name: 'keymanageinfo'
})
export default class extends Vue {
  private tableData: [] = [];
  private history: [] = [];
  private keymanageVisible: boolean = false;

  created() {
    this.provkeyquery().then((value) => {
      this.tableData = value;
    });
  }

  // 用户查询
  private async provkeyquery() {
    const { data } = await KeyManageModule.Provkeys();
    return data;
  }

  // 查询历史密钥
  private async Historyprovkey(datascrope: any) {
    let provname: string = datascrope.name;
    const { data } = await KeyManageModule.Historyprovscrets({ provname });
    this.history = data;
    console.log('this.history: ', this.history);
    this.keymanageVisible = true;
  }
}
</script>


