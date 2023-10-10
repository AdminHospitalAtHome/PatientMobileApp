export default function getDefaultStartTime(): string {
  var startDateTimeTemp = new Date();
  startDateTimeTemp.setHours(0, 0, 0, 0);
  startDateTimeTemp.setDate(startDateTimeTemp.getDate() - 7);
  return startDateTimeTemp.toISOString();
}
