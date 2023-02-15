<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="props.totals"
    :page-sizes="[5, 10]"
    :page-size="props.pageSize"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :current-page="props.currentPage"
  >
  </el-pagination>
</template>
<script setup lang='ts'>
import { defineEmits } from "vue";
const props = defineProps(["totals", "pageSize", "currentPage"]);
//自定义事件
const emits = defineEmits(["changepageinfo"]);
function handleCurrentChange(val: number) {
  emits("changepageinfo", {
    t: "currentPage",
    number: val,
  });
}
function handleSizeChange(val: number) {
  emits("changepageinfo", {
    t: "pageSize",
    number: val,
  });
}
</script>
<style lang='scss' scoped>
</style>