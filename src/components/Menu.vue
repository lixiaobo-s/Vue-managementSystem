<template>
  <el-menu
    :default-active="active"
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
    <template v-for="item in store.FilterRouterInfo" :key="item.menuId">
      <!-- 多级菜单的 -->
      <SubMenu :item="item"></SubMenu>
    </template>
  </el-menu>
</template>
<script setup lang='ts'>
import SubMenu from "@/components/SubMenu.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import userinfo from "@/store/index";
import { storeToRefs } from "pinia"; //仓库数据双向绑定；
const store = userinfo();
const route = useRoute();
const { FilterRouterInfo } = storeToRefs(store);
onMounted(() => {
  store.getMenus();
});

//分页器高亮效果不丢失
let active = computed(() => {
  //完整路径
  let path = route.path;

  //params参数
  let params = route.params.currentPage;
  if (params) {
    path = path.split("/" + `${params}`)[0];
  }
  return path;
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