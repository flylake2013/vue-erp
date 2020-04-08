<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" @click="addCustomerBtnClick">添加客户</el-button>
      </el-row>
    </el-card>

    <el-table :data="customerList" style="width: 100%" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="customerId" label="客户编号" width="180"></el-table-column>
      <el-table-column prop="region" label="所属区域" width="180"></el-table-column>
      <el-table-column prop="country" label="所属国家"></el-table-column>
      <el-table-column prop="customerName" label="客户名称"></el-table-column>
      <el-table-column prop="customerSimpleName" label="客户简称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editCustomer(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteCustomer(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="totalPage"
      :current-page="queryInfo.pageNum"
      @current-change="handlePageChange"
    ></el-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" @close="closeForm">
      <el-form ref="customerFormRef" :model="customerForm" label-width="100px" class="login_form">
        <!-- 用户名 -->
        <el-form-item label="客户编号" prop="customerId">
          <el-input v-model="customerForm.customerId" :disabled="disableInput"></el-input>
        </el-form-item>

        <el-form-item label="所属区域" prop="region">
          <el-input v-model="customerForm.region"></el-input>
        </el-form-item>
        <el-form-item label="所属国家" prop="country">
          <el-input v-model="customerForm.country"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="customerForm.customerName"></el-input>
        </el-form-item>
        <el-form-item label="客户简称" prop="customerSimpleName">
          <el-input v-model="customerForm.customerSimpleName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="disableInput?updateCustomer():addCustomer()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTitle: "添加用户",
      customerForm: {
        customerId: "",
        region: "",
        country: "",
        customerName: "",
        customerSimpleName: ""
      },
      dialogVisible: false,
      queryInfo: {
        pageNum: 1
      },
      totalPage: 4,
      disableInput: false,
      customerList: []
    };
  },
  created() {
    this.getCustomerList();
  },
  methods: {
    closeForm() {
      //   this.$refs.customerFormRef.resetFields();
    },
    // 点击编辑客户按钮
    editCustomer(customer) {
      this.dialogTitle = "修改客户";
      this.dialogVisible = true;
      this.customerForm = customer;
      this.disableInput = true;
    },
    //更新客户信息
    async updateCustomer() {
      console.log(this.customerForm);
      const { data: res } = await this.$http.post(
        "customer/updateCustomer",
        this.customerForm
      );
      this.dialogVisible = false;
      if (res.code == 0) {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },

    // 删除客户
    deleteCustomer(customer) {
      this.$confirm("确定删除客户?此操作不可逆", "警告", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const { data: res } = await this.$http.post(
          "customer/deleteCustomer",
          customer
        );
        if (res.code == 0) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
        this.getCustomerList();
      }).catch(()=>'')
    },
    // 点击了添加客户按钮
    addCustomerBtnClick() {
      this.dialogTitle = "添加用户";
      this.customerForm = {};
      console.log(this.defaultCustomerForm);
      this.dialogVisible = true;
      this.disableInput = false;
    },
    async addCustomer() {
      const { data: res } = await this.$http.post(
        "customer/addCustomer",
        this.customerForm
      );
      if (res.code == 0) {
        this.$message.success("添加成功");
        this.dialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
      this.getCustomerList()
    },
    async getCustomerList() {
      const { data: res } = await this.$http.post(
        "customer/getCustomerByPage",
        this.queryInfo
      );
      if (res.code == 0) {
        this.totalPage = res.msg.totalPage;
        this.customerList = res.msg.customerList;
      } else {
        this.$message.error("查询失败,请联系管理员");
      }
    },
    // 页码改变时
    handlePageChange(currentPage) {
      console.log(currentPage);
      this.queryInfo.pageNum = currentPage;
      this.getCustomerList();
    }
  }
};
</script>

<style lang="less" scoped>
</style>