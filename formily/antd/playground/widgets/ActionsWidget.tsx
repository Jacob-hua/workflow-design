import React, { useEffect } from 'react'
import { Space, Button } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { GlobalRegistry } from '@designable/core'
import { observer } from '@formily/react'
import { loadInitialSchema, saveSchema, cancle } from '../service'
export const ActionsWidget = observer(() => {
  const designer = useDesigner()
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
      <Button
        type="default"
        onClick={() => {
          cancle()
        }}
      >
        <TextWidget>取消</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
    </Space>
  )
})
