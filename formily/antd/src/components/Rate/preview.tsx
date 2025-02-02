import React from 'react'
import { Rate as AntdRate } from 'antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { FieldSchemas } from '../../fieldSchemas'

export const Rate: DnFC<React.ComponentProps<typeof AntdRate>> = AntdRate

Rate.Behavior = createBehavior({
  name: 'Rate',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Rate',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Rate, FieldSchemas.Rate),
  },
  designerLocales: AllLocales.Rate,
})

Rate.Resource = createResource({
  icon: 'RateSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: '评分',
        'x-decorator': 'FormItem',
        'x-component': 'Rate',
        'x-component-props': {
          count: 5,
          allowClear: true,
        },
      },
    },
  ],
})
