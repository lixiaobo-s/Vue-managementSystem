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
      <SubMenu :item="item"></SubMenu>
    </template>
  </el-menu>
</template>
<script setup lang='ts'>
import SubMenu from "@/components/SubMenu.vue";
import MenuItem from "@/components/MenuItem.vue";
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