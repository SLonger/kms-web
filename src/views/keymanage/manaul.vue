<template>
  <div>
      <el-main>
          
          <el-input 
          ref="provname"
          v-model="provname"
          name="name"
          type="text"
          autocomplete="on"
          style="width:180px"
          placeholder="省份名"
        ></el-input>
         <span style="width:100px">时间</span>
         <el-date-picker
              v-model="selfdatetime"
              value-format="timestamp"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              >
         </el-date-picker>
         
         <el-button type="primary" @click="manualquerykey">查询</el-button>

         <el-table :data="provkeys">
            <el-table-column property="keyversion" label="密钥版本号" width="250"></el-table-column>
            <el-table-column property="key" label="密钥" width="200"></el-table-column>
        </el-table>

      </el-main>
    </el-container>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Message, Tree as ElTree } from 'element-ui';
import { TreeData } from 'element-ui/types/tree';
import { KeyManageModule } from '@/store/modules/keymanages';

@Component({
  name: 'keymanagemanual'
})
export default class extends Vue {
    private selfdatetime = [];
    private provname ="";
    private provkeys = [];

    // 手动查询密钥
  private async manualquerykey() {
    const { data } = await KeyManageModule.Manualquerykey({provname:this.provname, 
      startTime:this.selfdatetime[0], endTime:this.selfdatetime[1]});
      this.provkeys = data
    return data;
  }
}
</script>
