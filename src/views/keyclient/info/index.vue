<template>
  <el-collapse @change="handleChange">
    <div>
      <el-collapse-item v-for="(value, index) in provs" :key="index">
        <template slot="title">
          <span style="color: blue">{{ value }}</span>
        </template>
        <div>{{ index }}</div>
      </el-collapse-item>
    </div>
  </el-collapse>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Message, Tree as ElTree } from 'element-ui';
import { TreeData } from 'element-ui/types/tree';
import { ElForm } from 'element-ui/types/form';

@Component({
  name: 'keyclient'
})
export default class extends Vue {
  private provs = ['北京', '上海', '天津'];
  // private activeName = '1';

  private handleChange() {
    console.log('ha');
  }
}
</script>
