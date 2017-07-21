<template>
  <div class="chart">
    <div class="selections-wrapper">
      <elSelect v-model="selectedSensors" multiple placeholder="Select sensors">
        <elOption
          v-for="sensor in sensors"
          :key="sensor.id"
          :label="sensor.serial"
          :value="sensor.serial">
        </elOption>
      </elSelect>
      <elSelect v-model="selectedTimeframe" placeholder="Select timeframe">
        <elOption
          v-for="tf in availableTimeframes"
          :key="tf.key"
          :label="tf.label"
          :value="tf.key">
        </elOption>
      </elSelect>
    </div>
    <div ref="chart"></div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import c3 from 'c3';
import { Select, Option } from 'element-ui';
import Moment from 'moment';
import { getMeasurementSeries } from '../../util/api';

require('c3/c3.css');

// import * as MutationTypes from '../../store/mutation-types';

const refreshData = function refreshData() {
  console.log(this.selectedSensors, this.selectedTimeframe);

  const [amount, unit] = this.currentTimeframe;
  const now = new Moment();
  const begin = now.clone().subtract(amount, unit);
  console.log('sensor', this.selectedSensors);
  console.log(now.toISOString(), begin.toISOString());
  const sensor = this.selectedSensors[0];
  getMeasurementSeries(sensor, begin.toISOString(), now.toISOString())
    .then((res) => {
      console.log(res);
      this.dataPoints = res;
      console.log(this.dataPoints.length);
      this.$chart.load({
        json: this.dataPoints,
        keys: {
          x: 'measurement_time',
          value: ['value'],
        },
      });
    });
};

export default {
  name: 'chart',
  components: {
    elSelect: Select,
    elOption: Option,
  },
  data() {
    return {
      selectedSensors: [],
      selectedTimeframe: 'week',
      dataPoints: [],
      availableTimeframes: [
        {
          key: 'day',
          label: 'Day',
        },
        {
          key: 'week',
          label: 'Week',
        },
        {
          key: 'month',
          label: 'Month',
        },
        {
          key: 'year',
          label: 'Year',
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'sensors',
    ]),
    sensorData() {
      console.log('Selected sensors changed');
      return this.selectedSensors;
    },
    currentTimeframe() {
      // TODO: move elsewhere
      const timeframeToMomentVars = (tf) => {
        switch (tf) {
          case 'day':
            return [24, 'hour'];
          case 'month':
            return [1, 'month'];
          case 'year':
            return [1, 'year'];
          default:
            return [7, 'day'];
        }
      };
      return timeframeToMomentVars(this.selectedTimeframe);
    },
  },
  watch: {
    currentTimeframe: refreshData,
    selectedSensors: refreshData,
  },
  mounted() {
    this.$chart = c3.generate({
      bindto: this.$refs.chart,
      data: {
        x: 'x',
        xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
        json: [],
        keys: {
          x: 'measurement_time',
          value: ['value'],
        },
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d',
          },
        },
      },
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
