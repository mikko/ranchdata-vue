<template>
  <div class="header-bar">
    <div class="title">
      <h1>Suinula ranch</h1>
      <a class="logoutlink" href="/api/v1/logout">Logout</a>
    </div>
    <div class="forecast">
      <WeatherIcon
        :temperature="forecastItem.temperature"
        :time="forecastItem.time"
        :weathersymbol3="forecastItem.weathersymbol3"
        v-for="forecastItem in weatherForecastItems">
      </WeatherIcon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WeatherIcon from './WeatherIcon';

export default {
  name: 'headerbar',
  components: {
    WeatherIcon,
  },
  computed: {
    ...mapGetters({
      weatherForecastItems: 'weatherForecastItems',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-bar {
  width: 100%;
  height: 100%;
  outline: solid 1px white;
  display: flex;
  flex-direction: row;
}
h1 {
  margin: 0;
  margin-bottom: 10px;
  padding-top: 20px;
}
.title {
  flex: 1;
}
.forecast {
  flex: 4;
  display: flex;
}
.logoutlink {
  color: white;
  text-decoration: none;
  border: 2px solid white;
  padding: 5px;
  border-radius: 5px;
}

a:visited {
  color: white;
  text-decoration: none;
}
</style>
