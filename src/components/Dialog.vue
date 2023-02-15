<template>
  <el-dialog
    v-model="props.show"
    width="30%"
    :show-close="false"
    :before-close="close"
  >
    <div class="table">
      <el-form label-width="100px" style="max-width: 460px" :model="def">
        <el-form-item label="用户ID">
          <el-input disabled v-model="def.userId" />
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="def.username" />
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="def.userEmail" />
        </el-form-item>
        <el-form-item label="用户角色">
          <!-- <el-input v-model="def.role" /> -->
          <el-select v-model="def.role">
            <el-option
              :label="item"
              :value="index"
              v-for="(item, index) in store.roles"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态">
          <!-- <el-input v-model="def.state" /> -->
          <el-select v-model="def.state">
            <el-option
              :label="item"
              :value="index"
              v-for="(item, index) in store.states"
              :key="index"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import { ref, watch } from "vue";
import Api from "@/api/index";
import { ElMessageBox } from "element-plus";
import userStore from "@/store/index";
const props = defineProps(["show", "userinfo", "getUserInfo"]);
const emit = defineEmits(["close"]);
const store = userStore();
const def = ref({
  userId: "",
  username: "",
  userEmail: "",
  role: "",
  state: "",
});
//监听传入的数据变化
watch(
  () => props.userinfo,
  (newval, oldval) => {
    def.value = newval;
  },
  { immediate: true }
);

const handleClose = () => {
  emit("close", false);
};
function close() {
  emit("close", false);
}
async function save() {
  await Api.updatedUser(fliterDef());
  close();
  await props.getUserInfo();
}

//过滤字段
function fliterDef() {
  const { role, state } = def.value;

  const { roles, states } = store;
  let obj = { ...def.value };
  obj.role = fn(roles, role);
  obj.state = fn(states, state);
  return obj;
}
//对象取key
function fn(obj: any, value: any): string {
  for (let key in obj) {
    if (obj[key] == value) {
      return key;
    }
  }
  return value;
}
</script>
<style lang='scss' scoped>
</style>