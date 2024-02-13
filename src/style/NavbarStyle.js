import styled from "styled-components";

export const NavbarStyle = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #000;
  padding: 10px 0;

  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #adadad;
    }
  }
`;
