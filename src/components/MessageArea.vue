<template>
  <div class="messagearea">
    <div class="addentry">
      <div class="col datepicker">
        <DatePicker v-model="newEntryDate" type="date" placeholder="Päivämäärä" :picker-options="pickerOptions"></DatePicker>
      </div>
      <div class="col input">
        <elInput v-model="newEntryMessage" placeholder="Merkintä"></elInput>
      </div>
      <div class="col button">
        <elButton>Lisää</elButton>
      </div>
    </div>
    <div class="messagelist">
      <Message v-for="message in messages"
               :time="message.time"
               :message="message.entry"
               :type="message.type"></Message>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { DatePicker, Input, Button } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/fi';
import locale from 'element-ui/lib/locale';
import Message from './Message';

locale.use(lang);

export default {
  name: 'messageArea',
  components: {
    DatePicker,
    elInput: Input,
    elButton: Button,
    Message,
  },
  data() {
    return {
      pickerOptions: {
        firstDayOfWeek: 1,
      },
      newEntryDate: '',
      newEntryMessage: '',
    };
  },
  computed: {
    ...mapGetters({
      messages: 'allMessages',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messagearea {
  height: 100%;
  outline: solid 1px white;
}
.messagelist {
  display: flex;
  flex-direction: column;
}
.addentry {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.col {

}
.datepicker {
  flex: 1;
}
.input {
  flex: 3;
}
.button {
  flex: 1;
}
</style>
