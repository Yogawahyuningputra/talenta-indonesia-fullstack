import React from 'react'
import { Container, Table } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { API } from '../../config/api';
const MyFriends = () => {

    let { data: myFriends } = useQuery('myFriendsCache', async () => {
        const response = await API.get(`/friendByUser`)
        return response.data.data
    })
    return (
        <div>
            <Container className='main'>


                <div className=" fs-4 fw-bold my-5">
                    List My Friends
                </div>
                <Table bordered hover>

                    <thead className='bg-light'>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myFriends?.map((item, index) => (
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
        </div>
    )
}

export default MyFriends