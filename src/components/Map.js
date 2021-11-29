import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';
import { showDataOnMap } from './../util';

const Map = ({ countries, casesType, center, zoom }) => {
    console.log('CENTER >>>', center);
    console.log('ZOOM >>>', zoom);

    const ChangeMapView = ({center, zoom}) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return(
        <div className='map'>
            <MapContainer center={center} zoom={zoom}>
                <ChangeMapView center={center} zoom={zoom}/>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    );
}

export default Map;