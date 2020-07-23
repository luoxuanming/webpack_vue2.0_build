<template>
  <div id="app">
    <span class="example">
      {{ msg }}
    </span>
    <Helloo></Helloo>
  </div>
</template>

<script>
import Helloo from './components/Helloo.vue'
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  },
  components: {
    Helloo
  }
}
</script>

<style>
.example {
  color: red;
}
</style>