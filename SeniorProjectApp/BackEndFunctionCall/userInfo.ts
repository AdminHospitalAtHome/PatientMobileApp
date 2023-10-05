export default function getAccessbilityMode(
  patientID: number,
): Promise<boolean> {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getAccessbilityMode?patientID=${patientID}`,
  ).then(response => response.bodyUsed);
}


export function setAccessbilityMode(patientID: number, mode: boolean){

}
