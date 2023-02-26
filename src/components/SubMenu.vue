<template>
  <!-- 一级菜单栏 -->
  <el-sub-menu v-if="item.children.length > 0" :index="item.url">
    <template #title>
      <el-icon><Promotion /></el-icon>
      <span> {{ item.name }}</span>
    </template>

    <MenuItem
      v-for="(citem, index) in item.children"
      :key="index"
      :item="citem"
    ></MenuItem>
  </el-sub-menu>
  <template v-else>
    <MenuItem :item="item"></MenuItem>
  </template>
</template>
<script setup lang='ts'>
import { Promotion, DataAnalysis } from "@element-plus/icons-vue";
import MenuItem from "@/components/MenuItem.vue";
import { defineProps, onMounted } from "vue";
const props = defineProps(["item"]);
onMounted(() => {
  console.log(props.item.children.length > 0);
});
</script>
<style lang='scss' scoped>
</style>