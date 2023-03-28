import { View, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { LineChart } from 'react-native-chart-kit';
import { useEffect, useMemo, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
const db = SQLite.openDatabase('dades.db');

export default function DadesScreen() {
  const [chartData, setChartData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({ country: 'All', series: 'All' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await db.transaction(async (tx) => {
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
              setChartData(jsonData);
            } else {
              tx.executeSql(
                `SELECT * FROM data`,
                [],
                (_, { rows: { _array } }) => {
                  setChartData(_array);
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
      });
    } catch (error) {
      console.log('Error al cargar los datos: ', error);
    }
  };
  const filteredChartData = useMemo(() => {
    return chartData.filter((item) =>
      (selectedFilter.country === 'All' || item.Country_Name === selectedFilter.country) &&
      (selectedFilter.series === 'All' || item.Series_Name === selectedFilter.series)
    );
  }, [chartData, selectedFilter]);

  const countryOptions = useMemo(() => {
    const countryNames = chartData.map(data => data.Country_Name);
    return ['All', ...new Set(countryNames)];
  }, [chartData]);

  const seriesOptions = useMemo(() => {
    const seriesNames = chartData.map(data => data.Series_Name);
    return ['All', ...new Set(seriesNames)];
  }, [chartData]);

  return (
    <View>
      <View>
        <Picker
          selectedValue={selectedFilter.country}
          onValueChange={(value) => setSelectedFilter({ ...selectedFilter, country: value })}
        >
          {countryOptions.map((countryName) => (
            <Picker.Item
              key={countryName}
              label={countryName}
              value={countryName}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedFilter.series}
          onValueChange={(value) => setSelectedFilter({ ...selectedFilter, series: value })}
        >
          {seriesOptions.map((seriesName) => (
            <Picker.Item key={seriesName} label={seriesName} value={seriesName} />
          ))}
        </Picker>
      </View>

      {filteredChartData.length > 0 && (
        <LineChart
          data={{
            labels: [
              '2012',
              '2013',
              '2014',
              '2015',
              '2016',
              '2017',
              '2018',
              '2019',
              '2020',
              '2021',
            ],
            datasets: [
              {
                data: filteredChartData.map((data) => data.YR2021),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              },
            ],
          }}
          width={Dimensions.get('window').width - 60}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#00d547',
            backgroundGradientFrom: '#00d547',
            backgroundGradientTo: '#00d597',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignSelf: 'center',
          }}
        />
      )}
    </View>
  );
}