import { View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { LineChart } from 'react-native-chart-kit';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DadesScreen() {
  const db = SQLite.openDatabase('dades.db');
  const [chartData, setChartData] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Lee los datos guardados en AsyncStorage
      const storedData = await AsyncStorage.getItem('chartData');

      if (storedData !== null) {
        // Si hay datos guardados, los utiliza
        setChartData(JSON.parse(storedData));
      } else {
        // Si no hay datos guardados, los carga desde la base de datos SQLite

        await db.transaction(tx => {
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
            () => { }
          );
        });

        const jsonData = require('./dades.json');

        /*await db.transaction(async tx => {
          for (let data of jsonData) {
            await tx.executeSql(
              'INSERT INTO data (Country_Name, Country_Code, Series_Name, Series_Code, YR2012, YR2013, YR2014, YR2015, YR2016, YR2017, YR2018, YR2019, YR2020, YR2021) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [data.Country_Name, data.Country_Code, data.Series_Name, data.Series_Code, data.YR2012, data.YR2013, data.YR2014, data.YR2015, data.YR2016, data.YR2017, data.YR2018, data.YR2019, data.YR2020, data.YR2021],
              () => { console.log('Fila agregada con éxito'); },
              (_, error) => { console.log('Error al agregar la fila: ', error); }
            );
          }
        });*/

        setChartData(jsonData);

        // Guarda los datos en AsyncStorage para su uso posterior
        await AsyncStorage.setItem('chartData', JSON.stringify(jsonData));
      }
    } catch (error) {
      console.log('Error al cargar los datos: ', error);
    }
  };
  return (
    <View>
      {chartData && (
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
                data: chartData.map((data) => data.YR2021),
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
            backgroundGradientTo: '#00d547#ffa726',
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