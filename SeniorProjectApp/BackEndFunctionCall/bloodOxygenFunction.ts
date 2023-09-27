export function addBloodOxygen(
  patientID: number,
  bloodOxygenLevelInPercentage: number,
  IfManualInput: boolean,
): Promise<any> {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const dateTime: String = (new Date()).toISOString();
    fetch(
      'https://hosptial-at-home-js-api.azurewebsites.net/api/addBloodOxygen',
      {
        method: 'POST',
        body: `{"PatientID": ${patientID}, "DateTimeTaken": "${dateTime}", "bloodOxygenLevelInPercentage": ${bloodOxygenLevelInPercentage} ,"IfManualInput": ${IfManualInput}}`,
      },
    ).then(response => {
      console.log(response.status);
      if (response.status === 201) {
        resolve('add successful');
      } else {
        reject('failed to add blood pressure');
      }
    });
  });
  return promise;
}
