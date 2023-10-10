export function setAccessibilityMode(patientID: number, mode: boolean) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/setAccessibilityMode?PatientID=${patientID}&IfAccessibilityMode=${mode}`,
  );
}

export function getAccessibilityMode(patientID: number) {
  return fetch(
    `https://hosptial-at-home-js-api.azurewebsites.net/api/getAccessbilityMode?patientID=${patientID}`,
  ).then(response => response.json());
}
