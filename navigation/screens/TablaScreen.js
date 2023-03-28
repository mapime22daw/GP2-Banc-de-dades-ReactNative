import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('dades.db');

export default function TableScreen() {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    createData();
    setDades();
  }, []);

  const createData = () => {
    db.transaction((tx) => {
      /*tx.executeSql(
        `DROP TABLE IF EXISTS data;`,
        [],
        () => { console.log('Tabla eliminada'); },
        (_, error) => { console.log('Error al eliminar la tabla: ', error); }
      );
        */

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS data (
          Country_Name STRING,
          Country_Code STRING,
          Series_Name STRING,
          Series_Code STRING,
          YR2012 NUMBER,
          YR2013 NUMBER,
          YR2014 NUMBER,
          YR2015 NUMBER,
          YR2016 NUMBER,
          YR2017 NUMBER,
          YR2018 NUMBER,
          YR2019 NUMBER,
          YR2020 NUMBER,
          YR2021 NUMBER
        );`,
        [],
        () => { console.log('Va bonito '); },
        (_, error) => {
          console.log('Error al crear la tabla: ', error);
        }
      );
    })
  }


  const setDades = async () => {
    await db.transaction((tx) => {
      tx.executeSql(
        `SELECT COUNT(*) FROM data`,
        [],
        async (_, result) => {
          const count = result.rows.item(0)['COUNT(*)'];
          if (count === 0) {
            const jsonData = require('./dades.json');
            for (let data of jsonData) {
              await tx.executeSql(
                'INSERT INTO data (Country_Name, Country_Code, Series_Name, Series_Code, YR2012, YR2013, YR2014, YR2015, YR2016, YR2017, YR2018, YR2019, YR2020, YR2021) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [data.Country_Name, data.Country_Code, data.Series_Name, data.Series_Code, data.YR2012, data.YR2013, data.YR2014, data.YR2015, data.YR2016, data.YR2017, data.YR2018, data.YR2019, data.YR2020, data.YR2021],
                () => { console.log('Fila agregada con éxito'); },
                (_, error) => { console.log('Error al agregar la fila: ', error); }
              );
            }
            setTableData(jsonData);
          } else {
            tx.executeSql(
              `SELECT * FROM data`,
              [],
              (_, { rows: { _array } }) => {
                setTableData(_array);
              },
              (_, error) => {
                console.log('Error al cargar los datos: ', error);
              }
            );
          }
        },
        (_, error) => {
          console.log('Error al contar las filas: ', error);
        }
      );
    })
  }

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
  const tableRows = paginatedTableData.map((row) => [row.Country_Name, row.Series_Name, row.YR2015, row.YR2016, row.YR2017, row.YR2018, row.YR2019, row.YR2020, row.YR2021]);

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

}
