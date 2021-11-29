import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const graphOptions = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 7,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

// const data2 = [
//     {x: "5/25/21", y: 51845},
//     {x: "5/26/21", y: 268216},
//     {x: "5/27/21", y: 354368},
//     {x: "5/28/21", y: 699934}
// ]

const LineGraph = ({ country, casesType }) => {
    const [data, setData] = useState();

    const buildChartData = (data, casesType) => {
        let chartData = [];
        let lastDataPoint;
        let checkedData = data.timeline ? data.timeline : data;

        for (let date in checkedData[casesType]) {
            if (lastDataPoint) {
                let newDataType = {
                    x: date,
                    y: checkedData[casesType][date] - lastDataPoint
                }

                chartData.push(newDataType);
            }

            lastDataPoint = checkedData[casesType][date];
        }

        console.log(chartData);
        return chartData;
    }

    useEffect(() => {
        const checkedCountry = country === 'worldwide' ? 'all' : country;
        fetch(`https://disease.sh/v3/covid-19/historical/${checkedCountry}?lastdays=30`)
            .then(res => res.json())
            .then(allData => {
                setData(buildChartData(allData, casesType))
            })
    }, [country, casesType])
    return (
        <div>
            { data ? (
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                                borderColor: "#CC1034",
                                data: data,
                                fill: true
                            }
                        ]
                    }}
                    options={graphOptions}
                    style={{ minHeight: '400px', marginBottom: '10px' }}
                />) : ''
            }
        </div>
    );
}

export default LineGraph;