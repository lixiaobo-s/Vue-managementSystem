<template>
  <el-table
    v-loading="loading"
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
import { storeToRefs } from "pinia"; //仓库数据双向绑定；
// import { getCurrentInstance, ComponentInternalInstance } from "vue";
import { ref, watch } from "vue";

const props = defineProps(["tableData", "update", "handleSelectionChange"]);
const userStore = userInfo();
let store = storeToRefs(userStore);
const taDate = ref([]);
const loading = ref(true);
watch(
  () => store.roles.value,
  (newval, oldval) => {
    filtersInfo();
  }
);
watch(
  () => props.tableData,
  () => {
    filtersInfo();
  }
);
//强制刷新
// onMounted(() => {
//   const { proxy } = getCurrentInstance() as ComponentInternalInstance;

//   proxy!.$forceUpdate();
// });
//过滤字段，将0 1 等数据转换成文字
function filtersInfo() {
  loading.value = true;
  if (props.tableData) {
    const arr = props.tableData.map((item: any) => {
      return {
        ...item,
        role: store.roles.value[item.role],
        sex: store.sex.value[item.sex],
        state: store.states.value[item.state],
      };
    });
    setTimeout(() => {
      loading.value = false;
      taDate.value = arr;
    }, 500);
  }
}
</script>
<style lang='scss' scoped>
</style>