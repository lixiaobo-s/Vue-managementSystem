<template>
  <div class="register">
    <h3>注册你的个人账号</h3>
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="regsiterForm"
      status-icon
      class="demo-ruleForm"
    >
      <el-form-item label="用 &nbsp;户&nbsp;名:" prop="username">
        <el-input type="text" v-model="userInfo.username" />
      </el-form-item>
      <el-form-item label="密 &nbsp;&nbsp;&nbsp; &nbsp;码:" prop="password">
        <el-input type="password" v-model="userInfo.password" />
      </el-form-item>
      <el-form-item label="确认密码:" prop="rpassword">
        <el-input type="password" v-model="userInfo.rpassword" />
      </el-form-item>
      <el-form-item label="邮 &nbsp;&nbsp;&nbsp; &nbsp;箱:" prop="email">
        <el-input type="email" v-model="userInfo.email" />
      </el-form-item>
      <el-form-item label="电话号码:" prop="phoneNumber">
        <el-input type="text" v-model="userInfo.phoneNumber" />
      </el-form-item>
      <el-form-item label="性 &nbsp;&nbsp;&nbsp; &nbsp;别">
        <el-radio-group v-model="userInfo.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(regsiterForm)"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
    <router-link to="/login" class="toRegister">已有账号？</router-link>
  </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import Api from "@/api/index";
import { log } from "console";
const router = useRouter();
const regsiterForm = ref<FormInstance>();

const userInfo = reactive({
  username: "",
  password: "",
  rpassword: "",
  email: "",
  phoneNumber: "",
  sex: "0",
});
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名！", trigger: "blur" },
    { min: 3, max: 7, message: "用户名为3-6位！" },
  ],
  password: [{ required: true, validator: verPassword, trigger: "blur" }],
  rpassword: [{ required: true, validator: verRpassword, trigger: "blur" }],
  email: [{ required: true, validator: verEmail, trigger: "blur" }],
  phoneNumber: [{ required: true, validator: verPhone, trigger: "blur" }],
  //   sex: "1",
});
//验证密码
//包含字母数字符号 1-5位
const reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{1,5}$/;
//验证邮箱
const rege =
  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
//验证手机号
const regp = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
function verPassword(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("输入你的密码！"));
  } else {
    if (reg.test(userInfo.password)) {
      callback();
    } else {
      callback(new Error("密码包含字母数字符号 1-5位"));
    }
  }
}
//验证密码是否相等
function verRpassword(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("输入你的密码！"));
  } else {
    if (userInfo.password == userInfo.rpassword) {
      callback();
    } else {
      callback(new Error("密码输入不一致！"));
    }
  }
}
//验证邮箱
function verEmail(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("输入你的邮箱"));
  } else {
    if (rege.test(userInfo.email)) {
      callback();
    } else {
      callback(new Error("邮箱格式不对！"));
    }
  }
}
//验证手机号
function verPhone(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("输入你的手机号码"));
  } else {
    if (regp.test(userInfo.phoneNumber)) {
      callback();
    } else {
      callback(new Error("手机号格式不对！"));
    }
  }
}
//注册事件
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      re();
    } else {
      console.log("error submit!", fields);
    }
  });
};
async function re() {
  let obj = {
    username: userInfo.username,
    userpassword: userInfo.phoneNumber,
    userEmail: userInfo.email,
    sex: userInfo.sex,
    mobile: userInfo.phoneNumber,
  };
  let res = await (<any>Api.register(obj));
  const { username } = res.data;
  setTimeout(() => {
    router.replace(`/login/${username}`);
  }, 100);
}
</script>
<style lang='scss' scoped>
.register {
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  box-sizing: border-box;
  padding: 30px 20px;
  //剧中
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  h3 {
    text-align: center;
  }
  .el-form {
    margin-top: 20px;
  }
  :deep(.el-form-item__label) {
    width: 80px !important;
    justify-content: flex-start !important;
    padding: 0 0 0 0 !important;
    font-weight: 700;
    margin-right: 10px;
  }
  :deep(.el-radio) {
    font-weight: 700;
  }
  :deep(.el-button) {
    width: 100%;
    font-size: 18px;
  }
  .toRegister {
    display: inline-block;
    width: 100%;
    font-size: 12px;
    text-align: end;
  }
}
</style>