import cometaLogo from '../assets/cometa_logo.png';
import styled from 'styled-components';

const MainHeader = () => {
  return (
    <Header>
      <div className="logo">
        <img src={cometaLogo} alt="Logo de cometa" />
      </div>
      <nav>
        <ul>
          <li><a href="#">¿QUIÉNES SOMOS?</a></li>
          <li><a href="#">COLABORA</a></li>
          <li><a href="#">EN ADOPCIÓN</a></li>
          <li><a href="#">APARECIDOS</a></li>
          <li><a href="#">CONTACTO</a></li>
        </ul>
      </nav>
    </Header>
  );
};

const Header = styled.header`
  background-color: #ffffff;
  position: sticky;
  width: 100vw;
  height: 10vh;
  min-height: 8rem;
  padding: 0 5rem 0 5rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 3fr;

  .logo {
    img {
      width: 7rem;
    }
  }

  nav {
    display: flex;
    align-items: center;
    width: 100rem;
    
    ul {
      display: flex;
      justify-content: space-evenly;
      
    

      li {
        a {
          color: #000;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default MainHeader;
