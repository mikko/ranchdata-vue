<template>
  <div class="dashboard">
    <div class="blueprint">
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <g style="display:inline" id="layer2">
          <path
            id="path3355"
            d="m 62.142857,115.21935 598.571433,0 0,236.42857 -132.14286,0 0,37.14286 -469.285716,0 z"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3357"
            d="m 61.428571,268.79078 160.714289,0 0.17857,120.17856"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3359"
            d="m 305.71429,389.16586 0,-122.51794 90,0 0,121.55112"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3361"
            d="m 432.14286,389.12254 0,-122.6405 -37.01288,0.25254"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3363"
            d="m 483.48477,313.79078 -88.35479,0"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3365"
            d="m 483.57143,388.07649 0,-272.85714"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3367"
            d="m 483.18891,235.68109 44.6608,-0.25254"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3369"
            d="m 528.09481,180.72443 c -26.94379,0.3708 -36.69366,0.30111 -44.40455,0.3788"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3371"
            d="m 397.85714,115.21935 0,151.42857"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3373"
            d="m 397.02031,227.3622 -85.59174,0"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3375"
            d="m 235,114.50506 0,114.28572"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3377"
            d="m 527.67639,114.84426 0.25254,273.81653"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3379"
            d="m 146.42857,269.1733 0,119.97462"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3381"
            d="m 305.83683,325.93363 -37.2654,0 0,62.97969"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3383"
            d="m 397.85714,196.64792 86.21193,0"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
          <path
            id="path3385"
            d="m 527.97226,184.96681 131.31345,0.25254"
            style="fill:none;fill-rule:evenodd;stroke:darkgray;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" />
        </g>
      </svg>

    </div>
    <Sensor v-for="(sensor, index) in sensors"
      :index="index"
      :unit="sensor.unit"
      :name="sensor.name"
      :id="sensor.id">
    </Sensor>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Sensor from './Sensor';

export default {
  name: 'dashboard',
  components: {
    Sensor,
  },
  props: {
    sensors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      sensors: 'sensors',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard {
  height: 100%;
  position: relative;
  outline: solid 1px white;
}
.blueprint {
  padding-top: 50px;
  transform: scale(1.6);
}
</style>
