<template>
  <div class="messageedit">
    <div class="row entrytype">
      <span class="label half">Merkinnän tyyppi</span>
      <div class="half">
        <elSelect v-model="newEntryType" placeholder="Valitse merkinnän tyyppi">
          <elOption v-for="entryType in types"
            :label="entryType.label"
            :value="entryType.value">
          </elOption>
        </elSelect>
      </div>
    </div>
    <div class="row datepicker">
      <span class="label">{{ dateLabel }}</span>
      <div class="half">
        <DatePicker v-model="newEntryDate" type="date" placeholder="Päivämäärä" :picker-options="pickerOptions"></DatePicker>
      </div>
    </div>
    <div v-show="newEntryType === 'CHORE'" class="row recurring">
      <span class="label">Toistuvuus</span>
      <div class="half">
        <elSelect v-model="newEntryRecurrence">
          <elOption v-for="recurrence in recurrenceOptions"
                    :label="recurrence.label"
                    :value="recurrence.value">
          </elOption>
        </elSelect>
      </div>
    </div>
    <div v-show="newEntryRecurrence !== 'NONE'" class="row recurrence-details">
      <div class="half">
        <elInputNumber v-model="recurrenceInterval" placeholder="1" :min="recurrenceMin" :max="recurrenceMax"></elInputNumber>
      </div>
      <div class="half recurrence-details-text">
        {{recurrenceDetailsText}}
      </div>
    </div>
    <div class="row input">
      <span class="label">Merkintä</span>
      <div class="half"></div>
    </div>
    <div class="row">
      <div class="half">
        <elInput v-model="newEntryMessage" placeholder="Leikkaa nurmikko"></elInput>
      </div>
    </div>
    <div class="row button">
      <div class="savebutton">
        <elButton>Tallenna</elButton>
      </div>
    </div>
    <div class="entry-preview">
      <div class="preview-message">
        {{ newEntryMessage }}
      </div>
      <div class="preview-schedule">
        {{ previewSchedule }}
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Checkbox, DatePicker, Input, InputNumber, Option, Select } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/fi';
import locale from 'element-ui/lib/locale';
import moment from 'moment';

locale.use(lang);

export default {
  name: 'messageArea',
  components: {
    DatePicker,
    elInput: Input,
    elButton: Button,
    elSelect: Select,
    elOption: Option,
    elCheckbox: Checkbox,
    elInputNumber: InputNumber,
  },
  computed: {
    previewSchedule() {
      const selectedRecurrence = this.recurrenceOptions
        .find(option => option.value === this.newEntryRecurrence);

      const detailText = selectedRecurrence.detailText || '';

      const recurrenceDetailText = this.recurrenceInterval === 1 ?
        detailText.charAt(0).toUpperCase() + detailText.slice(1) :
        selectedRecurrence.detailText;

      const previewInterval = this.recurrenceInterval !== 1 ? this.recurrenceInterval : '';

      const recurrenceText = selectedRecurrence.detailText !== undefined ?
        `${previewInterval} ${recurrenceDetailText} alkaen ` : '';

      return `${recurrenceText} ${this.momentDate.format('D.M.Y')}`;
    },
    momentDate() {
      return moment(this.newEntryDate);
    },
    recurrenceDetailsText() {
      const selectedOption = this.recurrenceOptions
        .find(option => option.value === this.newEntryRecurrence);
      return selectedOption.detailText;
    },
    recurrenceMin() {
      return 1;
    },
    recurrenceMax() {
      const selectedOption = this.recurrenceOptions
        .find(option => option.value === this.newEntryRecurrence);
      if (selectedOption.max === undefined) {
        return 1;
      }
      return selectedOption.max;
    },
    dateLabel() {
      return this.newEntryType !== 'CHORE' ? 'Päivämäärä' : 'Päivämäärä alkaen';
    },
  },
  data() {
    return {
      pickerOptions: {
        firstDayOfWeek: 1,
      },
      types: [
        {
          label: 'Muistiinpano',
          value: 'NOTE',
        },
        {
          label: 'Huoltomuistutus',
          value: 'CHORE',
        },
      ],
      recurrenceOptions: [
        {
          label: 'Ei toistu',
          value: 'NONE',
        },
        {
          label: 'Toistuu viikoittain',
          value: 'WEEKLY',
          max: 52,
          detailText: 'viikon välein',
        },
        {
          label: 'Toistuu kuukausittain',
          value: 'MONTHLY',
          max: 12,
          detailText: 'kuukauden välein',
        },
        {
          label: 'Toistuu vuosittain',
          value: 'YEARLY',
          max: 5,
          detailText: 'vuoden välein',
        },
      ],
      newEntryDate: new Date(),
      newEntryMessage: '',
      newEntryType: '',
      newEntryRecurrence: 'NONE',
      recurrenceInterval: 1,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messageedit {
  height: 100%;
  outline: solid 1px white;
  color: white;
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.half {
  flex: 1;
  margin: 10px;
}
.recurrence-details {
  display: flex;
  flex-direction: row;
}
.recurrence-details-text {
  height: 100%;
  margin-top: auto;
}
.label {
  flex: 1;
  height: 100%;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  margin-right: 10px;
  text-align: left;
}
.savebutton {
  margin-left: auto;
  margin-right: 10px;
}

.entry-preview {
  margin: 20px;
  padding: 10px;
  border: 1px solid white;
}

.preview-message {
  font-size: 20px;
  font-weight: bold;
}

.preview-schedule {
  font-size: 20px;
}
</style>
