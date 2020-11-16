import { Descriptions, Drawer } from 'antd';
import React from 'react';
import GameMode from '../../models/GameMode';
import staticData from '../../services/staticData';
import { gateLabelFromValue } from '../../utils/utils';

function DetailsDrawer({ onClose, data = {}, title }) {
  const obj = new GameMode(data ? data : {});

  return (
    <Drawer
      width={300}
      title={`Detalhes - ${obj.name}`}
      visible={data}
      onClose={onClose}
    >
      <Descriptions column={1}>
        <Descriptions.Item label='Dificuldade'>
          {gateLabelFromValue(obj.level, staticData.getGameModeLevel())}
        </Descriptions.Item>
        <Descriptions.Item label='Linhas'>{obj.y}</Descriptions.Item>
        <Descriptions.Item label='Colunas'>{obj.x}</Descriptions.Item>
        <Descriptions.Item label='Número de Figuras'>
          {obj.figures}
        </Descriptions.Item>
        <Descriptions.Item label='Número de Pares por Figura'>
          {obj.pairsPerFigure}
        </Descriptions.Item>
        <Descriptions.Item label='Limite de Tempo'>{`${obj.timeLimit} segundos`}</Descriptions.Item>
        <Descriptions.Item label='Limite de Jogadas Erradas'>
          {obj.errorLimit}
        </Descriptions.Item>
        <Descriptions.Item label='Tipo'>
          {gateLabelFromValue(obj.type, staticData.getGameModeType())}
        </Descriptions.Item>
        {obj.userName && (
          <Descriptions.Item label='Autor'>
            {gateLabelFromValue(obj.userName, staticData.getGameModeType())}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Drawer>
  );
}

export default DetailsDrawer;
