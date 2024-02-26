import React, { useEffect } from 'react'
import { Space, Button, Radio } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { GlobalRegistry } from '@designable/core'
import { observer } from '@formily/react'
import { loadInitialSchema, saveSchema, publishSchema } from '../service'
import { useNavigate } from 'react-router-dom'
import { transformToSchema } from '@designable/formily-transformer'
export const ActionsWidget = observer(() => {
  const designer = useDesigner()
  const navigate = useNavigate()
  useEffect(() => {
    loadInitialSchema(designer)
  }, [])
  const supportLocales = ['zh-cn', 'en-us']
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn')
    }
  }, [])
  return (
    <Space style={{ marginRight: 10 }}>
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value)
        }}
      />
      <Button
        onClick={() => {
          saveSchema(designer)
          if ((window as any).__POWERED_BY_QIANKUN__) {
            navigate('/preview', {
              state: transformToSchema(designer.getCurrentTree()),
            })
          }
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          publishSchema(designer)
          if ((window as any).__POWERED_BY_QIANKUN__) {
            navigate('/preview', {
              state: transformToSchema(designer.getCurrentTree()),
            })
          }
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  )
})
