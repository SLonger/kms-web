<template>
  <div>
    <el-container>
      <el-header class="header">
        <el-button type="primary" @click="handleUseUser(0)">新增</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="account" label="姓名" width="180">
          </el-table-column>

          <el-table-column prop="gender" label="性别" width="180">
          </el-table-column>

          <el-table-column prop="telephone" label="手机号"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" @click="handleUseUser(1)"
                  >修改</el-button
                >
                <el-button type="danger" @click="delUser(scope.account)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog
      :title="isEditUser ? '修改用户' : '新增用户'"
      :visible.sync="isUseUserDialog"
    >
      <el-form :model="postUserData" ref="postUserForm">
        <el-form-item label="账号:" :label-width="labelWidth">
          <el-input
            v-model="postUserData.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="!isEditUser"
          label="密码:"
          :label-width="labelWidth"
        >
          <el-input
            type="password"
            v-model="postUserData.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="!isEditUser"
          label="角色:"
          :label-width="labelWidth"
        >
          <el-input v-model="postUserData.role" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名:" :label-width="labelWidth">
          <el-input v-model="postUserData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别:" :label-width="labelWidth">
          <el-radio-group v-model="postUserData.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门:" :label-width="labelWidth">
          <el-input
            v-model="postUserData.department"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" :label-width="labelWidth">
          <el-input v-model="postUserData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="labelWidth">
          <el-input
            v-model="postUserData.telephone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogpostUserDataVisible = false">取 消</el-button>
        <el-button type="primary" @click="postUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Message, Tree as ElTree } from 'element-ui';
import { TreeData } from 'element-ui/types/tree';
import { UserModule } from '@/store/modules/user';
import { ElForm } from 'element-ui/types/form';

@Component({
  name: 'usermanage'
})
export default class extends Vue {
  private tableData: [] = [];
  private isUseUserDialog: Boolean = false;
  private postUserData = {
    account: '',
    password: '',
    role: '',
    name: '',
    gender: '',
    department: '',
    email: '',
    telephone: ''
  };
  private isEditUser: Boolean = false;
  private labelWidth: String = '80px';
  private userinfo = {
    allAccount: true
  };

  created() {
    this.handleUserquery().then((value) => {
      this.tableData = value;
    });
  }
  private handleUseUser(type: Number) {
    if (type == 0) {
      this.isEditUser = false;
      this.postUserData = {
        account: '',
        password: '',
        role: '',
        name: '',
        gender: '',
        department: '',
        email: '',
        telephone: ''
      };
    } else {
      this.isEditUser = true;
    }
    this.isUseUserDialog = !this.isUseUserDialog;
  }

  private postUser() {
    console.log(this.postUserData);

    (this.$refs.postUserForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        let data: any = {};
        if (this.isEditUser) {
          data = await UserModule.EditUser(this.postUserData);
        } else {
          data = await UserModule.Register(this.postUserData);
        }

        if (data.status == 1) {
          Message({
            message: data.message || '成功',
            type: 'success',
            duration: 5 * 1000
          });
          this.isUseUserDialog = false;
          this.handleUserquery().then((value) => {
            this.tableData = value;
          });
        }
        console.log(data);
      } else {
        return false;
      }
    });
  }
  private async delUser(account: String) {
    console.log(this.postUserData);
    let data = await UserModule.delUser(account);
    if (data.status == 1) {
      Message({
        message: data.message || '成功',
        type: 'success',
        duration: 5 * 1000
      });

      this.handleUserquery().then((value) => {
        this.tableData = value;
      });
    }
  }
  private async handleUserquery() {
    const { data } = await UserModule.Userquery(this.userinfo);
    return data;
  }
}
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
}
</style>
