<template>
  <div id="app">
    <div class="layout-row header">
      <div class="layout-column header-column">
        <HeaderBar></HeaderBar>
      </div>
    </div>
    <div class="layout-row">
      <div class="layout-column column-dashboard">
        <router-view/>
        <!--<Dashboard :sensors="sensors"></Dashboard>-->
      </div>
      <div class="layout-column column-messages">
        <MessageArea></MessageArea>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from './components/header/HeaderBar';
import MessageArea from './components/messageArea/MessageArea';

export default {
  name: 'app',
  components: {
    HeaderBar,
    MessageArea,
  },
  data() {
    return {
      sensors: [],
    };
  },
  created() {
    this.$store.dispatch('initialize');
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
}
.layout-row {
  flex: 10;
  display: flex;
  flex-direction: row;
}
.layout-column {
  flex: 1;

  margin: 30px;
  background-color: rgba(120, 120, 120, 0.5);
}
.header {
  flex: 1;
  min-height: 100px;
}
.header-column {
  margin-bottom: 0px;
}
.column-sidebar {
  flex: 1;
}
.column-dashboard {
  flex: 8;
  margin-right: 0px;
}
.column-messages {
  flex: 2;
}
body {
  background-image: url('/static/image/blurred-background.jpg');
  background-size: cover;
}
</style>
