<template>
  <div class="blueprint">

  </div>
</template>

<script>
export default {
  name: 'hello',
  props: {
    points: {
      type: Array,
      required: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.measurement {
  position: absolute;
  border: solid 1px;
  border-radius: 8px;
  padding: 5px;
}
</style>
