import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsername, selectInfo, selectInfos } from "../store/userSlice";
import { updateInfos } from '../store/userSlice';
import axios from "axios";
import _ from 'lodash';
import { Modal, ModalBody, ModalHeader, UncontrolledCarousel, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { updateUser, updateInfo } from './../store/userSlice';

export default function Dashboard() {
    const API_URL = "http://localhost:3000";
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [gameEdit, setGameEdit] = useState({});
    const [gameDetail, setGameDetail] = useState({});
    const dispatch = useDispatch();

    // Select username from store
    const username = useSelector(selectUsername);
    var data  = useSelector(selectInfo);
    var infos = useSelector(selectInfos);
        infos = _.orderBy(infos, ['id'],['desc']);

    useEffect(() => {
        console.log(gameDetail, 'gameDetail_use_effect');
    }, [gameDetail])

    const showModalDetail = (e, appid) => {
        e.preventDefault();
        axios.get('https://store.steampowered.com/api/appdetails', {
            params: {
                appids: appid,
                l: 'english'
            }
        })
        .then(function (res) {
            let data = res?.data?.[appid]?.data;
            setGameDetail(data);

            setOpen(true);
            // debugger
        })
        .catch(function (error) {
        });
    }


    const showModalEdit = (e, item) => {
        e.preventDefault();
        setGameEdit(item);
        setOpenEdit(true);
    }

    const deleteItem = (e, item) => {
        e.preventDefault();
        console.log(item, 'item1111');

        axios.delete(`${API_URL}/infos/${item.id}`)
        .then(function (response) {
            axios.get('http://localhost:3000/infos')
                .then(function (res) {
                    infos = res?.data || [];
                    dispatch(updateInfos(infos));
                    setOpenEdit(false);
                })
                .catch(function (error) {
                });
        })
        .catch(function (error) {
        });
    }

    function renderScreenshot() {
        let screenshots = gameDetail?.screenshots || [];
        screenshots = screenshots.map((item, index) => {
            return {
                ...item,
                altText: 'Slide '+(index+1),
                // caption: 'Slide '+(index+1),
                caption: '',
                key: index,
                // src: item.path_thumbnail
                src: item.path_full
            }
        })
        // screenshots = screenshots.slice(0, 2);
        console.log(screenshots, 'screenshotssss');
        return screenshots;
    }

    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        setGameEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(gameEdit, 'infoinfo_edit');
    }

    const handleUpdateInfo = (e) => {
        e.preventDefault(); 
        axios.put(`${API_URL}/infos/${gameEdit.id}`, gameEdit)
            .then(function (response) {
                axios.get('http://localhost:3000/infos')
                    .then(function (res) {
                        infos = res?.data || [];
                        dispatch(updateInfos(infos));
                        setOpenEdit(false);
                    })
                    .catch(function (error) {
                    });
            })
            .catch(function (error) {
               debugger
            });
    }


    useEffect(() => {
        axios.get('http://localhost:3000/infos?_embed=posts')
            .then(function (res) {
                infos = res?.data || [];
                dispatch(updateInfos(infos));

                // console.log(infos, 'infos');
            })
            .catch(function (error) {
                debugger
            });
    }, []);

    return (
        <>
            <h5>checker toolkit: <span>Dashboard</span> </h5>
            <h6>Guest name: {username}</h6>
            <h6>
                <label className="badge bg-primary mt-2">Type</label>: {data?.user?.info?.type} <br />
                <label className="badge bg-primary mt-2">Name</label>: {data?.user?.info?.name} <br />
                <label className="badge bg-primary mt-2">Ver</label>: {data?.user?.info?.version} <br />
            </h6>

            <h3 className="text-center">Steam item list</h3>
            <Link to="/login">go home</Link>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="w_5p">#</th>
                            <th>AppID</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Required age</th>
                            <th>Version</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>DLC</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            infos.map((item, index) => {
                                let url = `https://steamcdn-a.akamaihd.net/steam/apps/${item.appid}/header.jpg`

                                return (
                                    <tr key={index}>
                                        <th>{item.id}</th>
                                        <th>{item.appid}</th>
                                        <td>{item.type}</td>
                                        <td>{item.name}</td>
                                        <td>{item.required_age || 0}</td>
                                        <td>{item.version}</td>
                                        <td className="text-success fw-bold">{item.price || '1000đ'}</td>
                                        <td>
                                            <a href="#" > <img className="img-fluid img-thumbnail" style={{maxWidth:'120px'}}  src={url} /> </a>
                                        </td>
                                        <td>DLC</td>
                                        <td>
                                            <button onClick={(e) => showModalDetail(e, item.appid)} className="btn btn-sm btn-primary mr-10">
                                                <i className="fas fa-info-circle"></i>
                                            </button>
                                            <button onClick={(e) => showModalEdit(e, item)} className="btn btn-sm btn-primary mr-10">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button onClick={(e) => deleteItem(e, item)} className="btn btn-sm btn-danger">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr> 
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* modal detail */}
            <Modal 
                size="xl"
                isOpen={open}
                toggle={() => setOpen(false)}
            >
                <ModalHeader>
                    Detail info: <span className="fw-bold fst-italic"> {gameDetail?.name} </span>
                </ModalHeader>
                <ModalBody>
                    <UncontrolledCarousel
                        items={renderScreenshot()}
                    />

                    <iframe 
                        src={"https://store.steampowered.com/widget/"+gameDetail.steam_appid}
                        className="mt-3"
                        frameBorder="0"
                        width="100%"
                        height="190"
                        seamless="seamless"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation">
                    </iframe>         

                    <p 
                        className="detail_des"
                        dangerouslySetInnerHTML={{__html: gameDetail?.detailed_description }}
                    ></p>

                    <p dangerouslySetInnerHTML={{__html: gameDetail?.pc_requirements?.minimum }}></p>

                    <p dangerouslySetInnerHTML={{__html: gameDetail?.pc_requirements?.recommended }}></p>

                    <figure className="text-end">
                        <blockquote className="blockquote">
                            <p>A well-known quote, contained in a blockquote element.</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                        </figcaption>
                    </figure>
                </ModalBody>
            </Modal>


            {/* modal edit */}
            <Modal 
                size="xl"
                isOpen={openEdit}
                toggle={() => setOpenEdit(false)}
            >
                <ModalHeader>
                    Edit info: <span className="fw-bold fst-italic"> {gameEdit?.name} </span>
                </ModalHeader>
                <ModalBody>
                <form className="">
                    <div className="mt-1">
                        <label htmlFor="" className="form-label">Type</label>
                        <select
                            name="type"
                            className="form-control"
                            type="text"
                            placeholder="Type"
                            value={gameEdit?.type || ''}
                            onChange={handleChangeInfo}
                        >
                            <option value="RPG">RPG</option>
                            <option value="Openworld">Openworld</option>
                            <option value="Horror">Horror</option>
                        </select>
                    </div>
                    {/* <div className="box_autocomplete mt-1">
                        <label htmlFor="" className="form-label">Name</label>
                   
                        <ReactSearchAutocomplete
                            items={steamList}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus
                            formatResult={formatResult}
                        />
                    </div> */}
                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Version</label>
                        <input
                            name="version"
                            className="form-control"
                            type="text"
                            placeholder="Version"
                            value={gameEdit?.version || ''}
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
                            value={gameEdit?.image_url || 'https://i.imgur.com/2XBqLsa.jpg'}
                            onChange={(e) => handleChangeInfo(e)}
                        />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="" className="form-label me-2">Image</label>
                        <img className="img-fluid img-thumbnail" style={{maxWidth:'200px'}}  src={gameEdit?.image_url} />
                    </div>      

                    <button className="btn btn-sm btn-primary mt-2 float-end d-block" onClick={(e) => handleUpdateInfo(e)}>update info</button>
                </form>
                </ModalBody>
            </Modal>
        </>
    );
}
