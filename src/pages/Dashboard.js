import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsername, selectInfo, selectInfos } from "../store/userSlice";
import { updateInfos } from '../store/userSlice';

import { useDispatch } from 'react-redux';



export default function Dashboard() {
    const dispatch = useDispatch();

    // Select username from store
    const username = useSelector(selectUsername);
    var data  = useSelector(selectInfo);
    var infos = useSelector(selectInfos);

    // var infos = [
        // {
        // "id": 1,
        // "name": "the last of us",
        // "type": "rpg",
        // "version": "1.01"
        // },
        // {
        // "id": 2,
        // "name": "the evil within",
        // "type": "honnor",
        // "version": "1.01"
        // },
        // {
        // "id": 3,
        // "name": "dead island riptide",
        // "type": "adventure",
        // "version": "1.01"
        // }
    // ];

    useEffect(() => {
        fetch('http://localhost:3000/infos')
            .then(response => response.json())
            .then(res => {
                infos = res || [];
                dispatch(updateInfos(infos));

                console.log(infos, 'infos');
            });
    }, []);

    return (
        <>
            <h4 className="text-center">Dashboard</h4>
            <h4>Main info: {username}</h4>
            <h4>
                <label className="badge bg-primary mt-2">Type</label>: {data?.user?.info?.type} <br />
                <label className="badge bg-primary mt-2">Name</label>: {data?.user?.info?.name} <br />
                <label className="badge bg-primary mt-2">Ver</label>: {data?.user?.info?.version} <br />
            </h4>

            <h3 className="text-center">info table list</h3>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Name</th>
                    <th scope="col">Version</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        infos.map((item, index) => {
                            console.log(item, 'iem');
                            return (
                                <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.type}</td>
                                    <td>{item.name}</td>
                                    <td>{item.version}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            
            <Link to="/login">Log out</Link>
        </>
    );
}
