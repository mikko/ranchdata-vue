<template>
  <div class="dashboard">
    <div class="dash-buttons">
      <i v-if="!viewEditMode" v-on:click="viewEditClicked" class="viewEdit fa fa-cog fa-fw fa-2x"></i>
      <i v-if="viewEditMode" v-on:click="blueprintEditClicked" class="blueprintEdit fa fa-pencil-square-o fa-fw fa-2x"></i>
      <i v-if="viewEditMode" v-on:click="cancel" class="cancel fa fa-times-circle-o fa-fw fa-2x"></i>
      <i v-if="viewEditMode" v-on:click="save" class="save fa fa-check-circle-o fa-fw fa-2x"></i>
    </div>
    <Blueprint></Blueprint>
    <Sensor v-show="!blueprintDrawMode" v-for="(sensor, index) in sensors"
      :index="index"
      :unit="sensor.unit"
      :name="sensor.name"
      :id="sensor.id"
      :parentOffset="elementOffset">
    </Sensor>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { Button } from 'element-ui';

import Blueprint from './Blueprint';
import Sensor from './Sensor';
import * as MutationTypes from '../store/mutation-types';

export default {
  name: 'dashboard',
  components: {
    Sensor,
    Blueprint,
    elButton: Button,
  },
  data() {
    return {
      elementOffset: { x: 0, y: 0 },
      previousView: null,
    };
  },
  props: {
    sensors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters([
      'sensors',
      'viewEditMode',
      'blueprintDrawMode',
      'view',
    ]),
    inViewEditMode() {
      return this.viewEditMode;
    },
  },
  mounted() {
    this.elementOffset = {
      x: this.$el.getBoundingClientRect().left,
      y: this.$el.getBoundingClientRect().top,
    };
  },
  methods: {
    blueprintEditClicked() {
      this.$store.commit(MutationTypes.TOGGLE_BLUEPRINT_EDIT_MODE, { newValue: true });
    },
    viewEditClicked() {
      this.previousView = JSON.stringify(this.view); // TODO: better way to clone this object?
      this.$store.commit(MutationTypes.TOGGLE_VIEW_EDIT_MODE, { newValue: true });
    },
    cancel() {
      if (this.blueprintDrawMode) {
        this.$store.commit(MutationTypes.TOGGLE_BLUEPRINT_EDIT_MODE, { newValue: false });
        if (this.previousView !== null) {
          this.$store.commit(MutationTypes.VIEW_SET_DATA, {
            viewData: JSON.parse(this.previousView),
          });
          this.previousView = null;
        }
      } else if (this.viewEditMode) {
        if (this.previousView !== null) {
          this.$store.commit(MutationTypes.VIEW_SET_DATA, {
            viewData: JSON.parse(this.previousView),
          });
          this.previousView = null;
        }
        this.$store.commit(MutationTypes.TOGGLE_VIEW_EDIT_MODE, { newValue: false });
      }
    },
    save() {
      if (this.blueprintDrawMode) {
        this.$store.commit(MutationTypes.TOGGLE_BLUEPRINT_EDIT_MODE, { newValue: false });
      } else if (this.viewEditMode) {
        this.previousView = null;
        this.$store.commit(MutationTypes.TOGGLE_VIEW_EDIT_MODE, { newValue: false });
        this.$store.dispatch('syncBlueprint');
      }
    },
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
.dash-buttons {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
}
i {
  margin: 5px;
  flex: 1;
  align-self: flex-end;
}
.blueprint {
  padding-top: 50px;
  transform: scale(1.6);
}
.fa {
  cursor: pointer;
}
.save {
  color: lightgreen;
}
.cancel {
  color: red;
}
</style>
