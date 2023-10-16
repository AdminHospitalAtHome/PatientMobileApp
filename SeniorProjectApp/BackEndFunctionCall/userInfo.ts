export function setAccessibilityMode(
  patientID: number,
  mode: boolean,
): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/setAccessibilityMode?PatientID=${patientID}&IfAccessibilityMode=${mode}`,
    ).then(res => {
      if (res.status === 200) {
        resolve('set successful');
      } else {
        reject('failed to set accessibility mode');
      }
    });
  });
}

export function getAccessibilityMode(patientID: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getAccessbilityMode?patientID=${patientID}`,
    ).then(res => {
      if (res.status === 200) {
        resolve(res.json());
      } else {
        reject('failed to get accessibility mode');
      }
    });
  });
}
