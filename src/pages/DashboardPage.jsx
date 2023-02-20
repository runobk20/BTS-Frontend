import { useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { Card, CardBody, CardHeader, Flex, Heading, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { BarChart } from "../components/charts/BarChart";
import { DoughnutChart } from "../components/charts/DoughnutChart";
import { createChartData } from '../helpers';
import { BugsTable } from "../components/";

export function DashboardPage() {
    const {user} = useAuthStore();
    const {bugs} = user;
    
    const priorityData = createChartData(bugs, ['Low', 'Medium', 'High', 'Immediate'], 'priority');
    const [priorityChart, setPriorityChart] = useState({
        labels: priorityData.map(data => data.x),
        datasets:[{ 
            label: 'Total bugs',
            data: priorityData.map(data => data.y),
            backgroundColor: ['#90CDF4', '#FAF089', '#F6AD55', '#F56565'],
            borderColor: ['#63B3ED', '#F6E05E', '#ED8936', '#E53E3E']
        }]
    });

    const severityData = createChartData(bugs, ['Low', 'Medium', 'High', 'Critical'], 'severity');
    const [severityChart, setSeverityChart] = useState({
        labels: severityData.map(data => data.x),
        datasets:[{ 
            label: 'Total bugs',
            data: severityData.map(data => data.y),
            backgroundColor: ['#90CDF4', '#FAF089', '#F6AD55', '#F56565'],
            borderColor: ['#63B3ED', '#F6E05E', '#ED8936', '#E53E3E']
        }]
    });

    const statusData = createChartData(bugs, 
        ['New', 'In Progress', 'Pending', 'Resolved', 'Closed', 'Deferred', 'Re Open', 'Duplicated'],
        'status');

    const [statusChart, setStatusChart] = useState({
        labels: statusData.map(data => data.x),
        datasets:[{ 
            label: 'Total bugs',
            data: statusData.map(data => data.y),
            backgroundColor: ['#D6BCFA', '#90CDF4', '#FAF089', '#68D391', '#81E6D9', '#FC8181', '#9DECF9', '#FBD38D'],
            borderColor: ['#B794F4', '#63B3ED', '#F6E05E', '#48BB78', '#4FD1C5', '#F56565', '#76E4F7', '#F6AD55']
        }]
    });

    return (
    <>
        <Heading mb={3}>Welcome {user.name}!</Heading>
        
        <Flex gap={6}>
            <Flex flexDir='column' gap={3}>
                <Card>
                <CardBody>
                <Stat>
                    <StatLabel>Total bugs</StatLabel>
                    <StatNumber>{user.bugs.length}</StatNumber>
                    <StatHelpText>In {user.projects.length + user.ownProjects.length} projects</StatHelpText>
                </Stat>
                </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        Bugs by status
                        <DoughnutChart chartData={statusChart}/>
                    </CardBody>
                </Card>
            </Flex>

            <Flex flexDir='column' gap={3}>
                <Card>
                    <CardHeader pb='0'>Bugs by priority</CardHeader>
                    <CardBody py='0'>
                        <BarChart chartData={priorityChart}/>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader pb='0'>Bugs by severity</CardHeader>
                    <CardBody py='0'>
                        <BarChart chartData={severityChart}/>
                    </CardBody>
                </Card>
            </Flex>
            <Card flex='2' px={6} py={3}>
                <BugsTable bugs={bugs}/>
            </Card>
        </Flex>
    </>
        )
}