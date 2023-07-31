<template>
  <div>
    {{ data }}
    <button @click="data++">123</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 0
    }
  },
  created() {
    console.log('test')
  }
}
</script>

<style>

</style>