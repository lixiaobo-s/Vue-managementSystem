<script setup lang="ts">
import MHeader from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";
import { ref } from "vue";
const show = ref(true);
const sildWidth = ref("200px");
function isShowAll() {
  //更改/
  show.value = !show.value;
  if (!show.value) {
    sildWidth.value = "50px";
    return;
  }
  sildWidth.value = "200px";
}
</script>

<template>
  <div class="main">
    <div class="common-layout">
      <el-container>
        <!-- 左侧菜单栏 -->
        <el-aside :width="sildWidth">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <!-- 面包屑部分 -->
          <el-header>
            <MHeader :isShowAll="isShowAll" :show="show" />
          </el-header>
          <!-- 主要展示部分 -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(238, 240, 243);

  .common-layout,
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: rgb(0, 21, 43);
    transition: all 0.3s;
  }
  .el-header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-main {
    background-color: #fff;
    margin: 10px;
  }
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
  .username {
    display: flex;
    margin-left: 10px;
    align-items: center;
    font-weight: 700;
    color: rgb(64, 158, 255);
  }
  .userInfo {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
}
</style>
