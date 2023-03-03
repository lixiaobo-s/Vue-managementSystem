<template>
  <div class="el-header-left">
    <el-icon v-if="props.show" @click="props.isShowAll"><Fold /></el-icon>
    <el-icon v-else @click="props.isShowAll"><Expand /></el-icon>
    <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
      <el-breadcrumb-item
        v-for="item in breadcrumb"
        :key="item"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>

  <!-- 用户退出部分 -->
  <div class="el-header-right">
    <!-- 图标 -->
    <div class="icon">
      <!-- 红点 -->
      <el-badge is-dot class="item">
        <el-icon><Bell /></el-icon>
      </el-badge>
    </div>
    <!-- 个人信息 -->
    <div class="userInfo">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link username">
          {{ stroe.userInfo.username
          }}<el-icon
            class="el-icon--right"
            style="width: 18px; height: 18px; fontweight: 700"
            ><arrow-down
          /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click="outLine">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang='ts'>
import {
  ArrowDown,
  ArrowRight,
  Expand,
  Bell,
  Fold,
} from "@element-plus/icons-vue";
import { removeToken } from "@/utils/setToken";
import { useRouter, useRoute } from "vue-router";
import userStore from "@/store/index";
import { resetRouter } from "@/utils/addmenu";
import { computed } from "vue";
const stroe = userStore();
const router = useRouter();
const route = useRoute();

const props = defineProps(["show", "isShowAll"]);
//退出登录
function outLine() {
  //清空pinia中数据
  removeToken();
  resetRouter();
  router.replace("/login");
}

const breadcrumb = computed(() => {
  //获取路径下的所有路由信息
  let rumb = route.matched;
  let rumbs = rumb.map((item) => {
    return {
      name: item.meta.title,
      path: item.path,
    };
  });
  return rumbs;
});
</script>
<style lang='scss' scoped>
.el-header-left {
  display: flex;
  .breadcrumb {
    margin-left: 20px;
  }
}
.el-header-right {
  display: flex;
  .icon {
    position: relative;
    margin-right: 10px;
    span {
      font-weight: 700;
      font-size: 25px;
    }
    .item {
      font-size: 20px;
      font-weight: 700;
    }
    .dot {
      display: inline-block;
      width: 7px;
      height: 7px;
      background-color: rgba(255, 0, 0, 0.7);
      border-radius: 7px;
      position: absolute;
      top: 0;
      right: -5px;
    }
  }
}
</style>