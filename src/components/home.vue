<template>
<el-container class="home-container">
  <el-header>
      <div >
          <img src="../assets/heima.jpg" class="avator">
          <span>黑马物流管理系统</span>
      </div>

  </el-header>
  <el-container>
    <el-aside width="200px">
     <el-menu
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff" :router="true" :default-active="$route.path">
      <!-- 一级菜单 -->
      <!-- <el-submenu :index="item.name" v-for="item in menuList" :key="item.name" >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template> -->
        
        <!-- 二级菜单 -->
        <el-menu-item :index="item.path" v-for="item in menuList" :key="item.name">
            <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </template>
        </el-menu-item>
        
      <!-- </el-submenu> -->
    </el-menu>
    </el-aside>
    <!-- 主体区域 -->
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            menuList:[]
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        getMenuList() {
            const that = this
            this.$http.get('menu/getAllMenu').then(res=>{
                
                if(res.data.code != 0)  that.$message.error(res.data.msg)
                that.menuList = res.data.msg
            })
        }
    }
}
</script>

<style lang='less' scoped>
.el-header{
    background-color: #373d41;
    display: flex;
    padding-left: 0px;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        span {
         margin-left: 15px;
        }
    }
     
}

.el-aside{
    background-color: #333744;
    .el-menu {
        border-right: none;
    }
}

.el-main{
    background-color: #eaedf1;
}

.home-container{
    height: 100%;
}
.avator{
    height: 50px;
    width: 50px;
    border-radius:50%;
}
</style>