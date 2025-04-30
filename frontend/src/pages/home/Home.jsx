import InfoComponent from '@/components/InfoComponent';
import '@/styles/Home.scss';
import Header from '@/components/Header';

function Home () {
  return (
        <div className='home'>
            <Header/>
            <div className='home__components'>
              <InfoComponent/>
            </div>
        </div>
  );
}

export default Home;
