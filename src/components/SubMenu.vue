<template>
  <!-- 一级菜单栏  有menuid，有children -->
  <el-sub-menu v-if="item.children.length > 0 && item.menuId" :index="item.url">
    <template #title>
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <span> {{ item.name }}</span>
    </template>

    <MenuItem
      v-for="(citem, index) in item.children"
      :key="index"
      :item="citem"
    ></MenuItem>
  </el-sub-menu>
  <!-- 多级菜单，没有menuid 有children-->
  <el-sub-menu v-else-if="item.children.length > 0" :index="item.url">
    <template #title>
      <span class="menudiv"> {{ item.name }}</span>
    </template>
    <MenuItem
      v-for="(citem, index) in item.children"
      :key="index"
      :item="citem"
    ></MenuItem>
  </el-sub-menu>
  <!-- 普通菜单 -->
  <template v-else>
    <MenuItem :item="item"></MenuItem>
  </template>
</template>
<script setup lang='ts'>
import MenuItem from "@/components/MenuItem.vue";
import { defineProps } from "vue";
defineProps(["item"]);
</script>
<style lang='scss' scoped>
.menudiv {
  margin-left: 5px;
}
</style>