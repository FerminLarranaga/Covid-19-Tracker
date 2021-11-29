import React, { useEffect, useState } from 'react';
import './Table.css';
import {
    sortArrayofObjs,
    mainPropertiesOfCountries as ObjProp,
    nicelyWrittenPropertiesES as ClientSidePropES
} from './../util';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import numeral from 'numeral';

const Table = ({ countries }) => {
    const [countriesSorted, setCountriesSorted] = useState([]);
    const [propertyToSort, setPropertyToSort] = useState(ObjProp[0]);

    useEffect(() => {
        setCountriesSorted(sortArrayofObjs(countries, propertyToSort));
    }, [propertyToSort]);

    return (
        <div className='table__container'>
            <div className='table__selectQuery'>
                <h4 style={{ marginRight: '35px' }}>Criterio: </h4>
                <FormControl>
                    <Select value={propertyToSort} onChange={evt => setPropertyToSort(evt.target.value)}>
                        {
                            ObjProp.map((property) => (
                                <MenuItem value={property}>{ClientSidePropES[ObjProp.indexOf(property)]}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
            <div className='table__countries'>
                {
                    countriesSorted.map(country => (
                        <tr>
                            <td>
                                <td>
                                    <strong style={{ marginRight: '10px' }}>{countriesSorted.indexOf(country) + 1}</strong>
                                    {country.country}
                                </td>
                            </td>
                            <td style={{ paddingRight: '7px' }}>
                                <strong>{numeral(country[propertyToSort]).format('0,0')}</strong>
                            </td>
                        </tr>
                    ))
                }
            </div>
        </div>
    );
}

export default Table;