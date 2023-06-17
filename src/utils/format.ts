import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export default function formatUTC(UTCstring: string, format: string = 'YY-MM-DD HH:mm:ss') {
  const resultUTC = dayjs.utc(UTCstring).utcOffset(8).format(format)
  return resultUTC
}
