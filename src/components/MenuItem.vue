<template>
  <!-- 多级菜单 -->
  <el-menu-item
    v-if="item.children == undefined || item.children.length == 0"
    :key="item"
    :index="item.url"
    >{{ item.name }}</el-menu-item
  >
  <template v-else>
    <SubMenu :item="item"></SubMenu>
  </template>
</template>
<script setup lang='ts'>
import { DataAnalysis } from "@element-plus/icons-vue";
import SubMenu from "@/components/SubMenu.vue";
import MenuItem from "@/components/MenuItem.vue";
import { defineProps, onMounted } from "vue";
const props = defineProps(["item"]);
onMounted(() => {
  //   console.log(props.item.url);
  //   console.log(
  //     props.item.children == undefined || props.item.children.length == 0
  //     );
  if (props.item.children == undefined || props.item.children.length == 0) {
  } else {
    // for (let index = 0; index < props.item.children.length; index++) {
    //   console.log(props.item.children[index]);
    // }
    console.log(props.item);
  }
});
</script>
<style lang='scss' scoped>
</style>