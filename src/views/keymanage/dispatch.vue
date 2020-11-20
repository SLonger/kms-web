<template>
  <div>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="provname" label="省份" width="180">
          </el-table-column>

          <el-table-column prop="appname" label="应用方名称" width="180">
          </el-table-column>
          <el-table-column prop="keyversion" label="版本号" width="180">
          </el-table-column>
          <el-table-column prop="ip" label="ip" width="180">
          </el-table-column>
          <el-table-column prop="dispatchTime" label="分发时间" width="180">
          </el-table-column>
          <el-table-column prop="timestamp" label="最后一次更新时间" width="180">
          </el-table-column>
          <el-table-column prop="type" :formatter="formatRole" label="应用方类型" width="180" >
            <template slot-scope="scope">
              <div>
                {{scope.row.type == 0? "加密方":"解密方"}}
              </div>
            </template>
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
import { KeyManageModule } from '@/store/modules/keymanages';

@Component({
  name: 'keymanagedispatch'
})
export default class extends Vue {
    private tableData: [] = [];
    // 查询分发记录
    private async Dispatchs() {
       const { data } = await KeyManageModule.Dispatchrecords("{}");
       return data;
    }
 
    created() {
      this.Dispatchs().then((value) => {
      this.tableData = value;
      });
    } 
}
</script>