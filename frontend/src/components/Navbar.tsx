import { Link } from "react-router-dom"; //Link är inte en default-export, utan en named export. Därför måste skrivas inom {}
// glöm inte att hämta react-router-dom med npm install react-router-dom
import styled from "styled-components";

// Navbar Component
function Navbar() {
  return (
    <Nav>
      <StyledLink to="/" style={{ textDecoration: "none" }}>
        <Logo>ResSmart.se</Logo>
      </StyledLink>{" "}
      <Links>
        <li>
          <StyledLink to="/">Hem</StyledLink>
        </li>
        <li>
          <StyledLink to="/om">Om</StyledLink>
        </li>
        <li>
          <StyledLink to="/kontakt">Kontakt</StyledLink>
        </li>
        {/* <li>
          <StyledLink to="/Resultat">Resultat</StyledLink>
        </li> */}
      </Links>
    </Nav>
  );
}
// Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 2rem;
  color: white;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const Links = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  width: 15%;
`;

//skapar alltså en ny komponent som bygger på Link men har egen CSS-stil.
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
export default Navbar;
