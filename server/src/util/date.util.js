import { DateTime } from 'luxon'

export const FORMAT_DATE = 'cccc dd LLLL yyyy'

export const ZONE_LOCAL = 'Europe/Paris'

export const getDateTimeFrFromJSDate = date =>
  DateTime.fromJSDate(date, { locale: 'fr', zone: ZONE_LOCAL })

/**
 *
 * @param {*} datetime Type DateTime of luxon
 */
export const dateTimeToFormatFr = pDate => {
  let datetime

  if (pDate instanceof DateTime) {
    datetime = pDate.setLocale('fr').setZone(ZONE_LOCAL)
  } else if (pDate instanceof Date) {
    datetime = getDateTimeFrFromJSDate(pDate)
  }

  const date = datetime.toFormat(FORMAT_DATE)

  const hour = datetime.toLocaleString(DateTime.TIME_24_SIMPLE)

  return {
    date,
    hour,
  }
}
