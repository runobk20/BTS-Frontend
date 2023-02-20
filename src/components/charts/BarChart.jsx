import { Center } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {Chart as Chartjs} from "chart.js/auto";

export function BarChart({chartData}) {
    return (
        <Center h={250}>
            <Bar data={chartData} options={{
                responsive: true,
                mantainAspectRatio: false,
                plugins: {
                    title: {
                        display: false,
                    }
                }
            }}/>
        </Center>
    )
}