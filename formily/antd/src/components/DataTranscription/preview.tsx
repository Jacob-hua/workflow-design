import React from 'react'
import { DnFC } from '@designable/react'
import { Card as AntdCard, Input as AntdInput } from 'antd'
import { createBehavior, createResource } from '@designable/core'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

export const DataTranscription: DnFC<any> = (props) => {
  const inputVal = props.models?.title ?? ''
  const propertyList = props.models?.propertiesList ?? []
  return (
    <AntdCard
      className="transcription-wrapper"
      {...props}
      title={
        <span data-content-editable="x-component-props.title">
          数据抄录组件
        </span>
      }
    >
      <div className="eq-list-item">
        <label>模型:</label>
        <AntdInput className="input-wrapper" value={inputVal} />
      </div>
      <div className="eq-list-item">
        <label>属性:</label>
        <div className="box-wrapper">
          {propertyList.map((item) => (
            <span key={item.value}>{item.children}</span>
          ))}
        </div>
      </div>
    </AntdCard>
  )
}

DataTranscription.Behavior = createBehavior({
  name: 'DataTranscription',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'DataTranscription',
  designerProps: {
    propsSchema: createVoidFieldSchema(AllSchemas.DataTranscription),
  },
  designerLocales: AllLocales.DataTranscription,
})

DataTranscription.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Object',
        // 'x-decorator': 'FormItem',
        'x-component': 'DataTranscription',
      },
    },
  ],
})
