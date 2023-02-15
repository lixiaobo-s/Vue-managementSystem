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
    <el-sub-menu index="/home">
      <template #title>
        <el-icon><Promotion /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/home/user">用户管理</el-menu-item>
      <el-menu-item index="1-2">菜单管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>审批管理</span>
      </template>
      <el-menu-item index="2-1">审批管理-1</el-menu-item>
      <el-menu-item index="2-2">审批管理-2</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup lang='ts'>
import { Promotion, Setting } from "@element-plus/icons-vue";
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