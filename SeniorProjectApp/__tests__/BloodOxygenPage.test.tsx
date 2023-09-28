/*
 * @format
 */

import 'react-native';

import {it, expect} from '@jest/globals';
import {addBloodOxygen, getBloodOxygen} from '../BackEndFunctionCall/bloodOxygenFunction';

// Add Blood Pressure test
it('Add Blood Oxygen Test', async () => {
 await addBloodOxygen(3, 98, true).then(output => {
    expect(output).toBe('add successful');
  });
});


it('Get Blood Oxygen Test', async ()=>{
  await getBloodOxygen(2, '2023-03-29T08:00:00.000', '2023-03-31T08:00:00.000')
  .then((output) => {
    expect(output).toStrictEqual([['03-29-2023', '4:00 AM', 92], 
                         ['03-30-2023', '4:00 AM', 91],
                         ['03-31-2023','4:00 AM', 90]
                        ])
  })
})