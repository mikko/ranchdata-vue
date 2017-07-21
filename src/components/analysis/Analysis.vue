<template>
  <div class="analysis">
    <h1>Analysis</h1>
    <Chart></Chart>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { Select } from 'element-ui';
import Chart from './Chart';

// import * as MutationTypes from '../../store/mutation-types';

export default {
  name: 'analysis',
  components: {
    elSelect: Select,
    Chart,
  },
  data() {
    return {
      dataset: {
        name: 'first',
        data: [
          {
            time: '2016-10-10T12:01:00.000Z',
            value: Math.random() * 0,
          },
          {
            time: '2016-10-10T12:02:00.000Z',
            value: Math.random() * 1,
          },
          {
            time: '2016-10-10T12:03:00.000Z',
            value: Math.random() * 2,
          },
          {
            time: '2016-10-10T12:04:00.000Z',
            value: Math.random() * 3,
          },
          {
            time: '2016-10-10T12:05:00.000Z',
            value: Math.random() * 4,
          },
          {
            time: '2016-10-10T12:06:00.000Z',
            value: Math.random() * 5,
          },
          {
            time: '2016-10-10T12:07:00.000Z',
            value: Math.random() * 6,
          },
          {
            time: '2016-10-10T12:08:00.000Z',
            value: Math.random() * 7,
          },
          {
            time: '2016-10-10T12:09:00.000Z',
            value: Math.random() * 8,
          },
          {
            time: '2016-10-10T12:10:00.000Z',
            value: Math.random() * 9,
          },
          {
            time: '2016-10-10T12:11:00.000Z',
            value: Math.random() * 10,
          },
          {
            time: '2016-10-10T12:12:00.000Z',
            value: Math.random() * 11,
          },
          {
            time: '2016-10-10T12:13:00.000Z',
            value: Math.random() * 12,
          },
          {
            time: '2016-10-10T12:14:00.000Z',
            value: Math.random() * 13,
          },
          {
            time: '2016-10-10T12:15:00.000Z',
            value: Math.random() * 14,
          },
          {
            time: '2016-10-10T12:16:00.000Z',
            value: Math.random() * 15,
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      'sensors',
    ]),
  },
  mounted() {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
