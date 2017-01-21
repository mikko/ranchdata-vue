<template>
  <div class="header-bar">
    <h1>Suinulan Ranch</h1>
    <a href="/api/v1/logout">Logout</a>
  </div>
</template>

<script>
export default {
  name: 'hello',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-bar {
  width: 100%;
  height: 100%;
  outline: solid 1px white;
}
h1 {
  margin: 0;
  padding-top: 20px;
}
</style>
