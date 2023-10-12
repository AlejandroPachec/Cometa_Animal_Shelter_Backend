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
  background-color: #fff;
  padding: 1rem 2rem;
  position: sticky;
  width: 100vw;
  height: 10vh;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;

  .logo {
    img {
      width: 120px;
    }
  }

  nav {
    width: 50%;
    
    ul {
      display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-row-gap: 2rem;
    

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
