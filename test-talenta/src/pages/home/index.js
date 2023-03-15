import React from 'react'
import { Table, Container } from 'react-bootstrap';
import { useQuery } from 'react-query'
import { API } from '../../config/api';
import './home.scss'

const Home = () => {
    const token = localStorage.getItem('token');

    let { data: Friends } = useQuery('DataFriendsCache', async () => {
        const response = await API.get(`/friends`)
        return response.data.data
    })

    let { data: FemaleBelow19 } = useQuery('FemaleBelow19', async () => {
        const response = await API.get(`/friend/female/below_19`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.data
    })

    let { data: FemaleAbove19 } = useQuery('FemaleAbove19', async () => {
        const response = await API.get(`/friend/female/above_20`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.data
    })

    let { data: MaleBelow19 } = useQuery('MaleBelow19', async () => {
        const response = await API.get(`/friend/male/below_19`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.data
    })

    let { data: MaleAbove19 } = useQuery('MaleAbove19', async () => {
        const response = await API.get(`/friend/male/above_20`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.data
    })



    return (
        <>

            <Container className='main'>

                <label className='mt-3 fw-bold'> Data Keseluruhan  </label>

                <Table bordered hover className="mt-1">
                    <thead className='bg-light'>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Friends?.map((item, index) => (
                            <tr>
                                <td key={index}>{index + 1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.age}</td>
                                <td>{item?.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <label className='mt-3 fw-bold'> Data Berdasarkan Gender Female di bawah 19 tahun </label>

                <Table bordered hover className="mt-1">
                    <thead className='bg-light'>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FemaleBelow19?.map((item, index) => (
                            <tr>
                                <td key={index}>{index + 1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.age}</td>
                                <td>{item?.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <label className='mt-3 fw-bold'> Data Berdasarkan Gender Female di atas 19 tahun </label>

                <Table bordered hover className="mt-1">
                    <thead className='bg-light'>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FemaleAbove19?.map((item, index) => (
                            <tr>
                                <td key={index}>{index + 1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.age}</td>
                                <td>{item?.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <label className='mt-3 fw-bold'> Data Berdasarkan Gender Male di bawah 19 tahun </label>

                <Table bordered hover className="mt-1">
                    <thead className='bg-light'>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MaleBelow19?.map((item, index) => (
                            <tr>
                                <td key={index}>{index + 1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.age}</td>
                                <td>{item?.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <label className='mt-3 fw-bold'> Data Berdasarkan Gender male di atas 19 tahun </label>

                <Table bordered hover className="mt-1">
                    <thead className='bg-light'>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MaleAbove19?.map((item, index) => (
                            <tr>
                                <td key={index}>{index + 1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.age}</td>
                                <td>{item?.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>

    )
}

export default Home
