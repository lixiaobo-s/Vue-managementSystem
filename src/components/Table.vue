<template>
  <el-table
    ref="multipleTableRef"
    :data="taDate"
    style="width: 100%"
    border
    @selection-change="props.handleSelectionChange"
  >
    <el-table-column type="selection" width="50" />
    <el-table-column
      :label="item"
      :prop="index"
      align="center"
      v-for="(item, index) in userStore.userListinfo"
      :key="index"
    />
    <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <el-button @click="props.update(scope.row, 'u')">编辑</el-button>
        <el-popconfirm
          width="150"
          confirm-button-text="确定"
          cancel-button-text="取消"
          :icon="InfoFilled"
          icon-color="rgb(255,140,21)"
          title="确认删除？"
          @Confirm="props.update(scope.row.userId, 'd')"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang='ts'>
import { InfoFilled } from "@element-plus/icons-vue";
import userInfo from "@/store/index";
import { ref, watch } from "vue";

const props = defineProps(["tableData", "update", "handleSelectionChange"]);
const userStore = userInfo();
const taDate = ref([]);
watch(
  () => props.tableData,
  (newval, oldval) => {
    filtersInfo(newval);
  }
);

//过滤字段，将0 1 等数据转换成文字

function filtersInfo(info: any) {
  const arr = info.map((item: any) => {
    return {
      ...item,
      role: userStore.roles[item.role],
      sex: userStore.sex[item.sex],
      state: userStore.states[item.state],
    };
  });
  taDate.value = arr;
}
</script>
<style lang='scss' scoped>
</style>