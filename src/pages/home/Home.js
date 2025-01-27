import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import './Home.css';
import Slider from './slider/Slider';
import Video_card from '../../components/video_card/Video_card';
import Side_Bar from './side_bar/Side_Bar';
import Slider_Category from './slider_category/Slider_Category';
import Slider_Shorts from '../../components/slider_shorts/Slider_Shorts';
import PlayerService from '../../service/PlayerService';
import Aos from 'aos'
import Cookies from 'js-cookie';

function Home() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [videosReu, setVideosReu] = useState([])
  const [videosRec, setVideosRec] = useState([])
  const [videosRet, setVideosRet] = useState([])
  const [videosRev, setVideosRev] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingMoreVideos, setLoadingMoreVideos] = useState(false);

  Aos.init({
    duration: 200
  });

  useEffect(() => {
    getVideosReu()
    getVideosRec()
    getVideosRet()
    getVideosRev()
    userProfile()
    function handleResize() {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScroll = () => {
    const scrolled = window.innerHeight + window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;

    if (!loadingMoreVideos && scrolled >= totalHeight - 200) {
      setLoadingMoreVideos(true);
      getMoreVideos(currentPage + 1);
    }
  };

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, loadingMoreVideos]);

  const getMoreVideos = async (page) => {
    const moreVideos = await PlayerService.buscarVideosHomeReu(page);
    if (moreVideos) {
      setVideosReu((prevVideos) => [...prevVideos, ...moreVideos]);
      setCurrentPage(page);
    }
    setLoadingMoreVideos(false);
  };

  const getVideosReu = async () => {
    const videos = await PlayerService.buscarVideosHomeReu(0)
    console.log(videos)
      if (videos) {
        setVideosReu(videos)
      } else {
        setVideosReu([])
      }
  } 

  const getVideosRec = async () => {
    const videos = await PlayerService.buscarVideosHomeRec(0)
    console.log(videos)
      if (videos) {
        setVideosRec(videos)
      } else {
        setVideosRec([])
      }
  }

  const getVideosRet = async () => {
    const videos = await PlayerService.buscarVideosHomeRet(0)
    console.log(videos)
      if (videos) {
        setVideosRet(videos)
      } else {
        setVideosRet([])
      }
  }

  const getVideosRev = async () => {
    const videos = await PlayerService.buscarVideosHomeRev(0)
    console.log(videos)
      if (videos) {
        setVideosRev(videos)
      } else {
        setVideosRev([])
      }
  }

  const userProfile = () => {
    const user = Cookies.get('user');
    if (user) {
      const userLogin = JSON.parse(user);
      if (userLogin) {
        return userLogin
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const renderDesktopView = () => (
    <>
      <Header userLogin={userProfile} />
      <Side_Bar />
      <div className='container__header__home'></div>
      <div className='container__home'>
        <div className='container__slider__base__desk'>
          <Slider_Category />
        </div>
        <div className='container__slider__base__desk'>
          <Slider />
        </div>
        <div className='container__video__cards__desk'>
          {videosRec.map((video) => (
            <Video_card key={video.uuid} video={video} />
          ))}
        </div>
        <div className='container__shorts__cards__desk'>
          <Slider_Shorts />
        </div>
        <div className='container__video__cards__desk'>
          {videosReu.map((video) => (
            <Video_card key={video.uuid} video={video} />
          ))}
        </div>
      </div>
    </>
  );

  const renderTabletView = () => (
    <>
      <Header />
      <div className='container__home'>
        <div className='container__slider__base__tablet'>
          <Slider_Category />
        </div>
        <div className='container__slider__base__tablet'>
          <Slider />
        </div>
        <div className='container__video__cards__tablet'>
          {videosRev.map((video) => (
            <Video_card key={video.uuid} video={video} />
          ))}
        </div>
        <div className='container__shorts__cards__tablet'>
          <Slider_Shorts />
        </div>
        <div className='container__video__cards__tablet'>
          {videosReu.map((video) => (
            <Video_card key={video.uuid} video={video} />
          ))}
        </div>
      </div>
    </>
  );

  const renderMobileView = () => (
    <>
      <Header />
      <div className='container__home'>
        <div className='container__slider__base'>
          <Slider />
        </div>
        <div className='container__video__cards'>
          {videosRet.map((video) => (
            <Video_card key={video.uuid} video={video} />
          ))}
        </div>
        <div className='container__shorts__cards__mobile'>
          <Slider_Shorts />
        </div>
        <div className='container__video__cards'>
          {videosReu.map((video) => (
            <Video_card key={video.uuid} video={video} />
          ))}
        </div>
      </div>
    </>
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
}

export default Home;