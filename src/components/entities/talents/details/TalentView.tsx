import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Talent from "../../../../data/Talent";
import FormatedText from "../../../general_elements/FormatedText";
import P2PSender from "../../../p2p/P2PSender";
import TextButton from "../../../form_elements/TextButton";
import { useWebhook } from "../../../../hooks/webhookHook";
import {
  formatDiscordText,
  sendEmbedMessage,
} from "../../../../services/DiscordService";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

interface $Props {
  talent: Talent;
}

const TalentView = ({ talent }: $Props) => {
  let webhook = useWebhook();
  const [json, setJson] = useState<string>("");
  const [send, setSend] = useState<boolean>(false);

  useEffect(() => {
    if (webhook !== undefined) {
      let newJson = {
        username: webhook.name + " (SkirmishTome)",
        embeds: [
          {
            author: {
              name: talent.name,
            },
            fields: [
              {
                name: "Cost",
                value: talent.cost ? talent.cost : "-",
                inline: true,
              },
              {
                name: "Ticks",
                value: talent.ticks ? talent.ticks : "-",
                inline: true,
              },
              {
                name: "Stress",
                value: talent.type ? talent.stress : "passive",
                inline: true,
              },
              {
                name: "Prerequisite",
                value: formatDiscordText(talent.prerequisite),
              },
              {
                name: "Effect",
                value: formatDiscordText(talent.effect),
              },
            ],
          },
        ],
      };
      setJson(JSON.stringify(newJson));
    }
  }, [talent, webhook]);

  return (
    <CenterWrapper>
      <View>
        <Cost>
          <b>{talent.cost}</b>
        </Cost>

        <Name>
          <b>{talent.name}</b>
        </Name>

        <PropWrapper>
          <Prop>
            <PropTitle>Category: </PropTitle>
            {talent.category}
          </Prop>
          <Prop>
            <PropTitle>Type: </PropTitle>
            {talent.type ? (talent.isFlaw ? "trigger" : "active") : "Passive"}
          </Prop>
        </PropWrapper>
        <Text>
          <PropTitle>Prerequisite: </PropTitle>
          <FormatedText text={talent.prerequisite} />
        </Text>
        <Text>
          <PropTitle>Effect: </PropTitle>
          <FormatedText text={talent.effect} />
        </Text>
        {talent.isFlaw && talent.type && (
          <>
            <Text>
              <PropTitle>Trigger: </PropTitle>
              <FormatedText text={talent.trigger} />
            </Text>
            <PropWrapper>
              <PropTitle>Trigger Frequency: </PropTitle>
              <Prop>{talent.triggerFrequency}</Prop>
            </PropWrapper>
          </>
        )}
        {!talent.isFlaw && talent.type && (
          <PropWrapper>
            <Prop>
              <PropTitle>Swtress: </PropTitle>
              {talent.stress}
            </Prop>
          </PropWrapper>
        )}
        <PropWrapper>
          {webhook !== undefined && (
            <TextButton
              style={{
                backgroundColor: "#7289da",
              }}
              text={`Cast ${talent.name}`}
              icon={faDiscord}
              onClick={() => sendEmbedMessage(webhook, json)}
            />
          )}
          {!send && (
            <TextButton
              text={`Send ${talent.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={talent} mode={"THIS"} />}
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default TalentView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  max-width: 800px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const Cost = styled.div`
  height: auto;
  padding: 10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  float: left;
  text-align: center;
  border-top-right-radius: 3px;
  border-radius: 30px;
  margin: 0px 5px 5px 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  --notchSize: 15px;
  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    100% 0%,
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    0 100%
  );
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: 10px;
  --notchSize: 15px;
  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    100% 0%,
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    0 100%
  );
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 30px);
  margin: 10px 5px 5px 5px;
  float: left;
  line-height: 18px;
  padding: 10px;
  --notchSize: 15px;
  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    100% 0%,
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    0 100%
  );
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;
