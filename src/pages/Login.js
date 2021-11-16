import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUsername, updateInfo } from '../store/userSlice';

export default function Login() {
    const [username, setUsername] = useState('');
    const [info, setInfo] = useState({});
    
    useEffect(() => console.log(username, 11111), [username]);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        // console.log(name, value, 888);
        setInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(info, 'infoinfo');
    }
    
    const handleUpdateInfo = () => {
        dispatch(updateInfo(info));
        // setUsername('new name')
        history.push('/dashboard');
    }

    const gotoInfo = () => {
        history.push('/dashboard');
    }

    return (
        <>
            <div className="container">
                <h5>checker toolkit</h5>
                <form className="">
                    <div >
                        <label htmlFor="" className="form-label">user</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="user"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                console.log(event.target.value, 8888);
                            }}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Type</label>
                        <select
                            name="type"
                            className="form-control"
                            type="text"
                            placeholder="Type"
                            value={info?.type || ''}
                            onChange={handleChangeInfo}
                        >
                            <option value="RPG">pls select</option>
                            <option value="RPG">RPG</option>
                            <option value="Openworld">Openworld</option>
                            <option value="Horror">Horror</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Name</label>
                        <input
                            name="name"
                            className="form-control"
                            type="text"
                            placeholder="name"
                            value={info?.name || ''}
                            onChange={handleChangeInfo}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Version</label>
                        <input
                            name="version"
                            className="form-control"
                            type="text"
                            placeholder="Version"
                            value={info?.version || ''}
                            onChange={(e) => handleChangeInfo(e)}
                        />
                    </div>
                </form>

                <button className="btn btn-sm btn-primary d-block mt-2" onClick={() => handleUpdateInfo()}>update info</button>
                <button className="btn btn-sm btn-info d-block mt-2" onClick={() => gotoInfo()}>goto info</button>
            </div>
        </>
    );
}
