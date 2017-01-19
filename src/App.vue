<template>
  <div id="app">
    <div class="layout-row header">
      <div class="layout-column">
        <HeaderBar></HeaderBar>
      </div>
    </div>
    <div class="layout-row">
      <!--
      <div class="layout-column column-sidebar">
        <ConfigSidebar></ConfigSidebar>
      </div>
      -->
      <div class="layout-column column-dashboard">
        <Dashboard :sensors="sensors"></Dashboard>
      </div>
      <div class="layout-column column-messages">
        <MessageArea></MessageArea>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigSidebar from './components/ConfigSidebar';
import Dashboard from './components/Dashboard';
import HeaderBar from './components/HeaderBar';
import MessageArea from './components/MessageArea';

export default {
  name: 'app',
  components: {
    ConfigSidebar,
    Dashboard,
    HeaderBar,
    MessageArea,
  },
  data() {
    return {
      sensors: [],
    };
  },
  created() {
    const credentials = {
      username: 'firstUser',
      password: 'somepassword',
    };
    this.$http.post(`${document.location.origin}/api/v1/login`, credentials)
      .then(() => {
        this.$http.get(`${document.location.origin}/api/v1/sensors`)
          .then((sensorResponse) => {
            console.log(sensorResponse.body);
            this.sensors = sensorResponse.body;
          });
      });
  },
};
</script>

<style>

html, body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  background-color: #2d2d2d;
}
.layout-row {
  flex: 10;
  display: flex;
  flex-direction: row;
}
.layout-column {
  flex: 1;
}
.header {
  flex: 1;
}
.column-sidebar {
  flex: 1;
}
.column-dashboard {
  flex: 16;
}
.column-messages {
  flex: 6;
}
</style>
