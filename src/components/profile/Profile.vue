<template>
  <div class="profile">
    <h1>Profile</h1>
    <el-row class="account">
      <el-col :span="8">
        <div class="grid-content">
          Something
          </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          Something
          </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          Something
          </div>
      </el-col>
    </el-row>
    <el-row class="sensors">
      <el-col :span="24">
        <el-row class="sensor" v-for="(sensor, index) in sensors">
          <el-col :span="7" class="sensor--name">{{ sensor.name }}</el-col>
          <el-col :span="7" class="sensor--serial">{{ sensor.serial }}</el-col>
          <el-col :span="7" class="sensor--latest">&nbsp;{{ sensor.latestValue }}</el-col>
          <el-col :span="3" class="sensor--edit">
            <i class="fa fa-pencil fa-fw"></i>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { Row, Col } from 'element-ui';

export default {
  name: 'profile',
  components: {
    'el-row': Row,
    'el-col': Col,
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
  h1 {
    height: 5%;
    margin: 0;
    margin-top: 3%;
    margin-bottom: 2%;
  }
  .profile {

  }
</style>
