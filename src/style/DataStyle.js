import styled from "styled-components";

export const DataStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  div {
    img {
      height: 300px;
      width: 100%;
      object-fit: cover;
      transition: 0.4s ease-in-out;

      &:hover {
        box-shadow: 5px 5px 10px #000;
      }
    }
  }
`;
