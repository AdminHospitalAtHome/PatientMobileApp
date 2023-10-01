export default function getDefaultStartTime(): String {
  var startDateTimeTemp = new Date();
  startDateTimeTemp.setHours(0, 0, 0, 0);
  startDateTimeTemp.setDate(startDateTimeTemp.getDate() - 7);
  return startDateTimeTemp.toISOString();
}

export function getNDaysAgo(n: number): String {
  let date: Date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - n);
  return date.toISOString();
}
