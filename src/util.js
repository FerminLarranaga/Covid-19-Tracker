import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

export const sortArrayofObjs = (data, property) => {
    const sortedData = [...data]; // Copying data into an array

    sortedData.sort((a, b) => {
        if (a[property] < b[property]) {
            return 1;
        }
        if (a[property] > b[property]) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    return sortedData;
}

export const mainPropertiesOfCountries = [
    'cases',
    'active',
    'critical',
    'deaths',
    'tests',
    'recovered',
    'casesPerOneMillion',
    'activePerOneMillion',
    'criticalPerOneMillion',
    'deathsPerOneMillion',
    'testsPerOneMillion',
    'recoveredPerOneMillion'
];

export const nicelyWrittenPropertiesEN = [
    'Total cases',
    'Active cases',
    'Critical cases',
    'Total deaths',
    'Total tests',
    'Total recovered',
    'Cases per million',
    'Active cases per million',
    'Critical cases per million',
    'Deaths per million',
    'Tests per million',
    'Recovered per million'
];

export const nicelyWrittenPropertiesES = [
    'Casos totales',
    'Casos Activos',
    'Casos criticos',
    'Muertes totales',
    'Tests totales',
    'Recuperados totales',
    'Casos/millon',
    'Casos activos/millon',
    'Casos criticos/millon',
    'Muertes/millon',
    'Tests/millon',
    'Recuperados/millon'
];

const casesTypeColors = {
    cases: {
        hex: '#CC1034',
        multiplier: 200
    },
    recovered: {
        hex: '#7dd71d',
        multiplier: 300
    },
    deaths: {
        hex: '#000000',
        multiplier: 850
    }
}

export const showDataOnMap = (data, casesType) => {
    // console.log('CASES TYPE >>>>', casesTypeColors[casesType].hex)
    return data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{
                color : casesTypeColors[casesType].hex,
                fillColor : casesTypeColors[casesType].hex
            }}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className='info-container'>
                    <div
                        className='info-flag'
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className='info-name'>
                        {country.country}
                    </div>
                    <div className='info-cases'>
                        Casos: {numeral(country.cases).format('0,0')}
                    </div>
                    <div className='info-recovered'>
                        Recuperados: {numeral(country.recovered).format('0,0')}
                    </div>
                    <div className='info-deaths'>
                        Muertes: {numeral(country.deaths).format('0,0')}
                    </div>
                </div>
            </Popup>
        </Circle>
    ))
}