<template>
  <div class="login">
    <h3 class="tilte">后台管理系统</h3>
    <el-form ref="ruleFormRef" :model="form" class="form" :rules="rules">
      <el-form-item prop="username">
        <el-input
          type="text"
          placeholder="输入你的用户名"
          :prefix-icon="UserFilled"
          v-model="form.username"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="输入的你密码"
          :prefix-icon="Lock"
          show-password
          v-model="form.password"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button
          type="primary"
          style="width: 100%"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <router-link to="/register" class="toRegister">没有账号？</router-link>
  </div>
</template>
<script setup lang='ts'>
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import type { FormInstance } from "element-plus";
import { onMounted, reactive, ref } from "vue-demi";
import userInfo from "@/store/index";

const userStore = userInfo();
const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const route = useRoute();
//验证规则
const rules = reactive({
  username: [{ validator: validateuserName, trigger: "blur" }],
  password: [{ validator: validatecheckPass, trigger: "blur" }],
});
//验证用户名
function validateuserName(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("请输入后再试"));
  } else if (value.length < 3 || value.length > 9) {
    callback(new Error("用户名为3-6位"));
  } else {
    callback();
  }
}
var uPattern = /^[a-zA-Z0-9_-]{4,7}$/;
//验证密码
function validatecheckPass(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("请输入后再试"));
  } else if (!uPattern.test(value)) {
    callback(new Error("密码为4-7位的字母,数字,下划线"));
  } else {
    callback();
  }
}
const form = reactive({
  username: "",
  password: "",
});
onMounted(() => {
  if (route.params.userName !== "") {
    form.username = route.params.userName as string;
  }
});
//登录
function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let res = await userStore.setUserInfo(form);
      if (res) {
        //请求菜单路由信息
        await userStore.getMenus();
        router.push("/");
      }
    } else {
      return false;
    }
  });
}
</script>
<style lang='scss' scoped>
.login {
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  box-sizing: border-box;
  padding: 30px 20px;
  //剧中
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  .tilte {
    text-align: center;
    font-size: 24px;
  }
  .form {
    margin-top: 30px;
  }
  .toRegister {
    display: inline-block;
    width: 100%;
    font-size: 12px;
    text-align: end;
  }
}
</style>