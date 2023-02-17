<template>
  <el-card class="search-box">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      ref="serchForm"
    >
      <el-form-item prop="userID">
        <el-input v-model="formInline.userID" placeholder="请输入用户ID" />
      </el-form-item>
      <el-form-item prop="userName">
        <el-input v-model="formInline.userName" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 列表 -->
  <el-card class="Item">
    <el-button
      type="danger"
      :icon="Delete"
      class="deletebtn"
      @click="deleteMany"
      >批量删除</el-button
    >
    <Table
      :tableData="tableData"
      :update="update"
      :handleSelectionChange="handleSelectionChange"
    ></Table>
    <!-- 分页器 -->
    <Pagination
      :totals="totals"
      :pageSize="pageSize"
      :currentPage="currentPage"
      @changepageinfo="changepageinfo"
    />
  </el-card>
  <Dialog
    :show="showDialog"
    @close="closeDialog"
    :userinfo="userinfo"
    :getUserInfo="getUserInfo"
  ></Dialog>
</template>
<script setup lang='ts'>
import { reactive, ref, onMounted, watch } from "vue";
import { FormInstance, ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import Api from "@/api/index";
import Table from "@/components/Table.vue";
import Pagination from "@/components/Pagination.vue";
import Dialog from "@/components/Dialog.vue";
import userInfo from "@/store/index";
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();
const userStore = userInfo();
//定义数据类型
interface User {
  userId: string;
  username: string;
  userEmail: string;
  role: number;
  state: number;
  createTime: string;
  lastLoginTime: string;
}
//数据
const tableData = ref<User[]>();
//分页器
const currentPage = ref(1); //当前页数
const pageSize = ref(5); //每页展示的条数
const totals = ref(0);
//展示编辑框
const showDialog = ref(false);
onMounted(() => {
  if (route.params.currentPage != "") {
    currentPage.value = +route.params.currentPage;
  }
  getUserInfo();
  getRole();
});
//监听页数变化和每页展示的数据变化
watch([currentPage, pageSize], () => {
  router.push(`/system/user/${currentPage.value}`);
  getUserInfo();
});
//获取用户信息
async function getUserInfo(userName = "", userID = "") {
  const page = currentPage.value;
  const size = pageSize.value;
  let res = await (<any>Api.getUserInfo(page, size, userName, userID));
  tableData.value = res.data;
  totals.value = res.totals;
}
//获取titl标题信息
async function getRole() {
  let res = await (<any>Api.getUserRole());
  const { roles, states, userListinfo, sex } = res.data;
  userStore.roles = roles;
  userStore.states = states;
  userStore.userListinfo = userListinfo;
  userStore.sex = sex;
}
const serchForm = ref<FormInstance | undefined>();
const formInline = reactive({
  userID: "",
  userName: "",
});

const onSubmit = async () => {
  if (formInline.userName == "" && formInline.userID == "") {
    ElNotification({
      title: "提示",
      message: "输入内容后再试",
      type: "warning",
    });
    return;
  }
  getUserInfo(formInline.userName, formInline.userID);
};
const onReset = () => {
  serchForm.value?.resetFields();
  getUserInfo();
};

const multipleSelection = ref<string[]>();

const handleSelectionChange = (val: User[]) => {
  let userIds = val.map((item) => {
    return item.userId;
  });

  multipleSelection.value = userIds;
};
//批量删除
async function deleteMany() {
  const datas = multipleSelection.value;
  console.log(datas?.length);

  if (datas && datas.length > 0) {
    await Api.deleteUserMany(datas);
    getUserInfo();
    return;
  }
  ElNotification({
    title: "删除失败！",
    message: "选择后再试",
    type: "warning",
  });
}
//分页器事件
function changepageinfo(index: { t: string; number: number }) {
  const { t, number } = index;
  if (t == "currentPage") {
    currentPage.value = number;
  } else {
    pageSize.value = number;
  }
}
//关闭closeDialog事件
function closeDialog(handler: boolean) {
  showDialog.value = handler;
}
const userinfo = ref();
//更新与删除
async function update(info: any, t: string) {
  if (t == "u") {
    userinfo.value = {
      userId: info.userId,
      username: info.username,
      userEmail: info.userEmail,
      role: info.role,
      state: info.state,
    };
    showDialog.value = true;
  } else {
    await Api.deleteUser(info);
    await getUserInfo();
  }
}
</script>
<style lang='scss' scoped>
.search-box {
  margin-bottom: 20px;
}
.deletebtn {
  margin-bottom: 20px;
}
.Item {
  .el-table ::v-deep tbody tr:hover > td {
    background-color: skyblue;
  }
  .el-pagination {
    padding: 20px 0;
    padding-top: 30px;
    justify-content: center;
  }
}
</style>