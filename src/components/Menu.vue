<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo"
    text-color="#ffff"
    background-color="transparent"
    active-text-color="skyblue"
    router
  >
    <div class="logo">
      <img
        src="https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white-d0c9fe2af5.png"
        alt=""
        srcset=""
      />
    </div>
    <el-menu-item index="/">
      <template #title>
        <el-icon><DataAnalysis /></el-icon>
        <span>大屏看图</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="/system">
      <template #title>
        <el-icon><Promotion /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/system/user">用户管理</el-menu-item>
      <el-menu-item index="1-2">菜单管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup lang='ts'>
import { Promotion, DataAnalysis } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style lang='scss' scoped>
.logo {
  width: 150px;
  margin: 10px auto;
  img {
    height: 50px;
  }
}
</style>