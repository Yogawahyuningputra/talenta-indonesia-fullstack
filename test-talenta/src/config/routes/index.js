import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, MyFriends } from '../../pages'
import { Headers, Footers } from '../../components'
const Routers = () => {
    return (
        <>
            <Headers />
            <Routes>
                <Route index element={<Home />} />
                <Route exact path="/my-friends" element={<MyFriends />} />
            </Routes>
            <Footers />
        </>
    )
}

export default Routers