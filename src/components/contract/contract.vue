<template>
  <div>
    <el-form
      ref="contractFormRef"
      :inline="true"
      :model="contract"
      label-width="100px"
      size="medium"
    >
      <!-- 合同 -->
        <el-form-item :span="8" label="合同编号" prop="contractId">
          <el-input v-model="contract.contractId"></el-input>
        </el-form-item>

        <el-form-item  :span="8" label="客户编号" prop="customerId">
          <el-select v-model="contract.customerId">
            <el-option v-for="item in customerIds" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item  :span="8" label="业务员" prop="saleMan">
          <el-input v-model="contract.saleMan"></el-input>
        </el-form-item>

        <el-form-item :span="8" label="订单状态" prop="orderStatus">
          <el-select v-model="contract.orderStatus">
            <el-option v-for="item in allOrderStatus" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单类型" prop="orderStatus">
          <el-select v-model="contract.orderStyle">
            <el-option v-for="item in allOrderStyle" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :span="8" label="发票类型" prop="invoiceStyle">
          <el-select v-model="contract.invoiceStyle">
            <el-option v-for="item in allInvoiceStyle" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
 
        <el-form-item :span="8" label="开票状态" prop="invoiceStatus">
          <el-select v-model="contract.invoiceStatus">
            <el-option v-for="item in allInvoiceStatus" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item :span="8" label="钉钉编号" prop="dingdingNo">
          <el-input v-model="contract.dingdingNo"></el-input>
        </el-form-item>

        <el-form-item label="合同日期" prop="orderTime">
          <!-- <el-input v-model="contract.orderTime"></el-input> -->
          <!-- <el-calendar v-model="contract.orderTime"></el-calendar> -->
          <el-date-picker
            v-model="contract.orderTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

    </el-form>

    <el-row :gutter="20">
      <el-col :span="3" :offset="21">
        <el-button size="small" type="primary" @click="addProductBtnClick">添加产品</el-button>
      </el-col>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="selectedProducts"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="productId" label="产品编码" width="120">
           <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.productId"></el-input>
            <span v-show="!scope.row.edit" @click="scope.row.edit=!scope.row.edit">{{ scope.row.productId }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="warehouse" label="仓库" width="120">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.warehouse"></el-input>
            <span v-show="!scope.row.edit" @click="scope.row.edit=!scope.row.edit">{{ scope.row.warehouse }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="productModel" label="产品型号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="unitPrice" label="产品单价" show-overflow-tooltip></el-table-column>
      <el-table-column prop="productNum" label="数量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="totalNum" label="总金额" show-overflow-tooltip></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteProduct(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contract: {
        contractId: "",
        customerId: "",
        saleMan: "",
        orderStatus: "",
        orderStyle: "",
        invoiceStatus: "",
        invoiceStyle: "",
        dingdingNo: "",
        orderTime: ""
      },
      customerIds: [],
      allOrderStatus: ["未发货", "已发货", "已完成"],
      allOrderStyle: ["正式订单", "试用订单"],
      allInvoiceStyle: ["专票", "普票"],
      allInvoiceStatus: ["未开票", "已开票"],
      dialogVisible: false,
      product: {
        // warehouse: "仓库一",
        // productId: "产品编码一",
        // productName: "产品名称一",
        // productModel: "产品型号一",
        // unitPrice: 100.0,
        // productNum: 12,
        // totalNum: 1200.0
      },
      //   已选产品列表
      products: [
          {
              id:1,
              name:'test1'
          },
          {
              id:1,
              name:'test2'
          }
      ],
      selectedProducts: [
        {
          warehouse: "仓库一",
          productId: "产品编码一",
          productName: "产品名称一",
          productModel: "产品型号一",
          unitPrice: 100.0,
          productNum: 12,
          totalNum: 1200.0,
          edit:false
        },
        {
          warehouse: "仓库二",
          productId: "产品编码二",
          productName: "产品名称二",
          productModel: "产品型号二",
          unitPrice: 50.0,
          productNum: 10,
          totalNum: 500.0,
          edit:false
        }
      ]
    };
  },
  created() {
    this.contract.orderStatus = this.allOrderStatus[0];
    this.contract.orderStyle = this.allOrderStyle[0];
    this.contract.invoiceStatus = this.allInvoiceStatus[0];
    this.contract.invoiceStyle = this.allInvoiceStyle[0];
    this.getAllCustomerId();
  },
  methods: {
    deleteProduct(product) {
      console.log(product);
    },
    addContractBtnClick() {},
    async getAllCustomerId() {
      const { data: res } = await this.$http.get("customer/getAllCustomerId");
      if (res.code == 0) {
        this.customerIds = res.msg;
        this.contract.customerId = this.customerIds[0];
      } else {
        this.$message.error("查询出错,请联系管理员");
      }
    },
    handleSelectionChange(val) {
      // console.log(val)
    },
    //点击添加产品按钮
    addProductBtnClick() {
      console.log(this.$refs.multipleTable.selection);
      this.selectedProducts.push({});
    },
    clickInput(product) {
      console.log(product);
    }
  }
};
</script>

<style lang="less" scoped>
</style>