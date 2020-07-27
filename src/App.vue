<template>
  <div>
    <span class="example">
      {{ msg }}
      <div class="sub-example">sub-message</div>
    </span>
    <Helloo></Helloo>
    <LineChartCom 
    :trendWidth="500" 
    :trendHeight="800" 
    :lineColor="'yellow'" 
    :page="5" 
    :currentPage="currentPage" 
    :lcData="[{count:10},{count:20},{count:30},{count:40},{count:50},{count:60}]"
    @actionFn="lineChartActionFn"
    ></LineChartCom>
  </div>
</template>

<script>
import Helloo from "./components/Helloo.vue";
import LineChartCom from "./components/LineChartCom/index.vue";
import {sum} from "./assets/js/sum.js"
export default {
  data() {
    return {
      msg: "Hello world!",
      currentPage:2
    };
  },
  components: {
    Helloo,
    LineChartCom
  },
  created() {
    console.log(sum(1,2))
  },
  methods: {
    lineChartActionFn(type) {
      console.log(type)
      if(type===2) {
        this.currentPage++
      } else {
        this.currentPage--
      }
        console.log(this.currentPage)

      // this.currentPage++
      // console.log(this.type)
    }
  }
};
</script>

<style scoped lang="less">
.example {
  color: red;
  .sub-example {
    color: yellow;
  }
}

</style>>
