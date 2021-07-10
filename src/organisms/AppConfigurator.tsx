import { Steps } from "./Steps";
import { Summary } from "./Summary";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "axios";
import { getValidItems, mapSettingsResults } from "../utils/notion";
import { StepProps } from "../molecules/Step";
import styled from "styled-components";
import { device } from "../theme/device";
import { ConfiguratorBanner } from "../molecules/ConfiguratorBanner";

const AppConfiguratorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;
  text-align: center;
  width: 100%;

  .configurator {
    display: flex;
    position: relative;
    justify-content: space-between;
    width: 100%;

    @media screen and ${device.laptop} {
      width: 80%;
    }
  }
  
  .configurator-main {
    position: relative;
    width: 100%;
  }

  .configurator-intro {
    display: none;
    padding: 2rem;
    
    @media screen and ${device.laptop} {
      display: block;
    }
  }

  .configurator-intro h2 {
    margin: 0;
  }
`;

export const AppConfigurator: React.FC = () => {
  const SECTION_ID = 'a8afc4ffdb18418aab047c5628f365c2'
  const SETTINGS_ID = '3c3936ea062842bdada70c592e90b46b'
  const dispatch = useDispatch()

  const steps: any = useSelector((state: RootState) => state.steps)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/blocks/${SECTION_ID}/children`)
      const stepsIds = data.results?.map((item: any) => item.id)

      const { data: settingsData } = await axios.post(`/databases/${SETTINGS_ID}/query`)
      const settings = settingsData.results.map((result:any) => mapSettingsResults(result))

      const steps: StepProps[] = await Promise.all(
        stepsIds.map(async (id: string, index: number) => {
          const { data } = await axios.get(`/databases/${id}`)
          const title = data.title[0].plain_text
          const relatedSettings = settings.find((setting: any) => setting.title === title)

          const { data: postsData } = await axios.post(`/databases/${id}/query`)
          const itemsCount = getValidItems(postsData.results)

          return {
            title,
            itemsCount,
            notionDbId: id,
            isActive: index === 0,
            isCurrent: index === 0,
            isEnabled: index === 0,
            ...relatedSettings
          }
        })
      )
      dispatch({ type: 'steps/set-all', payload: steps.filter((step: StepProps) => step.itemsCount > 0) })
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <AppConfiguratorWrapper>
      <ConfiguratorBanner />
      <div className="configurator">
        <div className="configurator-main">
          <div className="configurator-intro">
            <h2>Choisissez les composants de votre tiny house</h2>
          </div>
          <Steps steps={steps} isLoading={!steps.length}/>
        </div>
        <Summary/>
      </div>
    </AppConfiguratorWrapper>
  )
}
