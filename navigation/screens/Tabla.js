import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import * as SQLite from 'expo-sqlite';

const TableComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const db = SQLite.openDatabase({ name: 'dades.db', createFromLocation: 1 });
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table', [], (_, { rows }) => {
        const data = [];
        for (let i = 0; i < rows.length; i += 1) {
          data.push(rows.item(i));
        }
        setTableData(data);
      });
    });
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  const filteredTableData = tableData.filter((row) => {
    // apply filters here
    return true;
  });

  const paginatedTableData = filteredTableData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const tableHeaders = ['País', 'Indicador', 'Año 2015', 'Año 2016', 'Año 2017', 'Año 2018', 'Año 2019', 'Año 2020', 'Año 2021'];
  const tableRows = paginatedTableData.map((row) => [row.column1, row.column2, row.column3, row.column4, row.column5, row.column6, row.column7, row.column8, row.column9]);

  return (
    <View>
      <Table>
        <Row data={tableHeaders} />
        <Rows data={tableRows} />
      </Table>
      <View>
        <Text>Page: {page}</Text>
        <Text>Items per page:</Text>
        <Text onPress={() => handleItemsPerPageChange(10)}>10</Text>
        <Text onPress={() => handleItemsPerPageChange(25)}>25</Text>
        <Text onPress={() => handleItemsPerPageChange(50)}>50</Text>
      </View>
      <View>
        <Text onPress={() => handlePageChange(page - 1)}>Previous</Text>
        <Text>{page + 1}</Text>
        <Text onPress={() => handlePageChange(page + 1)}>Next</Text>
      </View>
    </View>
  );
};

export default TableComponent;


