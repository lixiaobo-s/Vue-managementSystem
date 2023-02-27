<template>
  <!-- 多级菜单 -->
  <el-menu-item
    v-if="item.children == undefined || item.children.length == 0"
    :key="item"
    :index="item.url"
    :class="item.menuId ? '' : 'menuli'"
  >
    <el-icon v-if="item.menuId">
      <component class="icons" :is="item.icon"></component>
    </el-icon>

    {{ item.name }}</el-menu-item
  >
  <template v-else>
    <SubMenu :item="item"></SubMenu>
  </template>
</template>
<script setup lang='ts'>
import SubMenu from "@/components/SubMenu.vue";

import { defineProps, onMounted } from "vue";
const props = defineProps(["item"]);
onMounted(() => {
  // console.log(props.item.url);
});
</script>
<style lang='scss' scoped>
li.menuli {
  margin-left: 5px;
}
</style>