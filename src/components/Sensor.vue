<template>
  <div :style="position" class="sensor">
    <div class="sensor-name">{{ name }}</div>
    {{ value }}&nbsp;{{ unit }}
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: {
    index: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: 666,
    };
  },
  computed: {
    position() {
      return `left: 200px; top: ${100 + (this.index * 100)}px;`;
    },
  },
  created() {
    const updateValue = () => {
      this.$http.get(`${document.location.origin}/api/v1/measurements/latest/${this.id}`)
        .then((measurementResponse) => {
          this.value = measurementResponse.body.value;
        });
    };
    setInterval(updateValue, 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sensor {
  position: absolute;
  border: solid 1px;
  border-radius: 8px;
  padding: 5px;
  background-color: gray;
  font-size: 30px;
}
</style>
