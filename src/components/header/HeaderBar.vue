<template>
  <div class="header-bar">
    <div class="navigation">
      <!--
      <a class="logoutlink" href="/api/v1/logout">Logout</a>
      -->
      <div class="page-menu">
        <div class="page-icon selected">
          <router-link to="dashboard" tag="i" class="fa fa-tachometer fa-fw fa-2x"></router-link>
        </div>
        <div class="page-icon">
          <router-link to="analysis" tag="i" class="fa fa-bar-chart fa-fw fa-2x"></router-link>
        </div>
        <div class="page-icon">
          <router-link to="journal" tag="i" class="fa fa-book fa-fw fa-2x"></router-link>
        </div>
      </div>
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
  display: flex;
  flex-direction: row;
}
h1 {
  margin: 0;
  padding-top: 10px;
  font-size: 20px;
  flex: 1;
}
.navigation {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.page-menu {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.page-icon {
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
.fa {
  cursor: pointer;
}
.selected {
  color: #333333;
}
</style>
