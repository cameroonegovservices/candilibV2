import { getDataOfTheMonth } from './calendar'

describe('calendar', () => {
  it('Should return 7', () => {
    const dataOfTheMonth = getDataOfTheMonth(1, 2019)

    expect(dataOfTheMonth.firstMonday).toBe(7)
    expect(dataOfTheMonth.daysInMonth).toBe(31)
  })

  it('Should return 4', () => {
    const dataOfTheMonth = getDataOfTheMonth(2, 2019)
    expect(dataOfTheMonth.firstMonday).toBe(4)
  })

  it('Should return 1', () => {
    const { firstMonday } = getDataOfTheMonth(4, 2019)
    expect(firstMonday).toBe(1)
  })

  it('Should return 31', () => {
    const { daysInPreviousMonth } = getDataOfTheMonth(1, 2019)
    expect(daysInPreviousMonth).toBe(31)
  })

  it('Should return 29', () => {
    const { daysInPreviousMonth } = getDataOfTheMonth(3, 2016)
    expect(daysInPreviousMonth).toBe(29)
  })
})
