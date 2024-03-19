import timeTableParser from './tableTimeParser';

export function getSpirometry(
  patientID: number,
  startDateTime: string,
  stopDateTime: string,
) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getSpirometry?patientID=${patientID}&startDateTime=${startDateTime}&stopDateTime=${stopDateTime}`,
  )
    .then(response => response.json())
    .then(json => parseSpirometryData(json));
}

export function getRecentSpirometry(spirometryData: any[][]): string {
  if (spirometryData.length === 0) {
    return 'N/A';
  }
  return `${spirometryData[spirometryData.length - 1][1]} L`;
}

// Sets the data to the format used by our application (includes FEV1 and FEV1/FVC
export function parseSpirometryData(spirometryJson: any) {
  let spirometryArr = [];
  for (let i = 0; i < spirometryJson.length; i++) {
    spirometryArr.push([
      timeTableParser(spirometryJson[i].DateTimeTaken),
      spirometryJson[i].FEV1InLiters,
      spirometryJson[i].FEV1_FVCInPercentage,
    ]);
  }
  return spirometryArr;
}

// Strips FEV1/FVC because we do not want that value for the Chart, only the table
export function parseSpirometryForChart(spirometryArr: any[][]) {
  let newSpirometryArr = [];
  for (let i = 0; i < spirometryArr.length; i++) {
    newSpirometryArr.push([spirometryArr[i][0], spirometryArr[i][1]]);
  }
  return newSpirometryArr;
}
