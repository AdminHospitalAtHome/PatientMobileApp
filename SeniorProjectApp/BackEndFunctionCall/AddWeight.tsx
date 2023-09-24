import getCurrentDateTime from './getCurrentDateAndTime';
import { useState } from "react";
export function AddWeight({
  patientId,
  weight,
  ifManualInput,
}: {
  patientId: number;
  weight: number;
  ifManualInput: boolean;
}): boolean {
  const dateTime: String = getCurrentDateTime();
  fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/addWeight', {
    method: 'POST',
    body: `{"PatientID": ${patientId}, "DateTimeTaken": "${dateTime}", "WeightInPounds": ${weight}, "IfManualInput": ${ifManualInput}}`,
  }).then(response => {
    console.log(response.status);
  });
  return false;
}
