<template>
  <div :style="position" class="sensor" v-on:mousedown="onMouseDown">
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
      value: 666,
    };
  },
  methods: {
    onMouseDown() {
      alert('ASD');
    },
  },
  computed: {
    value() {
      return this.$store.state.sensors[this.id].latestValue;
    },
    position() {
      // const even = this.index % 2 === 0;
      const left = ((Math.floor(this.index / 3)) % 6) * 200; // even ? 200 : 400;
      const top = (this.index % 3) * 200;
      return `left: ${left}px; top: ${top}px;`;
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
  border-radius: 8px;
  padding: 5px;
  background-color: gray;
  font-size: 20px;
}
</style>
