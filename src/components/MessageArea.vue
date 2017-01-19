<template>
  <div class="messagearea">
    <table>
      <tr style="background-color: red;">
        AUTOTALLI LÄMPÖTILA 4 astetta!
      </tr>
      <tr>
        27.12 Roska-auto <button>OK</button>
      </tr>
      <tr>
        28.12 Ilmanvaihtokoneen suodatin (edellinen 20.8.2016)
      </tr>
      <tr>
        2.2 Nuohous (edellinen 20.8.2016)
      </tr>
      <tr>
        1.6 Ruohonleikkuu (edellinen 20.8.2016)
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'hello',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messagearea {
  height: 100%;
  outline: solid 1px white;
}
</style>
