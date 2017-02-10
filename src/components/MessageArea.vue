<template>
  <div class="messagearea">
    <elButton v-if="!addMode" v-on:click="addEntryClicked">Uusi merkintä</elButton>
    <elButton v-if="addMode" v-on:click="cancelAddEntryClicked">Peruuta</elButton>
    <MessageEdit v-if="addMode"></MessageEdit>
    <div v-if="!addMode" class="messagelist">
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
import MessageEdit from './MessageEdit';
import * as MutationTypes from '../store/mutation-types';

locale.use(lang);

export default {
  name: 'messageArea',
  components: {
    DatePicker,
    elInput: Input,
    elButton: Button,
    Message,
    MessageEdit,
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
      addMode: 'journalAddMode',
    }),
  },
  methods: {
    addEntryClicked() {
      this.$store.commit(MutationTypes.TOGGLE_JOURNAL_ADD_MODE, { newValue: true });
    },
    cancelAddEntryClicked() {
      this.$store.commit(MutationTypes.TOGGLE_JOURNAL_ADD_MODE, { newValue: false });
    },
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
