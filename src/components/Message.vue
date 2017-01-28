<template>
  <div class="message-row" :class="type">
    <div class="time col">
      {{timeString}}
    </div>
    <div class="message col">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    time: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timeString: '',
    };
  },
  computed: {
    timeString() {
      return this.time.substr(0, 16);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col {
  display: flex;
  padding: 5px;
}

.time {
  flex: 1;
}
.message {
  flex: 2;
}

.message-row {
  background-color: gray;
  display: flex;
}

.note {

}
.warning {
  background-color: red;
}
</style>
