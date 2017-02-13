<template>
  <div v-if="storedVisibility || showConfigBar" :style="storedPosition" :class="sensorClass">
    <div v-show="showConfigBar" class="config-bar">
      <i v-on:drag="onDrag" v-on:dragstart="hideDragImage" v-on:dragend="moveEnd" draggable class="fa fa-arrows"></i>
      <i v-show="storedVisibility" class="fa fa-eye" v-on:click="toggleVisibility"></i>
      <i v-show="!storedVisibility" class="fa fa-eye-slash" v-on:click="toggleVisibility"></i>
    </div>
    <div class="sensorbody">
      <div class="sensor-name">{{ name }}</div>
      {{ value }}&nbsp;{{ unit }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as MutationTypes from '../store/mutation-types';

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
    parentOffset: {
      type: Object,
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
      const newXCoord = e.clientX - this.parentOffset.x;
      const newYCoord = e.clientY - this.parentOffset.y;
      this.$store.commit(MutationTypes.VIEW_SET_SENSOR_POSITION, {
        sensorId: this.id,
        x: newXCoord,
        y: newYCoord,
      });
    },
    hideDragImage(e) {
      const emptyEl = document.createElement('div');
      emptyEl.style.display = 'none';
      e.dataTransfer.setDragImage(emptyEl, 0, 0);
    },
    toggleVisibility() {
      this.visible = !this.visible;
      this.$store.commit(MutationTypes.VIEW_SET_SENSOR_VISIBILITY, {
        sensorId: this.id,
        newVisibility: this.visible,
      });
      this.$store.dispatch('syncBlueprint');
    },
    moveEnd() {
      this.$store.dispatch('syncBlueprint');
    },
  },
  computed: {
    ...mapGetters([
      'viewSensors',
      'viewEditMode',
    ]),
    value() {
      const newValue = this.$store.state.sensors[this.id].latestValue;
      return newValue === undefined ? '' : newValue.toFixed(2);
    },
    sensorClass() {
      return {
        sensor: true,
        hidden: !this.storedVisibility,
      };
    },
    storedVisibility() {
      if (this.viewSensors[this.id] === undefined) {
        return true;
      }
      return this.viewSensors[this.id].visible;
    },
    storedPosition() {
      if (this.viewSensors[this.id] === undefined) {
        return 'left: 100px; top: 100px;';
      }
      const position = this.viewSensors[this.id];
      return `left: ${position.x}px; top: ${position.y}px;`;
    },
    position() {
      return `left: ${this.xCoord}px; top: ${this.yCoord}px;`;
    },
    showConfigBar() {
      return this.viewEditMode;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sensor {
  position: absolute;
  font-size: 15px;
  user-select: none;
  cursor: default;
}
.sensorbody {
  border: solid 1px;
  border-radius: 4px;
  padding: 2px;
  background-color: gray;
}
.config-bar {
  position: absolute;
  top: -16px;
  border: solid 1px;
  border-radius: 4px;
  background-color: #555555;
  width: 50%;
  display: flex;
  flex-direction: row;
}
i {
  flex: 1;
}
.hidden {
  opacity: 0.5;
}
</style>
