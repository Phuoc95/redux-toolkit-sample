import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsername, selectInfo, selectInfos } from "../store/userSlice";
import { updateInfos } from '../store/userSlice';
import axios from "axios";
import _ from 'lodash';
import { Modal, ModalBody, ModalHeader, UncontrolledCarousel, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';
import { useDispatch } from 'react-redux';


export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [gameDetail, setGameDetail] = useState({});

    const dispatch = useDispatch();

    // Select username from store
    const username = useSelector(selectUsername);
    var data  = useSelector(selectInfo);
    var infos = useSelector(selectInfos);
        infos = _.orderBy(infos, ['id'],['desc']);

    const showModal = (e, appid) => {
        e.preventDefault();
        axios.get('https://store.steampowered.com/api/appdetails?appids='+appid)
        .then(function (res) {
            let data = res?.data?.[appid]?.data;
            setGameDetail(data);
            console.log(gameDetail, 'gameDetailgameDetail');

            setOpen(true);
            // debugger
            // dispatch(updateInfos(infos));

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function renderScreenshot() {
        let screenshots = gameDetail?.screenshots || [];
        screenshots = screenshots.map((item, index) => {
            return {
                ...item,
                // altText: 'Slide 1', 
                caption: 'Slide '+(index+1),
                key: index,
                // src: item.path_thumbnail
                src: item.path_full
            }
        })
        console.log(screenshots, 'screenshotssss');
        return screenshots;
        debugger
    }

    // var infos = [
        // {
        // "id": 1,
        // "name": "the last of us",
        // "type": "rpg",
        // "version": "1.01"
        // }
    // ];

    useEffect(() => {
        axios.get('http://localhost:3000/infos')
            .then(function (res) {
                infos = res?.data || [];
                dispatch(updateInfos(infos));

                console.log(infos, 'infos');
            })
            .catch(function (error) {
                console.log(error);
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
                            <th>#</th>
                            <th>AppID</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Version</th>
                            <th>Image</th>
                            <th>DLC</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            infos.map((item, index) => {
                                // console.log(item, 'iem');
                                let url = `https://steamcdn-a.akamaihd.net/steam/apps/${item.appid}/header.jpg`

                                return (
                                    <tr key={index}>
                                        <th>{item.id}</th>
                                        <th>{item.appid}</th>
                                        <td>{item.type}</td>
                                        <td>{item.name}</td>
                                        <td>{item.version}</td>
                                        <td>
                                            <a href="#" > <img className="img-fluid img-thumbnail" style={{maxWidth:'120px'}}  src={url} /> </a>
                                        </td>
                                        <td>DLC</td>
                                        <td>
                                            <button onClick={(e) => showModal(e, item.appid)} className="btn btn-sm btn-primary"> <i className="fas fa-info-circle"></i> </button>
                                        </td>
                                    </tr> 
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

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

                    <p dangerouslySetInnerHTML={{__html: gameDetail?.detailed_description }}></p>

                    {/* <Carousel
                        activeIndex={0}
                        dark
                        next={function noRefCheck(){}}
                        previous={function noRefCheck(){}}
                        >
                        <CarouselIndicators
                            activeIndex={0}
                            items={[
                            {
                                altText: 'Slide 1',
                                caption: 'Slide 1',
                                key: 1,
                                src: 'https://picsum.photos/id/123/1200/600'
                            },
                            {
                                altText: 'Slide 2',
                                caption: 'Slide 2',
                                key: 2,
                                src: 'https://picsum.photos/id/456/1200/600'
                            },
                            {
                                altText: 'Slide 3',
                                caption: 'Slide 3',
                                key: 3,
                                src: 'https://picsum.photos/id/678/1200/600'
                            }
                            ]}
                            onClickHandler={function noRefCheck(){}}
                        />
                        <CarouselItem
                            onExited={function noRefCheck(){}}
                            onExiting={function noRefCheck(){}}
                        >
                            <img
                            alt="Slide 1"
                            src="https://picsum.photos/id/123/1200/600"
                            />
                            <CarouselCaption
                            captionHeader="Slide 1"
                            captionText="Slide 1"
                            />
                        </CarouselItem>
                        <CarouselItem
                            onExited={function noRefCheck(){}}
                            onExiting={function noRefCheck(){}}
                        >
                            <img
                            alt="Slide 2"
                            src="https://picsum.photos/id/456/1200/600"
                            />
                            <CarouselCaption
                            captionHeader="Slide 2"
                            captionText="Slide 2"
                            />
                        </CarouselItem>

                        <CarouselControl
                            direction="prev"
                            directionText="Previous"
                            onClickHandler={function noRefCheck(){}}
                        />

                        <CarouselControl
                            direction="next"
                            directionText="Next"
                            onClickHandler={function noRefCheck(){}}
                        />
                    </Carousel>
                */}            

                    <p dangerouslySetInnerHTML={{__html: gameDetail?.pc_requirements?.minimum }}></p>

                    <p dangerouslySetInnerHTML={{__html: gameDetail?.pc_requirements?.recommended }}></p>

                    <figure class="text-end">
                        <blockquote class="blockquote">
                            <p>A well-known quote, contained in a blockquote element.</p>
                        </blockquote>
                        <figcaption class="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                        </figcaption>
                    </figure>
                </ModalBody>
            </Modal>
        </>
    );
}
