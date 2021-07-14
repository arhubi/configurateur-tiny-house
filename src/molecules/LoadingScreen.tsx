import { Loader } from "../atoms/Loader";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: orange;
  color: white;
  z-index: 30;
`

export const LoadingScreen: React.FC = () => {
    return (
        <LoadingWrapper>
          <h2>Chargement du configurateur en cours...</h2>
          <Loader />
        </LoadingWrapper>
    );
}
