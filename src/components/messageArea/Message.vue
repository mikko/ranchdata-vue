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
import moment from 'moment';

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
  computed: {
    timeString() {
      return moment(this.time).format('D.M.Y');
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
  color: white;
  text-align: left;
}

.message-row {
  background-color: #555555;
  display: flex;
  margin: 10px;
  border: solid 1px;
  border-radius: 4px;
  padding: 5px;
}

.note {

}
.warning {
  background-color: red;
}
</style>
