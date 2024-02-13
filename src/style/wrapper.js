import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 2% 10%;

  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    input {
      border: 1px solid #000;
      border-radius: 5px;
      padding: 5px;
      outline: none;
    }
    button {
      border: none;
      outline: none;
      color: #000;
      background-color: #dadada;
      padding: 10px;
      border-radius: 10px;
    }
  }
`;
