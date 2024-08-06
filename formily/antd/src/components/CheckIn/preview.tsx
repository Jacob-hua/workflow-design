import React, { Fragment } from 'react'
import { DnFC, useTreeNode } from '@designable/react'
import { Card as AntdCard } from 'antd'
import { createBehavior, createResource } from '@designable/core'
import { createVoidFieldSchema, createFieldSchema } from '../Field'
import { FieldSchemas } from '../../fieldSchemas'
// import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { observer } from '@formily/reactive-react'
import './styles.less'

// import { queryNodesByComponentPath } from '../../shared'

export const CheckIn: DnFC<any> = observer((props) => {
  // let isArray = false
  // const node = useTreeNode()
  // if (props.children) {
  //   isArray =
  //     Object.prototype.toString.call(props.children?.props?.children[0]) ===
  //     '[object Array]'
  // }
  return (
    <AntdCard
      {...props}
      title={
        <Fragment>
          <span data-content-editable="x-component-props.title">打卡组件</span>
        </Fragment>
      }
    >
      {props.children}
    </AntdCard>
  )
})

CheckIn.Behavior = createBehavior({
  name: 'CheckIn',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'CheckIn',
  designerProps(node) {
    return {
      propsSchema: createFieldSchema(null, FieldSchemas.CheckIn),
      cloneable: false,
    }
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
        'x-decorator': 'FormItem',
        'x-component': 'CheckIn',
        'x-component-props': {
          title: '打卡组件',
        },
      },
    },
  ],
})
