export default function timeTableParser(dateTime: string): string {
  var tempDateObject: Date = new Date(dateTime);
  tempDateObject.setMinutes(
    tempDateObject.getMinutes() - tempDateObject.getTimezoneOffset(),
  );
  var tmpDate = tempDateObject.toISOString().split('T')[0].split('-');
  const tmpDateString = tmpDate[1] + '-' + tmpDate[2] + '-' + tmpDate[0];
  var tmpTime = tempDateObject.toISOString().split('T')[1].split(':');
  var tmpHour = parseInt(tmpTime[0]);
  var tmpTimeString = '';
  if (tmpHour > 12) {
    tmpTimeString = String(tmpHour - 12) + ':' + tmpTime[1] + ' PM';
  } else if (tmpHour === 0) {
    tmpTimeString = String(tmpHour + 12) + ':' + tmpTime[1] + 'AM';
  } else {
    tmpTimeString = String(tmpHour) + ':' + tmpTime[1] + ' AM';
  }
  const finalString = tmpDateString + '\n' + tmpTimeString;
  return finalString;
}
