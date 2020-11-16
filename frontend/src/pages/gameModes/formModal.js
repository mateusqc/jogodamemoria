import { Button, Form, Input, InputNumber, Modal, message, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import GameMode from '../../models/GameMode';
import { saveGameMode } from '../../services/gameModes';
import staticData from '../../services/staticData';

function FormModal({ visible, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 17,
    },
  };

  const defaultRules = [
    { required: true, message: 'Por favor, informe um valor' },
  ];

  const onFinish = (values) => {
    console.log(values);
    const obj = new GameMode(values);
    obj.userName = 'Test';
    console.log(obj, obj.validate());

    if (obj.validate()) {
      saveGameMode(obj)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            onClose();
            message.success('Modo de Jogo salvo com sucesso!');
          } else {
            message.error('Erro ao salvar Modo de Jogo!');
          }
        })
        .catch((error) => {
          message.error('Erro ao salvar Modo de Jogo: ' + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      message.error(
        'Erro ao validar os campos, verifique os valores informados'
      );
    }
  };

  return (
    <Modal
      title={'Novo Modo de Jogo'}
      visible={visible}
      cancelText={'Cancelar'}
      okText={'Salvar'}
      closable={false}
      confirmLoading={loading}
      width={600}
      footer={null}
    >
      <Form form={form} {...formLayout} onFinish={onFinish}>
        <Form.Item name={'name'} label={'Nome'} rules={defaultRules}>
          <Input />
        </Form.Item>

        <Form.Item name={'level'} label={'Dificuldade'} rules={defaultRules}>
          <Select>
            {staticData.getGameModeLevel().map((item) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name={'y'} label={'Linhas'} rules={defaultRules}>
          <InputNumber min={2} />
        </Form.Item>

        <Form.Item name={'x'} label={'Colunas'} rules={defaultRules}>
          <InputNumber min={2} />
        </Form.Item>

        <Form.Item
          name={'figures'}
          label={'Número de Figuras'}
          rules={defaultRules}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          name={'pairsPerFigure'}
          label={'Pares por Figura'}
          rules={defaultRules}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          name={'timeLimit'}
          label={'Limite de Tempo (s)'}
          //   rules={defaultRules}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name={'errorLimit'}
          label={'Limite de Erros'}
          //   rules={defaultRules}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 16 }}>
          <Button
            onClick={onClose}
            disabled={loading}
            style={{ marginRight: '10px' }}
          >
            Cancelar
          </Button>
          <Button type='primary' loading={loading} htmlType='submit'>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormModal;
