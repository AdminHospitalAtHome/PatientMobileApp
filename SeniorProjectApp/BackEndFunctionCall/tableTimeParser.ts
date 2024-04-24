export default function timeTableParser(dateTime: string): string {
  let tempDateObject: Date = new Date(dateTime);
  tempDateObject.setMinutes(
    tempDateObject.getMinutes() - tempDateObject.getTimezoneOffset(),
  );
  const tmpDate = tempDateObject.toISOString().split('T')[0].split('-');
  const tmpDateString = tmpDate[1] + '-' + tmpDate[2] + '-' + tmpDate[0];
  const tmpTime = tempDateObject.toISOString().split('T')[1].split(':');
  const tmpHour = parseInt(tmpTime[0], 10);
  let tmpTimeString: string;
  if (tmpHour > 12) {
    tmpTimeString = String(tmpHour - 12) + ':' + tmpTime[1] + ' PM';
  } else if (tmpHour === 0) {
    tmpTimeString = String(tmpHour + 12) + ':' + tmpTime[1] + ' AM';
  } else {
    tmpTimeString = String(tmpHour) + ':' + tmpTime[1] + ' AM';
  }
  return tmpDateString + '\n' + tmpTimeString;
}
