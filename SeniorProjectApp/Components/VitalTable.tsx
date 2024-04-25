import {ScrollView, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {Row, Rows, Table} from 'react-native-reanimated-table';

export default function VitalTable({
  columnTitles,
  vitalData,
}: {
  columnTitles: string[];
  vitalData: any[][];
}): React.JSX.Element {
  if (vitalData === null || vitalData.length === 0) {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.noDataText}>No Data...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.viewBorder}>
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
    color: 'black',
  },

  tableText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },

  headerBorder: {
    borderBottomWidth: 5,
    borderColor: '#ba4618',
  },
  noDataText: {
    color: 'black',
    fontSize: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
});
