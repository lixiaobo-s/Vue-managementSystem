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
    <template v-for="item in store.menus" :key="item.menuId">
      <!-- 多级菜单的 -->
      <el-sub-menu v-if="item.children.length > 0" :index="item.url">
        <template #title>
          <el-icon><Promotion /></el-icon>
          <span> {{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(citem, i) in item.children"
          :key="i"
          :index="citem.path"
          >{{ citem.name }}</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item v-else :index="item.url">
        <template #title>
          <el-icon><DataAnalysis /></el-icon>
          <span> {{ item.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup lang='ts'>
import { Promotion, DataAnalysis } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import userinfo from "@/store/index";
const store = userinfo();
const route = useRoute();
onMounted(() => {
  store.getMenus();
});
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