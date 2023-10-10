export default function getDefaultStartTime(): String {
  var startDateTimeTemp = new Date();
  startDateTimeTemp.setHours(0, 0, 0, 0);
  startDateTimeTemp.setDate(startDateTimeTemp.getDate() - 7);
  return startDateTimeTemp.toISOString();
}
