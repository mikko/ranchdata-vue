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
      <elDatePicker
        v-if="selectedTimeframe === 'day'"
        v-model="selectedDate"
        type="date"
        key="datepicker-date"
        placeholder="Pick a date"
        :picker-options="pickerOptions">
      </elDatePicker>
      <elDatePicker
        v-if="selectedTimeframe === 'week'"
        v-model="selectedWeek"
        type="week"
        key="datepicker-week"
        format="Week WW"
        placeholder="Pick a week"
        :picker-options="pickerOptions">
      </elDatePicker>
      <elDatePicker
        v-if="selectedTimeframe === 'month'"
        v-model="selectedMonth"
        type="month"
        key="datepicker-month"
        placeholder="Pick a month"
        :picker-options="pickerOptions">
      </elDatePicker>
      <elDatePicker
        v-if="selectedTimeframe === 'year'"
        v-model="selectedYear"
        type="year"
        key="datepicker-year"
        placeholder="Pick a year"
        :picker-options="pickerOptions">
      </elDatePicker>

    </div>
    <div ref="chart" class="chart-container"></div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import c3 from 'c3';
import { DatePicker, Select, Option } from 'element-ui';
import Moment from 'moment';
import { getMeasurementSeries } from '../../util/api';

require('c3/c3.css');

// import * as MutationTypes from '../../store/mutation-types';

const refreshData = function refreshData() {
  const [amount, unit] = this.currentTimeframe;
  const now = new Moment();
  const begin = now.clone().subtract(amount, unit);
  const measurementPromises = this.selectedSensors.map(s =>
    getMeasurementSeries(s, begin.toISOString(), now.toISOString()));

  Promise.all(measurementPromises)
    .then((sensorDatas) => {
      const dataPoints = sensorDatas.map(s => s.map(item => item.value));
      const timeStamps = sensorDatas.map(s => s.map(item => item.measurement_time));
      const xLabels = sensorDatas.map(s => `x_${s[0].serial}`);

      const xs = {};
      sensorDatas.forEach((s, i) => (xs[s[0].serial] = xLabels[i]));

      const chartData = {
        columns: [
          ...sensorDatas.map((s, i) => [s[0].serial, ...dataPoints[i]]),
          ...xLabels.map((x, i) => [x, ...timeStamps[i]]),
        ],
        xs,
      };
      this.$chart.load(chartData);
    });
};

export default {
  name: 'chart',
  components: {
    elSelect: Select,
    elOption: Option,
    elDatePicker: DatePicker,
  },
  data() {
    return {
      selectedSensors: [],
      selectedTimeframe: 'week',
      selectedDate: '',
      selectedWeek: '',
      selectedMonth: '',
      selectedYear: '',
      dataPoints: [],
      pickerOptions: {
        firstDayOfWeek: 1,
      },
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
        // x: 'x',
        xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
        json: [],
        // keys: {
        //   x: 'measurement_time',
        //   value: ['value'],
        // },
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
  .chart {
    height: 100%;
  }
  .chart-container {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    height: 90%;
  }
  .selections-wrapper: 10%;
</style>
