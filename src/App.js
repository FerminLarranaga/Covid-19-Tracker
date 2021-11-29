import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import './App.css';
import Map from './components/Map';
import Table from './components/Table';
import Linegraph from './components/Linegraph';
import numeral from 'numeral';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState();
  const [tableData, setTableData] = useState();

  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState();
  const [mapCasesType, setMapCasesType] = useState('cases');

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://api.caw.sh/v3/covid-19/countries')
        .then(res => res.json())
        .then(data => {
          setCountries(data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso3
          })));

          setTableData(data);
          setMapCountries(data);
        })
    }

    getCountries();

    updateCountryInfo('worldwide');
  }, []);

  const updateCountryInfo = async (countryCode) => {
    const url =
      countryCode === 'worldwide' ?
        'https://disease.sh/v3/covid-19/all' :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

        if (data.countryInfo) {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
      });
  }


  return (
    <div>
      <div className="app">
        <div className='app__left'>
          <header className='app__header'>
            <h1 className="app__title">
              <span className="app__CovidTitle">COVID-19 </span>
              <span className="app__TrackerTitle">TRACKER</span>
            </h1>
            <FormControl className='app__dropdown'>
              <Select variant='outlined' value={country} onChange={(evt) => updateCountryInfo(evt.target.value)}>
                <MenuItem value='worldwide'>Mundial</MenuItem>
                {
                  countries.map(country => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </header>
          {
            countryInfo?.active ?
              (
                <div className='app__stats'>

                  <InfoBox
                    active={mapCasesType === 'cases'}
                    color='red'
                    onClick={() => setMapCasesType('cases')}

                    title='Casos'
                    total={`Totales: ${numeral(countryInfo.cases).format('0.0a')}`}
                    newOnes={`Activos: ${numeral(countryInfo.active).format('0.0a')}`}
                    perMillion={`Casos/millon: ${numeral(countryInfo.casesPerOneMillion).format('0.0a')}`} />

                  <InfoBox
                    active={mapCasesType === 'recovered'}
                    color='green'
                    onClick={() => setMapCasesType('recovered')}

                    title='Recuperados'
                    total={`Totales: ${numeral(countryInfo.recovered).format('0.0a')}`}
                    newOnes={`Nuevos hoy: ${numeral(countryInfo.todayRecovered).format('+0.0a')}`}
                    perMillion={`Recuperados/millon: ${numeral(countryInfo.recoveredPerOneMillion).format('0.0a')}`} />


                  <InfoBox
                    active={mapCasesType === 'deaths'}
                    color='black'
                    onClick={() => setMapCasesType('deaths')}

                    title='Muertes'
                    total={`Totales: ${numeral(countryInfo.deaths).format('0.0a')}`}
                    newOnes={`Nuevas hoy: ${numeral(countryInfo.todayDeaths).format('+0.0a')}`}
                    perMillion={`Muertes/millon: ${numeral(countryInfo.deathsPerOneMillion).format('0.0a')}`} />

                </div>
              ) : ('')
          }
          {
            mapCountries ? (
              <Map countries={mapCountries} casesType={mapCasesType} center={mapCenter} zoom={mapZoom} />
            ) : ''
          }
        </div>


        <Card className='app__right'>
          <CardContent className='app__rightCard'>
            <h3>Ranking de paises</h3>
            {tableData && (<Table countries={tableData} />) }
            <h3>{country.charAt(0).toUpperCase() + country.slice(1)} new {(mapCasesType.charAt(0).toUpperCase() + mapCasesType.slice(1))}</h3>
            <Linegraph country={country} casesType={mapCasesType} />
          </CardContent>
        </Card>
      </div>

      <center className="watermark_container">
        <h3 className="watermark_txt">Made by <a href="https://portfolio-83471.web.app/" target="_blank">Fermín Larrañaga</a></h3>
      </center>
    </div>

  );
}

export default App;
