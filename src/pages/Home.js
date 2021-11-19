import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateInfo } from '../store/userSlice';
import { updateDashboard } from '../store/dashboardSlide';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from "axios";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { selectInfoDashboard } from '../store/dashboardSlide';


export default function Home() {      
    const API_URL = "http://localhost:3000";
    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [info, setInfo] = useState(
        {
            "appid": '',
            "name": "",
            "image_url": "https://steamcdn-a.akamaihd.net/steam/apps/1238810/header.jpg",
            "type": "Openworld",
            "version": "1.2",
            "required_age": "1",
        }
    );
    const [gameDetail, setGameDetail] = useState({});
    const [steamList, setSteamList] = useState([1]);
    // console.log(steamList, 'init arr steam');

    var stateDash = useSelector(selectInfoDashboard);
    useEffect(() => {
        //check state dashboardSlide
        console.log(info, 'info1');
    }, [info])

    useEffect(() => {
        axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0001/?format=json')
            .then(function (res) {
                // debugger
                // v0001
                let list = res?.data.applist.apps.app || [];

                // //v0002
                // let list = res?.data?.applist?.apps || [];      

                list = list.slice(0, 90000);
                list = list.map(item => {
                    return {
                        ...item,
                        id: item.appid
                    }
                })
                console.log(list, 'listtt');

                setSteamList(list);
                // dispatch(updateInfos(infos));

            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    // console.log(steamList, 'steamListsteamList');


    // chunkArrayInGroups
    function chunkArrayInGroups(arr, size) {
        var myArray = [];
        for (var i = 0; i < arr.length; i += size) {
            myArray.push(arr.slice(i, i + size));
        }
        return myArray;
    }
    // console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));


    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results, 'handleOnSearch')
    }
    
    const handleOnHover = (result) => {
        // // the item hovered
        // console.log(result)
    }
    
    const handleOnSelect = (item) => {
        // the item selected
        console.log(item, 'handleOnSelect')
        let image_url = `https://steamcdn-a.akamaihd.net/steam/apps/${item.appid}/header.jpg`;
        let {appid, name} = item ;
        setInfo(prevState => {
            console.log(prevState, 'preSstaet');
            return ({
                ...prevState,
                image_url,
                appid,
                name,
            })
        });

        axios.get('https://store.steampowered.com/api/appdetails?appids='+appid)
            .then(function (res) {
                let data = res?.data?.[appid]?.data;
                let {required_age, price_overview} = data;
                debugger
                console.log(required_age, 'required_age');
                setGameDetail(data);
                setInfo(prevState => {
                    return ({
                        ...prevState,
                        required_age,
                        price: price_overview?.final_formatted || '1đ'
                    })
                });

                // debugger
                // dispatch(updateInfos(infos));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const formatResult = (item) => {
            console.log(item, 'format_resutl');
            let image_url = `https://steamcdn-a.akamaihd.net/steam/apps/631510/header.jpg`;
          
            // return item;
          return (
            <p dangerouslySetInnerHTML={{__html: `<strong>${item}</strong>`}}></p>
            // <p dangerouslySetInnerHTML={{__html: `<strong>${item}  <img className="img-fluid img-thumbnail" style={{maxWidth:'200px'}}  src=${image_url} /> </strong>`}}></p>
          );
      }
    
    // useEffect(() => console.log(username, 11111), [username]);

    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        setInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(info, 'infoinfo');
    }
    
    const handleUpdateUser = () => {
        dispatch(updateUser(username));
        history.push('/dashboard');
    }

    const handleUpdateInfo = (e) => {
        e.preventDefault(); 
        console.log(info, 'infooo');
        dispatch(updateInfo(info));

        axios.post(API_URL + '/infos', info)
            .then(function (response) {
                console.log(response, 'res2000');
                history.push('/dashboard');
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const gotoInfo = () => {
        history.push('/dashboard');
    }

    const gotoDash = (e) => {
        e.preventDefault();
        dispatch(updateDashboard('new_dashboard'));
        history.push('/dashboard');
    }

    return (
        <>
            <div className="container">
                <h5>checker toolkit: <span>Home</span> </h5>
                <form className="">
                    <div >
                        <label htmlFor="" className="form-label">Guest name</label>
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
                    <button className="btn btn-sm btn-primary d-block mt-2" onClick={() => handleUpdateUser()}>update guest</button>

                </form>

                <h6 className="mt-3">Update item steam</h6>
                <form className="">
                    <div className="mt-1">
                        <label htmlFor="" className="form-label">Type</label>
                        <select
                            name="type"
                            className="form-control"
                            type="text"
                            placeholder="Type"
                            value={info?.type || ''}
                            onChange={handleChangeInfo}
                        >
                            {/* <option value="RPG">pls select</option> */}
                            <option value="RPG">RPG</option>
                            <option value="Openworld">Openworld</option>
                            <option value="Horror">Horror</option>
                        </select>
                    </div>
                    <div className="box_autocomplete mt-1">
                        <label htmlFor="" className="form-label">Name</label>
                        {/* <input
                            name="name"
                            className="form-control"
                            type="text"
                            placeholder="name"
                            value={info?.name || ''}
                            onChange={handleChangeInfo}
                        />
                         */}
                        <ReactSearchAutocomplete
                            items={steamList}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus
                            formatResult={formatResult}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Price</label>
                        <input
                            readOnly
                            name="price"
                            className="form-control"
                            type="text"
                            placeholder=""
                            value={info?.price || 0}
                            onChange={(e) => handleChangeInfo(e)}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Required age</label>
                        <input
                            readOnly
                            name="required_age"
                            className="form-control"
                            type="text"
                            placeholder=""
                            value={info?.required_age || 0}
                            onChange={(e) => handleChangeInfo(e)}
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
                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Link</label>
                        <input
                            name="link"
                            className="form-control"
                            type="text"
                            placeholder="Link"
                            value={info?.image_url || 'https://i.imgur.com/2XBqLsa.jpg'}
                            onChange={(e) => handleChangeInfo(e)}
                        />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="" className="form-label me-2">Image</label>
                        <img className="img-fluid img-thumbnail" style={{maxWidth:'200px'}}  src={info?.image_url} />
                    </div>      

                    {
                        gameDetail?.screenshots?.length > 0 && (
                            <div className="card mt-2">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item p-0 mt-1 text-center">
                                        {
                                            gameDetail?.screenshots.map((item, index) => {
                                                console.log(item, 'item_screenshot');
                                                return (
                                                    <img key={index} className="img-fluid img-thumbnail my-2 mx-2 img_screenshot"  src={item?.path_thumbnail} />
                                                )
                                            })
                                        }
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                
                    <button className="btn btn-sm btn-primary me-2 mt-2" onClick={(e) => handleUpdateInfo(e)}>update info</button>
                    <button className="btn btn-sm btn-info me-2 mt-2" onClick={(e) => gotoDash(e)}>goto dash</button>
                    {/* <button className="btn btn-sm btn-info me-2 mt-2" onClick={() => gotoInfo()}>goto info</button> */}
                </form>
            </div>
        </>
    );
}
