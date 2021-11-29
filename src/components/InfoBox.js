import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './InfoBox.css';

const InfoBox = ({title, total, newOnes, perMillion, active, color, onClick}) => {
    return (
        <Card
            onClick={onClick}
            className={`infoBox infoBox--${color} infoBox--active_${active}`}
        >
            <CardContent>
                <h3 className='infoBox__title' style={{marginBottom: '10px'}}>{title}</h3>

                <p className={`infoBox__total infoBox__total_${color}`}>{total}</p>

                <Typography className='infoBox__newOnes' color='textSecondary'>{newOnes}</Typography>

                <Typography className='infoBox__perMillion' color='textSecondary'>{perMillion}</Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;