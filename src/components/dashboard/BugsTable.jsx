import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function BugsTable({bugs}) {
    return (
        <TableContainer maxHeight='80vh' overflowY='scroll'>
            <Table colorScheme='purple'>
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Project</Th>
                        <Th>Status</Th>
                        <Th>Priority</Th>
                        <Th>Severity</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        (bugs) && (
                            bugs.map(bug => {
                                return <Tr key={bug.id}>
                                          <Td><Link to={`/projects/${bug.project._id}/bug/${bug.id}`} style={{color:'#805AD5', textDecoration: 'underline'}}>{bug.title}</Link></Td>
                                          <Td><Link to={`/projects/${bug.project._id}`} style={{color:'#805AD5', textDecoration: 'underline'}}>{bug.project.name}</Link></Td>
                                          <Td>{bug.status}</Td>
                                          <Td>{bug.priority}</Td>
                                          <Td>{bug.severity}</Td>
                                       </Tr>
                            })
                        )
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}