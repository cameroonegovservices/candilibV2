import { DateTime } from 'luxon'

export const getDataOfTheMonth = (month = DateTime.local().month, year = DateTime.local().year) => {
  const selectedMonth = DateTime.local(year, month).set({ day: 1 })
  const daysInMonth = selectedMonth.daysInMonth
  const lastMonth = selectedMonth.minus(1, 'month')
  const daysInPreviousMonth = selectedMonth.minus(1, 'month').daysInMonth
  const nextMonth = selectedMonth.plus(1, 'month')

  const weekdayOfFirstDay = selectedMonth.weekday
  const firstMonday = 1 + ((8 - weekdayOfFirstDay) % 7)

  const daysBefore = weekdayOfFirstDay - 1
  const daysAfter = 7 - ((daysBefore + daysInMonth) % 7)

  const lastDaysOfPreviousMonth = Array(daysBefore)
    .fill(true)
    .map((el, i) => daysInPreviousMonth - i)
    .reverse()
    .map(day => ({
      day,
      month: lastMonth.month,
      weekday: lastMonth.set({ day }).weekdayLong,
      luxon: DateTime.local({ day, month: lastMonth.month, year: lastMonth.year }),
    }))

  const daysOfSelectedMonth = Array(daysInMonth)
    .fill(true)
    .map((el, i) => i + 1)
    .map(day => ({
      day,
      month: selectedMonth.month,
      weekday: selectedMonth.set({ day }).weekdayLong,
      luxon: DateTime.local({ day, month: selectedMonth.month, year: selectedMonth.year }),
    }))

  const nextDaysOfNextMonth = Array(daysAfter)
    .fill(true)
    .map((el, i) => i + 1)
    .map(day => ({
      day,
      month: nextMonth.month,
      weekday: nextMonth.set({ day }).weekdayLong,
      luxon: DateTime.local({ day, month: nextMonth.month, year: nextMonth.year }),
    }))

  return {
    daysBefore,
    daysAfter,
    selectedMonth,
    daysInMonth,
    daysInPreviousMonth,
    weekdayOfFirstDay,
    firstMonday,
    month,
    year,
    lastDaysOfPreviousMonth,
    daysOfSelectedMonth,
    nextDaysOfNextMonth,
  }
}
