import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Row, Rows, Table, Cols, Col, TableWrapper} from 'react-native-table-component';


function changeData(data: any): any[][] {
  console.log(data)
  var arr = []

  if(data === null){
    return [[],[]]
  }

  if (data.length > 0) {
    for (var x = 0; x < data[0].length; x++) {
      arr.push([]);
    }
  }

  for(var i = 0 ; i < data.length; i++){
    for(var j = 0 ; j < data[i].length; j++){
      arr[j].push(data[i][j])
    }
  }

  return arr;
}

export default function VitalTable({
  columnTitles,
  vitalData,
}: {
  columnTitles: string[];
  vitalData: any;
}): JSX.Element {
  return (
    <ScrollView style = {styles.viewBorder}>
      <Table borderStyle={styles.tableBorder}>
        <Row textStyle={styles.headerText} data={columnTitles} />
        <Rows data={vitalData} textStyle={styles.tableText} />
      </Table>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBorder: {

    marginHorizontal: 10,
  },
  tableBorder: {
    borderWidth: 3,
    borderColor: '#ba4618',

    borderRadius: 10,

  },

  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },

  tableText: {
    fontSize: 18,
    textAlign: 'center',

  },

  headerBorder: {
    borderBottomWidth: 5,
    borderColor: '#ba4618',
  }
});
