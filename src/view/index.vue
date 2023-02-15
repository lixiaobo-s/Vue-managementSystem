<template>
  <div class="indexmain">
    <el-row>
      <el-col :span="24"><h1>后台数据大全</h1></el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="mpie" ref="pie"></div>
      </el-col>
      <el-col :span="12">
        <div class="bar" ref="bar"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="mapCQ" ref="Mmap"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang='ts'>
import * as echarts from "echarts";
import api from "@/api/index";
import { onMounted, ref } from "vue";
const pie = ref<HTMLElement | null>(null);
const Mmap = ref<HTMLElement | null>(null);
const bar = ref<HTMLElement | null>(null);
async function mapCQ() {
  // 初始化
  let map = echarts.init(Mmap.value as unknown as HTMLDivElement, "dark");
  map.showLoading();
  //获取数据
  const res = await api.getMapInfo();
  const info = await api.CQMapInfo();
  map.hideLoading();
  //注册地图
  echarts.registerMap("CQ", res.data);
  let option = {
    //提示框
    tooltip: {
      trigger: "item",
      //显示的位置
      // position: ["50%", "50%"],
      //提示框展示的背景颜色
      backgroundColor: "rgba(0,0,0,1)",
      borderColor: "rgba(255,255,255,1)",
      //文本显示的字体样式
      textStyle: {
        color: "#ffff",
      },
      //修改提示款的大小
      extraCssText: "width:160px;height:40px",
    },
    visualMap: {
      min: 100,
      max: 1200,
      realtime: false,
      calculable: true,
      inRange: {
        color: ["lightskyblue", "yellow", "orangered"], //设置地图颜色级
      },
    },

    series: [
      {
        name: "重庆地图",
        type: "map",
        zoom: 1.2,
        roam: true, //地图缩放
        map: "CQ", //与上面注册的名字保持一致
        label: {
          show: true,
          // 模块的字体设置
          textStyle: {
            color: "rgb(250,250,250)", //更改地图的字体颜色
          },
          //鼠标移入的颜色
          emphasis: {
            color: "#43d0d6",
          },
        },
        //模块的颜色设置
        itemStyle: {
          // normal: {
          //   // color: "red", //颜色
          // },
          emphasis: {
            borderColor: "#fff",
            borderWidth: 1,
            //模块颜色
            areaColor: "rgb(0,0,0)",
          },
        },

        // 数据
        data: info.data.data,
      },
    ],
  };
  map.setOption(option);
}
function echa() {
  let mypie = echarts.init(pie.value as unknown as HTMLDivElement);
  mypie.setOption({
    //标题
    title: {
      text: "ECharts 入门示例",
      //   show: false, //是否展示标题 默认true
      //标题的样式
      textStyle: {
        color: "red", //指定颜色
        fontStyle: "italic", //字体颜色
        fontWeight: "bold", //字体的粗细
      },
      //标题的位置
      textAlign: "left",
      //设置标题距离左上右下的位置
      //   left: "150",
      //   top: "",
      //   right: "",
      //   bottom: "",
    },
    //表格
    grid: {
      show: true,
      backgroundColor: "rgba(176,58,91,0.5)", //网格背景颜色
      borderColor: "rgb(90,235,125)", //表格边框位置
    },
    tooltip: {
      trigger: "item",
    },

    //   x轴
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"], //数据栏
      //   show: false, //是否展示
    },
    // y轴
    yAxis: {},
    //   工具栏
    toolbox: {
      feature: {
        saveAsImage: {}, //保存图片
      },
    },
    series: [
      {
        name: "销量",
        type: "line", //类型，line bar pie
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
}
function echa2() {
  let myBar = echarts.init(bar.value as unknown as HTMLDivElement);
  let option = {
    title: {
      text: "饼图",
      textStyle: {
        color: "#fff",
      },
      left: "48%",
    },
    legend: {
      top: "bottom",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {},
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        // radius: [50, 250],
        // center: ["50%", "50%"],
        // roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: "rose 1" },
          { value: 38, name: "rose 2" },
          { value: 32, name: "rose 3" },
          { value: 30, name: "rose 4" },
          { value: 28, name: "rose 5" },
          { value: 26, name: "rose 6" },
          { value: 22, name: "rose 7" },
          { value: 18, name: "rose 8" },
        ],
      },
    ],
  };
  myBar.setOption(option);
}
onMounted(() => {
  echa();
  mapCQ();
  echa2();
});
</script>
<style lang='scss' scoped>
.indexmain {
  height: 100%;
  width: 100%;
  background-color: rgb(16, 12, 42);
  h1 {
    text-align: center;
    font-size: 25px;
    padding: 10px 0;
  }
  .mpie,
  .bar {
    width: 100%;
    height: 300px;
  }

  .mapCQ {
    width: 100%;
    height: 500px;
  }
}
</style>