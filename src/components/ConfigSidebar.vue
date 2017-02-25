<template>
  <div class="config-sidebar">
    <Sensor :value="12.0"
                 :x="10"
                 :y="120"
                 :unit="'kPa'">
    </Sensor>
  </div>
</template>

<script>
import Sensor from './Sensor';

export default {
  components: {
    Sensor,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.config-sidebar {
  height: 100%;
  outline: solid 1px white;
}
</style>
