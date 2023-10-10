// export function getAccessbilityMode(patientID: number): Promise<boolean> {
//   return fetch(
//     `https://hosptial-at-home-js-api.azurewebsites.net/api/getAccessbilityMode?patientID=${patientID}`,
//   ).then(response => response.bodyUsed);
// }

export function setAccessbilityMode(patientID: number, mode: boolean) {}

export function getAccessibilityMode(patientID: number) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getAccessbilityMode?patientID=${patientID}`,
  ).then(response => response.json());
}
