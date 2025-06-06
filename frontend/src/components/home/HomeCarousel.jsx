// components/home/HomeCarousel.jsx
import { Carousel } from 'react-bootstrap';
import img1 from '@/img/carrusel1.jpeg';
import img2 from '@/img/carrusel2.jpeg';
import '@/styles/HomeCarousel.scss'
const HomeCarousel = () => {
  return (
    <div className = 'home__carousel'>
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={img1} alt="Primera imagen" />
        <Carousel.Caption>
          <h3>Bienvenido a Taskly</h3>
          <p>Organiza tus tareas como nunca antes.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={img2} alt="Segunda imagen" />
        <Carousel.Caption>
          <h3>Personaliza tu calendario</h3>
          <p>Visualiza tus eventos de forma sencilla.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
};

export default HomeCarousel;