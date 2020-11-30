import { Button, Form, Input, InputNumber, Modal, message, Select } from 'antd';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import GameMode from '../../models/GameMode';
import { saveGameMode, updateGameMode } from '../../services/gameModes';
import staticData from '../../services/staticData';

function FormModal({ visible, onClose, contentToEdit }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const userContext = useContext(UserContext);

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
    const obj = new GameMode(values);
    obj.userName = userContext.user.name;

    let funcToCall = saveGameMode;
    if (contentToEdit) {
      obj.id = contentToEdit.id;
      funcToCall = updateGameMode;
    }

    if (obj.validate()) {
      funcToCall(obj)
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
      <Form
        form={form}
        {...formLayout}
        onFinish={onFinish}
        initialValues={contentToEdit ? contentToEdit : {}}
      >
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
          <InputNumber min={0} disabled={true} />
          {/* disabled devido a funcionalidade ainda não implementada */}
        </Form.Item>

        <Form.Item
          name={'errorLimit'}
          label={'Limite de Erros'}
          //   rules={defaultRules}
        >
          <InputNumber min={0} disabled />
          {/* disabled devido a funcionalidade ainda não implementada */}
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
