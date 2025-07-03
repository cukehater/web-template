'use client'

import '@ant-design/v5-patch-for-react-19'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { FieldType } from '../model/types'

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

export default function LoginForm() {
  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      className='w-md'
    >
      <Form.Item<FieldType>
        label='ID'
        name='id'
        rules={[{ required: true, message: 'ID를 입력해 주세요.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[{ required: true, message: '비밀번호를 입력해 주세요.' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name='remember'
        valuePropName='checked'
        label={null}
      >
        <Checkbox>ID 기억하기</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}
