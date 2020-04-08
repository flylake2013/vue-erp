<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" @click="addProductBtnClick">添加产品</el-button>
      </el-row>
    </el-card>

    <el-table :data="productList" style="width: 100%" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="productId" label="产品编号" width="180"></el-table-column>
      <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
      <el-table-column prop="productModel" label="产品型号"></el-table-column>
      <el-table-column prop="warehouse" label="仓库"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editProduct(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteProduct(scope.row)"
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
      <el-form ref="productFormRef" :model="productForm" label-width="100px" class="login_form">
        <!-- 用户名 -->
        <el-form-item label="产品编号" prop="productId">
          <el-input v-model="productForm.productId" :disabled="disableInput"></el-input>
        </el-form-item>

        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="productForm.productName" :disabled="disableInput"></el-input>
        </el-form-item>
        <el-form-item label="产品型号" prop="productModel">
          <el-input v-model="productForm.productModel"></el-input>
        </el-form-item>
        <el-form-item label="仓库" prop="warehouse">
          <el-input v-model="productForm.warehouse"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="disableInput?updateProduct():addProduct()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTitle: "添加产品",
      productForm: {
        productId: "",
        productName: "",
        productModel: "",
        warehouse: ""
      },
      dialogVisible: false,
      queryInfo: {
        pageNum: 1
      },
      totalPage: 4,
      disableInput: false,
      productList: []
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    closeForm() {
      //   this.$refs.customerFormRef.resetFields();
    },
    // 点击编辑客户按钮
    editProduct(product) {
      this.dialogTitle = "修改产品";
      this.dialogVisible = true;
      this.productForm = product;
      this.disableInput = true;
    },
    //更新客户信息
    async updateProduct() {
      const { data: res } = await this.$http.post(
        "product/updateProduct",
        this.productForm
      );
      this.dialogVisible = false;
      if (res.code == 0) {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },

    // 删除产品
    deleteProduct(product) {
      this.$confirm("确定删除产品?此操作不可逆", "警告", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const { data: res } = await this.$http.post(
          "product/deleteProduct",
          product
        );
        if (res.code == 0) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
        this.getProductList();
      }).catch(()=>'')
    },
    // 点击了添加客户按钮
    addProductBtnClick() {
      this.dialogTitle = "添加产品";
      this.productForm = {};
      this.dialogVisible = true;
      this.disableInput = false;
    },
    async addProduct() {
      const { data: res } = await this.$http.post(
        "product/addProduct",
        this.productForm
      );
      if (res.code == 0) {
        this.$message.success("添加成功");
        this.dialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
      this.getProductList()
    },
    async getProductList() {
      const { data: res } = await this.$http.post(
        "product/getProductByPage",
        this.queryInfo
      );

      console.log(res)
      if (res.code == 0) {
        this.totalPage = res.msg.totalPage;
        this.productList = res.msg.productList;
      } else {
        this.$message.error("查询失败,请联系管理员");
      }
    },
    // 页码改变时
    handlePageChange(currentPage) {
      this.queryInfo.pageNum = currentPage;
      this.getProductList();
    }
  }
};
</script>

<style lang="less" scoped>
</style>