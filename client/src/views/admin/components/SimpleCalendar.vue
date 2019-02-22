<template>
  <div class="calendar-month">
    <div class="calendar-weekday" v-for="weekday in weekdays" :key="weekday">
      <span>{{weekday}}</span>
    </div>
    <div class="calendar-day" v-for="(day, i) in days" :key="i">
      <span>{{day.date}}</span>
    </div>
  </div>
</template>

<script>
import { getDataOfTheMonth } from '@/util'

const weekdays = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
]

export default {
  props: {
    places: Array,
  },

  data () {
    return {
      weekdays: weekdays,
      month: getDataOfTheMonth(),
      days: [],
    }
  },

  mounted () {
    this.updateCalendar()
  },

  methods: {
    updateCalendar () {
      const { lastDaysOfPreviousMonth, daysOfSelectedMonth, nextDaysOfNextMonth } = getDataOfTheMonth()

      this.days = [
        ...lastDaysOfPreviousMonth,
        ...daysOfSelectedMonth,
        ...nextDaysOfNextMonth,
      ]
    },
  },
}
</script>

<style lang="css" scoped>
.calendar-month {
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
}

.calendar-day {
  flex-basis: 14%;
  flex-grow: 1;
  flex-shrink: 0;
  height: 10em;
  border-width: 0 1px 1px 0;
  border-color: #bbb;
  border-style: solid;
}

.calendar-weekday {
  flex-basis: 14%;
  flex-grow: 1;
  flex-shrink: 0;
  border-width: 0 1px 1px 0;
  border-color: #bbb;
  border-style: solid;
}
</style>
