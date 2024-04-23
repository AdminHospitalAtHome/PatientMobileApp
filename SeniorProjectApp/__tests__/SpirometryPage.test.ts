import 'react-native';

import {it, expect, jest} from '@jest/globals';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';
import {
  addSpirometry, addSpirometryAutomatically,
  addSpirometryAutomaticallyToServer,
  getRecentSpirometry,
  getSpirometry,
} from '../BackEndFunctionCall/spirometryFunction';
import {
  addHeartRateAutomatically,
  getHeartRate,
} from '../BackEndFunctionCall/heartRateFunction';

jest.setTimeout(40000);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

it('Add and Gets Spirometry', async () => {
  const startDateTime: string = new Date().toISOString();

  await addSpirometry(300000001, 4.12, 97, true).then(output => {
    expect(output).toBe('add successful');
  });

  const stopDateTime: string = new Date().toISOString();

  await getSpirometry(300000001, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([[timeTableParser(startDateTime), 4.12, 97]]);
  });
});

it('Add to Spirometry Failure Test', async () => {
  await addSpirometry(999999999, 4.12, 98, true).catch(output => {
    expect(output).toBe('failed to add spirometry');
  });
});

it('Get Spirometry Failure Test', async () => {
  const startDateTime: string = new Date().toISOString();
  const stopDateTime: string = new Date().toISOString();
  await getSpirometry(999999999, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([]);
  });
});

it('Get Recent Spirometry', async () => {
  const startDateTime: string = new Date().toISOString();
  await addSpirometry(300000001, 4.12, 98, true).then(output => {
    expect(output).toBe('add successful');
  });

  const stopDateTime: string = new Date().toISOString();

  await getSpirometry(300000001, startDateTime, stopDateTime).then(output => {
    expect(getRecentSpirometry(output)).toBe('4.12 L');
  });
});

it('Get Recent Spirometry Failure', async () => {
  expect(getRecentSpirometry([])).toEqual('N/A');
});

it('Add and Get Spirometries', async () => {
  const startDateTime: string = new Date().toISOString();

  await addSpirometryAutomaticallyToServer(
    300000001,
    [4.12],
    [97],
    [startDateTime],
    true,
  ).then(output => {
    expect(output).toBe('add successful');
  });

  const stopDateTime: string = new Date().toISOString();

  await getSpirometry(300000001, startDateTime, stopDateTime).then(output => {
    expect(output).toStrictEqual([[timeTableParser(startDateTime), 4.12, 97]]);
  });
});

it('Add Spirometry Automatically', async () => {
  const startDateTime: string = new Date().toISOString();
  const dateTimeTaken = startDateTime.substring(0, startDateTime.length - 1);
  let exampleGoodXML: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-spirometry>\n' +
    '  <id>2bd5addb-2baf-234a-b33a-af6430b300cd</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>' +
    dateTimeTaken +
    '000000+00:00</measured-at>\n' +
    '  <measured-at-local>2018-04-29T10:10:27.040000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2018-04-29T17:10:27.040000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2018-04-29T10:10:27.040000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <spirometry>{"FEV6p":{"value":95.2,"units":"%"},"FEF25":{"value":474,"units":"cl/s"},"VTChart":{"Loops":{"Units":{"volume":"cl","time":"msec"},"Points":[[0,1,100,14,200,32,300,49,400,64,500,75,600,84,700,91,800,96,900,100,1000,102,1100,104,1200,105,1300,107,1400,107]]}},"MV":{"value":0,"units":"cl/m"},"FVC":{"value":271,"units":"cl"},"FEF75":{"value":214,"units":"cl/s"},"MVV":{"value":0,"units":"cl"},"FVCChart":{"Loops":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[2250,-49,2220,-71,2190,-87,2160,-103,2130,-118,2100,-131,2070,-143,2040,-154,2010,-163,1980,-168,1950,-174,1920,-180,1890,-186,1860,-191,1830,-195,1800,-198,1770,-201,1740,-203,1710,-205,1680,-206,1650,-207,1620,-207,1590,-206,1560,-203,1530,-201,1500,-201,1470,-203,1440,-204,1410,-204,1380,-203,1350,-202,1320,-201,1290,-203,1260,-206,1230,-208,1200,-209,1170,-209,1140,-210,1110,-213,1080,-216,1050,-218,1020,-219,990,-220,960,-220,930,-221,900,-224,870,-224,840,-226,810,-228,780,-229,750,-231,720,-232,690,-231,660,-230,630,-229,600,-229,570,-228,540,-228,510,-225,480,-223,450,-220,420,-218,390,-214,360,-210,330,-205,300,-199,270,-192,240,-185,210,-178,180,-170,150,-164,120,-156,90,-146,60,-134,30,-108,0,-85,30,51,60,171,90,257,120,291,150,320,180,348,210,361,240,376,270,391,300,405,330,413,360,426,390,439,420,442,450,450,480,462,510,464,540,461,570,467,600,462,630,465,660,468,690,474,720,475,750,467,780,463,810,465,840,449,870,446,900,446,930,438,960,434,990,431,1020,423,1050,416,1080,413,1110,410,1140,403,1170,397,1200,390,1230,384,1260,380,1290,371,1320,367,1350,363,1380,363,1410,358,1440,351,1470,342,1500,338,1530,330,1560,328,1590,326,1620,319,1650,313,1680,306,1710,299,1740,291,1770,282,1800,276,1830,264,1860,259,1890,253,1920,245,1950,238,1980,232,2010,222,2040,214,2070,208,2100,200,2130,195,2160,188,2190,181,2220,174,2250,162,2280,156,2310,148,2340,135,2370,127,2400,120,2430,110,2460,103,2490,90,2520,81,2550,69,2580,62,2610,56,2640,46,2670,40,2700,30],[2670,-29,2640,-36,2610,-59,2580,-89,2550,-113,2520,-132,2490,-144,2460,-151,2430,-156,2400,-159,2370,-161,2340,-165,2310,-167,2280,-170,2250,-172,2220,-175,2190,-177,2160,-180,2130,-183,2100,-184,2070,-183,2040,-181,2010,-180,1980,-179,1950,-178,1920,-176,1890,-175,1860,-175,1830,-175,1800,-175,1770,-175,1740,-176,1710,-177,1680,-177,1650,-177,1620,-177,1590,-177,1560,-176,1530,-176,1500,-176,1470,-176,1440,-175,1410,-174,1380,-173,1350,-172,1320,-170,1290,-169,1260,-169,1230,-169,1200,-170,1170,-172,1140,-172,1110,-173,1080,-173,1050,-173,1020,-171,990,-168,960,-167,930,-163,900,-159,870,-156,840,-152,810,-149,780,-147,750,-145,720,-141,690,-137,660,-133,630,-127,600,-122,570,-115,540,-99,510,-85,540,113,570,199,600,226,630,247,660,276,690,294,720,316,750,332,780,343,810,347,840,354,870,362,900,371,930,375,960,380,990,383,1020,386,1050,383,1080,379,1110,378,1140,377,1170,380,1200,382,1230,373,1260,363,1290,360,1320,355,1350,351,1380,345,1410,340,1440,336,1470,340,1500,331,1530,328,1560,326,1590,324,1620,326,1650,321,1680,311,1710,303,1740,302,1770,294,1800,286,1830,284,1860,279,1890,270,1920,258,1950,252,1980,247,2010,236,2040,234,2070,229,2100,225,2130,212,2160,201,2190,195,2220,186,2250,179,2280,169,2310,158,2340,150,2370,145,2400,136,2430,128,2460,121,2490,109,2520,102,2550,89,2580,79,2610,65,2640,57,2670,46,2700,40,2730,32,2760,27,2790,19,2820,7],[2790,-27,2760,-46,2730,-61,2700,-71,2670,-77,2640,-82,2610,-86,2580,-91,2550,-98,2520,-109,2490,-121,2460,-128,2430,-135,2400,-139,2370,-143,2340,-144,2310,-146,2280,-147,2250,-149,2220,-150,2190,-152,2160,-151,2130,-150,2100,-148,2070,-147,2040,-146,2010,-146,1980,-146,1950,-145,1920,-145,1890,-146,1860,-147,1830,-146,1800,-146,1770,-146,1740,-146,1710,-146,1680,-145,1650,-145,1620,-145,1590,-144,1560,-142,1530,-140,1500,-139,1470,-138,1440,-138,1410,-138,1380,-138,1350,-138,1320,-138,1290,-138,1260,-139,1230,-139,1200,-139,1170,-138,1140,-135,1110,-130,1080,-123,1050,-112,1020,-93,1050,55,1080,171,1110,243,1140,265,1170,287,1200,307,1230,327,1260,334,1290,342,1320,352,1350,355,1380,359,1410,366,1440,377,1470,384,1500,384,1530,389,1560,393,1590,397,1620,405,1650,397,1680,400,1710,399,1740,402,1770,394,1800,397,1830,392,1860,388,1890,391,1920,387,1950,386,1980,389,2010,384,2040,384,2070,378,2100,371,2130,366,2160,361,2190,354,2220,346,2250,340,2280,338,2310,331,2340,322,2370,318,2400,312,2430,307,2460,297,2490,294,2520,289,2550,280,2580,275,2610,272,2640,265,2670,258,2700,255,2730,247,2760,243,2790,232,2820,228,2850,221,2880,216,2910,211,2940,206,2970,198,3000,185,3030,176,3060,166,3090,158,3120,147,3150,138,3180,133,3210,128,3240,122,3270,113,3300,105,3330,96,3360,90,3390,85,3420,78,3450,73,3480,67,3510,61,3540,56,3570,39],[3540,-6]]},"BestLoop":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[0,81,50,250,100,319,150,344,200,369,250,401,300,407,350,438,400,445,450,457,500,457,550,457,600,463,650,470,700,463,750,457,800,445,850,445,900,432,950,426,1000,413,1050,407,1100,401,1150,388,1200,382,1250,369,1300,357,1350,357,1400,344,1450,332,1500,326,1550,319,1600,307,1650,300,1700,288,1750,275,1800,263,1850,250,1900,231,1950,231,2000,213,2050,194,2100,194,2150,175,2200,156,2250,150,2300,131,2350,119,2400,106,2450,87,2500,68,2550,56,2600,43,2550,0,2500,-12,2450,-31,2400,-87,2350,-112,2300,-137,2250,-150,2200,-156,2150,-163,2100,-169,2050,-169,2000,-175,1950,-181,1900,-181,1850,-175,1800,-175,1750,-175,1700,-169,1650,-169,1600,-169,1550,-175,1500,-175,1450,-175,1400,-175,1350,-175,1300,-175,1250,-169,1200,-169,1150,-169,1100,-163,1050,-163,1000,-169,950,-169,900,-169,850,-169,800,-163,750,-156,700,-156,650,-150,600,-144,550,-144,500,-131,450,-125,400,-119,350,-94,300,0]]}},"VCC":{"value":0,"units":"cl"},"TE":{"value":0,"units":"msec"},"FEV3p":{"value":100,"units":"%"},"PEFF":{"value":0,"units":"cl/s"},"IC":{"value":0,"units":"cl"},"ERV":{"value":0,"units":"cl"},"FVV12":{"value":0,"units":"cl"},"FIV1":{"value":196,"units":"cl"},"IVC":{"value":0,"units":"cl"},"FIV1p":{"value":88.3,"units":"%"},"FEF2575":{"value":364,"units":"cl/s"},"FEF50":{"value":363,"units":"cl/s"},"FET":{"value":131,"units":"msec"},"PIF":{"value":184,"units":"cl/s"},"FEV1":{"value":258,"units":"cl"},"EVC":{"value":0,"units":"cl"},"FIVC":{"value":222,"units":"cl"},"FVV1":{"value":0,"units":"cl"},"PEF":{"value":475,"units":"cl/s"},"FVV62":{"value":0,"units":"cl/s"},"TV_TI":{"value":0,"units":"l/s"},"TI":{"value":0,"units":"msec"},"FEV6":{"value":271,"units":"cl"},"PEFF2":{"value":0,"units":"cl/s"},"FVVC2":{"value":0,"units":"cl"},"FVV6":{"value":0,"units":"cl/s"},"TV":{"value":0,"units":"cl"},"FEV1p":{"value":95.2,"units":"%"},"FVVC":{"value":0,"units":"cl"},"VEXT":{"value":80,"units":"ml"},"MVVcalc":{"value":903,"units":"cl"},"FEV3":{"value":271,"units":"cl"},"IT":{"value":0,"units":"cl"},"VCC2":{"value":0,"units":"cl"}}</spirometry>\n' +
    '  <drugs>pre</drugs>\n' +
    '  <test-type>fvc</test-type>\n' +
    '  <protocol>generic_spirometry</protocol>\n' +
    '</measurements-spirometry>\n';
  const fakeSetState = () => {};
  const fakeSetAddSuccessVisible = () => {};
  await addSpirometryAutomatically(
    [exampleGoodXML],
    300000001,
    fakeSetAddSuccessVisible,
    fakeSetState,
    fakeSetState,
  ).then(async () => {
    const stopDateTime: string = new Date().toISOString();
    await getSpirometry(300000001, startDateTime, stopDateTime).then(
      (result: any[][]) => {
        expect(result).toStrictEqual([[timeTableParser(startDateTime), 2.58, 95]]);
      },
    );
  });
});
