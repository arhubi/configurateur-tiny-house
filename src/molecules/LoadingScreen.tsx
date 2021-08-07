import { Loader } from "../atoms/Loader";
import styled from "styled-components";
import { version } from "../../package.json"

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

const AppVersion = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1rem;
  `

export const LoadingScreen: React.FC = () => {
    return (
        <LoadingWrapper>
          <h2>Chargement du configurateur en cours...</h2>
          <Loader />
          <AppVersion>Version { version }</AppVersion>
        </LoadingWrapper>
    );
}
