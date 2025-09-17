import '@/styles/Home.scss';
import Header from '@/components/Header';
import InfoComponent from '@/components/home/InfoComponent';
import HomeCarousel from '@/components/home/HomeCarousel';
import Footer from '@/components/home/Footer'; 


function Home () {
  return (
    <div className='home'>
      <Header />
      <HomeCarousel />
      <div className='home__components'>
        <InfoComponent className='home__card'/>
      </div>
      <Footer />
    </div>
  );
}

export default Home;