<template>
  <section>
    <svg :viewBox="`0 0 ${trendWidth} ${trendHeight}`"
         :width="trendWidth"
         :height="trendHeight">
      <g class="layer">
        <!-- 数据值 -->
        <g class="data"
           :transform="`translate(20, 296)`">
          <text v-for="(item,index) in trendData"
                :x="pointTxtTrendX[index]"
                :y="pointTxtTrendY[index]"
                class="f14"
                ref="trendTxt"
                fill="#666666">{{item.count}}</text>
        </g>
        <g class="x axis"
           transform="translate(20, 296)">
          <polygon points="-5,0 4,4 4,-4"
                   style="fill:#000;stroke:#000000;stroke-width:1" />
          <polygon :points="`${(trendWidth - 35)},0 ${(trendWidth - 44)},4 ${(trendWidth - 44)},-4`"
                   style="fill:#000;stroke:#000000;stroke-width:1" />
          <!-- 设置总长度 自己规定 -->
          <line x1="0"
                y1="0"
                :x2="(trendWidth - 40)"
                y2="0"
                style="stroke:black;stroke-width:1px" />
          <!-- X轴-->
          <!-- x轴刻度值 -->
          <text v-for="(item,index) in trendData"
                :x="txtTrendX[index]"
                y="30"
                class="f14"
                fill="#666666">{{item.month}}</text>
        </g>
        <!-- 数据点、数据线 -->
        <g class="data"
           :transform="`translate(20, 296)`">
          <!-- 数据连接成线 -->
          <polyline :points="points"
                    fill="none"
                    :stroke="lineColor" />
          <!-- 数据点 -->
          <circle v-for="(item,index) in trendData"
                  r="3"
                  :cx="trendX[index]"
                  :cy="trendY[index]"
                  fill="#666666" />
        </g>
        <!-- 左右切换按钮 -->
        <g :transform="`translate(0, 296)`"
           v-if="page > 2">
          <text 
                v-if="currentPage > 1"
                x="20"
                y="30"
                fill="#333"
                class="f16 cursor"
                style="font-family: '黑体';font-weight: bold"
                @click="actionFn(1)">
            <<</text> <text
                v-if="currentPage < page"
                :x="trendWidth-35"
                y="30"
                fill="#333"
                class="f16 cursor"
                style="font-family: '黑体';font-weight: bold"
                @click="actionFn(2)">>>
          </text>
        </g>
      </g>
    </svg>
  </section>
</template>

<script>
export default {
  props: {
    trendWidth: {
      type: Number,
      default: 0,
    },
    trendHeight: {
      type: Number,
      default: 0,
    },
    lineColor: String,
    lcData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    page:{
      type: Number,
      default: 1,
    },
    currentPage:{
      type: Number,
      default: 1,
    },
  },
  created () {
    console.log("^^^^^^^^^^^^^")
  },
  mounted () {
    let vm = this;
    vm.load();
  },
  data () {
    return {
      trendX: [0, 0, 0, 0, 0, 0],
      txtTrendX: [0, 0, 0, 0, 0, 0],
      pointTxtTrendX: [0, 0, 0, 0, 0, 0],
      trendY: [0, 0, 0, 0, 0, 0],
      pointTxtTrendY: [0, 0, 0, 0, 0, 0],
      points: '',
      trendData: [0, 0, 0, 0, 0, 0]
    }
  },
  watch: {
    lcData (newVal, oldVal) {
      let vm = this;
      vm.load();
    }
  },
  methods: {
    actionFn (type) {
      let vm = this;
      vm.$emit('actionFn', type);
    },
    load () {
      let vm = this,
        trendWidth = vm.trendWidth,
        trendHeight = vm.trendHeight,
        xLen = trendWidth - 40,
        trendX = [],
        trendY = [],
        txtTrendX = [],
        pointTxtTrendX = [],
        pointTxtTrendY = [],
        maxY,
        points = [];
      vm.trendData = vm.lcData;
      console.log("^^^^^^^^^^^^^^^^^^$$$$$$$$$$")
      console.log(vm.lcData)
      /**
      * trendX：数据点x轴坐标
      * txtTrendX：x轴上年份的x轴坐标
      * pointTxtTrendX：数据值x轴坐标
      * */
      for (var i = 1; i <= 6; i++) {
        trendX.push((xLen / 6 * i) - (xLen / 6 / 2));
      }
      vm.trendX = trendX;

      for (var i = 0; i < 6; i++) {
        txtTrendX.push(trendX[i] - 27);
      }
      vm.txtTrendX = txtTrendX;
      // console.log(txtTrendX)
      vm.$nextTick(() => {
        for (var i = 0; i < 6; i++) {
          pointTxtTrendX.push(trendX[i] - (vm.$refs.trendTxt[i].getBoundingClientRect().width / 2));
        }
        vm.pointTxtTrendX = pointTxtTrendX;
      })

      /**
       * trendY：数据点y轴坐标
       * maxY: y轴数组内最大值
       * pointTxtTrendY：数据值y轴坐标 
       * tips:
       * 1、以y轴最大值为250计算各数据点的y轴值
       * */
      vm.trendData.map(item => {
        trendY.push(Number(item.count))
      });
      maxY = Math.max.apply(null, trendY);
      trendY.map((item, index) => {
        trendY.splice(index, 1, -(item / maxY * 250));
        pointTxtTrendY.push(-(item / maxY * 250) - 10);
      });
      vm.trendY = trendY;
      vm.pointTxtTrendY = pointTxtTrendY;

      /**
       * points: 数据点连接成线的坐标集合
      */
      vm.trendData.map((item, index) => {
        points.push(`${trendX[index]},${trendY[index]}`);
      });
      vm.points = points.join(' ');
    }
  }
}
</script>

<style>
</style>
