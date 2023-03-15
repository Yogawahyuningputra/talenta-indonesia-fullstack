import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"

import { API } from '../../config/api';

ChartJS.register(
    ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
)

const Chart = () => {
    const [chartData, setChartData] = useState({})

    const [female19, setFemale19] = useState([]);
    const [female20, setFemale20] = useState([]);

    const [male19, setMale19] = useState([]);
    const [male20, setMale20] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {

                const token = localStorage.getItem('token');
                //get data by gender female and age < 19
                const femaleBelow = await API.get('/friend/female/below_19', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setChartData({
                    labels: femaleBelow.data.map((item) => item.id),
                    datasets: [
                        {
                            label: " Female < 19",
                            data: femaleBelow.data.map(item => item.name),
                            fill: true,
                            borderColor: "rgb(255,99,132)",
                            backgroundColor: "rgba(255,99,132, 0.3)"
                        }
                    ]
                })

                //get data by gender female and age > 20
                const femaleAbove = await API.get('/friend/female/above_20', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                //get data by gender male and age < 19
                const maleBelow = await API.get('/friend/male/below_19', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                //get data by gender male and age > 20
                const maleAbove = await API.get('/friend/male/above_20', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFemale19(femaleBelow.data);
                setFemale20(femaleAbove.data);
                setMale19(maleBelow.data);
                setMale20(maleAbove.data);


            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='chart'>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: " female < 19" }

                    },
                }}
            />
        </div>
    )
}

export default Chart