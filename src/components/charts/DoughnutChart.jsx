import { Center } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import {Chart as Chartjs} from "chart.js/auto";

export function DoughnutChart({chartData}) {
    return (
        <Center h={{base: '250px', lg: '400px'}}>
            <Doughnut data={chartData} options={{
                responsive: true,
                mantainAspectRatio: true
            }}/>
        </Center>
    )
}