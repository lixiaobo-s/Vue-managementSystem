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
  </div>
</template>
<script setup lang='ts'>
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import api from "@/api/index";
import type { FormInstance } from "element-plus";
import { reactive, ref } from "vue-demi";
import userInfo from "@/store/index";
import { setToken } from "@/utils/setToken";
const userStore = userInfo();
const ruleFormRef = ref<FormInstance>();
const router = useRouter();
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
//登录
function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await api.login(form);
      if (res) {
        //返回是正确的数据就存入
        const { token } = res.data;
        // 持久化存储token
        setToken(token);
        userStore.setUserInfo(res.data);
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
}
</style>