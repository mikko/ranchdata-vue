<template>
  <div v-on:drag="onDrag" :style="position" class="sensor">
    <div class="sensor-name">{{ name }}</div>
    {{ value }}&nbsp;{{ unit }}
  </div>
</template>

<script>
export default {
  name: 'sensor',
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
      xCoord: 200,
      yCoord: 200,
    };
  },
  methods: {
    onDrag(e) {
      if (e.clientX === 0) {
        return;
      }
      this.xCoord = e.clientX;
      this.yCoord = e.clientY;
      console.log(e.clientX, e.clientY);
    },
  },
  computed: {
    value() {
      const newValue = this.$store.state.sensors[this.id].latestValue;
      return newValue === undefined ? '' : newValue.toFixed(2);
    },
    xCoord() {
      return ((Math.floor(this.index / 3)) % 6) * 200;
    },
    yCoord() {
      return ((this.index % 3) * 200) + 100;
    },
    position() {
      return `left: ${this.xCoord}px; top: ${this.yCoord}px;`;
    },
  },
  created() {
    /*
    const updateValue = () => {
      this.$http.get(`${document.location.origin}/api/v1/measurements/latest/${this.id}`)
        .then((measurementResponse) => {
          this.value = measurementResponse.body.value;
        });
    };
    updateValue();
    */
    // setInterval(updateValue, 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sensor {
  position: absolute;
  border: solid 1px;
  border-radius: 4px;
  padding: 2px;
  background-color: gray;
  font-size: 15px;
  user-select: none;
  cursor: default;
}
</style>
