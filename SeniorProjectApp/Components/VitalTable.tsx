import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Row, Rows, Table} from 'react-native-table-component';

export default function VitalTable({
  columnTitles,
  vitalData,
}: {
  columnTitles: string[];
  vitalData: any;
}): JSX.Element {
  return (
    <ScrollView style={styles.viewBorder}>
      <Table borderStyle={styles.tableBorder}>
        <Row data={columnTitles} />
        <Rows data={vitalData} />
      </Table>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBorder: {
    borderWidth: 5,
    borderColor: '#ba4618',
    padding: 5,
    borderRadius: 10,
    margin: 10,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
});
