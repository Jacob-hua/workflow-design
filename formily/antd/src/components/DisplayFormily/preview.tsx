import React from 'react'
// import { createForm } from '@formily/core'
import { DnFC } from '@designable/react'
import { Card as AntdCard, Input } from 'antd'
import { createBehavior, createResource } from '@designable/core'
// import { observer } from '@formily/reactive-react'
// import { DroppableWidget } from '@designable/react'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
// import { Container } from '../../common/Container'
// import { FormProvider, createSchemaField } from '@formily/react'

import './index.less'

export const Display: DnFC<any> = (props) => {
  return (
    <AntdCard
      className="display-wrapper"
      {...props}
      title={
        <span data-content-editable="x-component-props.title">知识库组件</span>
      }
    >
      {props.isShowInsCode ? (
        <div className="form-data">
          <label>实例:</label>
          <Input
            className="input-wrapper"
            type="text"
            style={{ width: '500px' }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="display-http">本组件将自动拉取工单关联的知识库细项</div>
    </AntdCard>
  )
}

Display.Behavior = createBehavior({
  name: 'Display',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Display',
  designerProps: {
    propsSchema: createVoidFieldSchema(AllSchemas.DisplayFormily),
  },
  designerLocales: AllLocales.DisplayFormily,
})

Display.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<any>',
        'x-component': 'Display',
        'x-component-props': {
          'x-decorator': 'FormItem',
          pcHttpUrl: '/zhyw/pc/common/instance/knowledge/',
          appHttpUrl: '/zhyw/ap/common/instance/knowledge/',
          isShowInsCode: false,
        },
      },
    },
  ],
})
