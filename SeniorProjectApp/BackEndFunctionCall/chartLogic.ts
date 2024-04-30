import React from 'react';

export function onDataPointClick(
  dataPoint: any,
  tooltipPos: any,
  setTooltipPos: React.Dispatch<React.SetStateAction<any>>,
  dates: number[],
) {
  let isSamePoint =
    tooltipPos.x === dataPoint.x && tooltipPos.y === dataPoint.y;
  isSamePoint
    ? setTooltipPos((previousState: any) => {
        return {
          ...previousState,
          value: dataPoint.value + '\n' + dates[dataPoint.index],
          index: dataPoint.index,
          visible: !previousState.visible,
        };
      })
    : setTooltipPos({
        x: dataPoint.x,
        value: dataPoint.value + '\n' + dates[dataPoint.index],
        y: dataPoint.y,
        index: dataPoint.index,
        visible: true,
      });
}
