import { View, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { LineChart } from 'react-native-chart-kit';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function DadesScreen() {
  const db = SQLite.openDatabase('dades.db');
  const [chartData, setChartData] = useState();
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedSeries, setSelectedSeries] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await db.transaction((tx) => {
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
          () => { },
          (_, error) => {
            console.log('Error al crear la tabla: ', error);
          }
        );

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
      });
    } catch (error) {
      console.log('Error al cargar los datos: ', error);
    }
  };

  const filterData = (data) => {
    if (selectedCountry === 'All' && selectedSeries === 'All') {
      return data;
    }

    if (selectedCountry !== 'All' && selectedSeries === 'All') {
      return data.filter((item) => item.Country_Name === selectedCountry);
    }

    if (selectedCountry === 'All' && selectedSeries !== 'All') {
      return data.filter((item) => item.Series_Name === selectedSeries);
    }

    return data.filter(
      (item) =>
        item.Country_Name === selectedCountry && item.Series_Name === selectedSeries
    );
  };

  return (
    <View >
      <View>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue, itemIndex) => setSelectedCountry(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          {chartData &&
            Array.from(new Set(chartData.map(data => data.Country_Name))).map(
              countryName => (
                <Picker.Item
                  key={countryName}
                  label={countryName}
                  value={countryName}
                />
              )
            )}
        </Picker>

        <Picker
          selectedValue={selectedSeries}
          onValueChange={(itemValue, itemIndex) => setSelectedSeries(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          {chartData &&
            Array.from(new Set(chartData.map(data => data.Series_Name))).map(
              seriesName => (
                <Picker.Item
                  key={seriesName}
                  label={seriesName}
                  value={seriesName}
                />
              )
            )}
        </Picker>
      </View>

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
                data: chartData
                  .filter(
                    data =>
                      (data.Country_Name === selectedCountry || selectedCountry === 'All') &&
                      (data.Series_Name === selectedSeries || selectedSeries === 'All')
                  )
                  .map(data => data.YR2021),
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