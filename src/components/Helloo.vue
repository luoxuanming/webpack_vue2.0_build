<template>
  <div class="green">{{msg}}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "子组件",
    };
  },
  created() {
   
  },
};
</script>

<style>
.green {
  color: green;
}
</style>