export function parseWeightData(weightJson) {
  let weightArr = []
  for (var i = 0; i<weightJson.length; i++) {
    var tmpDate = weightJson[i].DateTimeTaken.split('T')[0].split('-')
    
    const tmpDateString = tmpDate[1] + '-' + tmpDate[2] + '-' + tmpDate[0]

    var tmpTime = weightJson[i].DateTimeTaken.split('T')[1].split(':')
    var tmpHour = parseInt(tmpTime[0])
    var tmpTimeString = ''
    if (tmpHour > 12) {
      tmpTimeString = String(tmpHour-12) + ":" + tmpTime[1] + " PM"
    } else {
      tmpTimeString = String(tmpHour) + ":" + tmpTime[1] + " AM"
    }

    weightArr.push([tmpDateString,tmpTimeString,weightJson[i].WeightInPounds])
  }
  return weightArr;
}

export function getDefaultStartTime() {
    var startDateTimeTemp = new Date()
    startDateTimeTemp.setHours(0,0,0,0)
    startDateTimeTemp.setDate(startDateTimeTemp.getDate() - 7)
    return startDateTimeTemp.toISOString()
  }