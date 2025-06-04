import InfoComponent from '@/components/InfoComponent';
import '@/styles/Home.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // <- Importamos el Footer
import HomeCarousel from '@/components/HomeCarousel';


function Home () {
  return (
    <div className='home'>
      <Header />
      <HomeCarousel />
      <div className='home__components'>
        <InfoComponent />
      </div>

      <Footer /> {/* <- Insertamos el Footer aquí */}
    </div>
  );
}

export default Home;