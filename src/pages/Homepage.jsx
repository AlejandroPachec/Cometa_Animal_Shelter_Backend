import styled from 'styled-components';
import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';




function HomePage () {
  return (
    <>
      <MainHeader />
      <Main>
        <section>
          <h2>Para comprar un animal sólo se necesita dinero</h2>
          <h1>PARA ADOPTAR UN ANIMAL SOLO SE NECESITA CORAZÓN</h1>
          <p>Adoptar un animal es mucho más que simplemente agregar un nuevo miembro a tu hogar. Al hacerlo, estás salvando una vida y marcando una gran diferencia en la vida de un animal necesitado. Además, estás liberando espacio en los refugios para que otros animales necesitados puedan tener una segunda oportunidad. Adoptar es una forma de hacer del mundo un lugar mejor y marcar la diferencia en la vida de un ser vivo. Así que, si estás pensando en agregar un nuevo miembro a tu hogar, por favor considera la adopción y salva una vida, para que otro animal necesitado pueda tener la misma oportunidad.</p>
          <button>¿Quiénes somos?</button>

        </section>
        <section>

        </section>
      </Main>
      <Footer />

    </>
  );
}

const Main = styled.main`
  width: 60%;
  margin-inline: auto;
  color: black;
  height: auto;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  h1 {
    font-size: 5.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  h2 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }







`;

export default HomePage;


