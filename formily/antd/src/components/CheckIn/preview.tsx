import React from 'react'
import { DnFC } from '@designable/react'
import { Card as AntdCard } from 'antd'
import { createBehavior, createResource } from '@designable/core'
import { createVoidFieldSchema, createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { FieldSchemas } from '../../fieldSchemas'
import { AllLocales } from '../../locales'
import { observer } from '@formily/reactive-react'
import { DroppableWidget } from '@designable/react'
import './styles.less'

export const CheckIn: DnFC<any> = observer((props) => {
  let isArray = false
  if (props.children) {
    isArray =
      Object.prototype.toString.call(props.children?.props?.children[0]) ===
      '[object Array]'
  }
  return (
    <AntdCard
      className="display-wrapper"
      {...props}
      title={
        <span data-content-editable="x-component-props.title">打卡组件</span>
      }
    >
      <DroppableWidget>
        {!isArray
          ? props.children?.props?.children[0]
          : props.children?.props?.children[0].filter(
            (item: any) => item.key.indexOf('CheckIn') < 0
          )}
      </DroppableWidget>
    </AntdCard>
  )
})

CheckIn.Behavior = createBehavior({
  name: 'CheckIn',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'CheckIn',
  designerProps: {
    propsSchema: createFieldSchema(null, FieldSchemas.CheckIn),
  },
  designerLocales: AllLocales.CheckIn,
})

CheckIn.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'CheckIn',
        'x-component-props': {
          title: '打卡组件',
        },
      },
    },
  ],
})
