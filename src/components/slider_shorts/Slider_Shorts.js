import React, { useEffect, useState } from 'react'
import './Slider_Shorts.css'
import Slider from 'react-slick';
import Shortcard from '../short_card/ShortCard';
import PlayerService from '../../service/PlayerService';

function Slider_Shorts() {

    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
    const [videosRec, setVideosRec] = useState([])

    useEffect(() => {
        getVideosRec();
        function handleResize() {
            setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getVideosRec = async () => {
        const videos = await PlayerService.buscarVideosHomeRec(0);
        console.log(videos);
        if (videos) {
            const filteredVideos = videos.filter(video => video.shorts === true);
            if (filteredVideos.length > 0) {
                setVideosRec(filteredVideos);
            } else {
                setVideosRec([]);
            }
        } else {
            setVideosRec([]);
        }
    };

    const settingsDesk = {
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerPadding: '40px',
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    swipeToSlide: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerPadding: '40px',
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    swipeToSlide: true,
                    arrows: false,
                }
            }
        ]
    };

    const settingsTablet = {
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerPadding: '40px',
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerPadding: '40px',
                    slidesToShow: 3,
                }
            }
        ]
    };

    const settingsMobile = {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerPadding: '40px',
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerPadding: '40px',
                    slidesToShow: 2,
                }
            }
        ]
    };

    const renderDesktopView = () => (
        <Slider {...settingsDesk}>
            {videosRec.map((video) => (
                <Shortcard key={video.uuid} />
            ))}
        </Slider>
    );

    const renderTabletView = () => (
        <Slider {...settingsTablet}>
            {videosRec.map((video) => (
                <Shortcard key={video.uuid} />
            ))}
        </Slider>
    );

    const renderMobileView = () => (
        <Slider {...settingsMobile}>
            {videosRec.map((video) => (
                <Shortcard key={video.uuid} />
            ))}
        </Slider>
    );

    const getViewToRender = () => {
        if (screenSize.width > 900) {
            return renderDesktopView();
        } else if (screenSize.width < 900 && screenSize.width > 500) {
            return renderTabletView();
        } else {
            return renderMobileView();
        }
    };

    return <>{getViewToRender()}</>;

};

export default Slider_Shorts