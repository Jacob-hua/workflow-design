import React from 'react'
import { Radio as FormilyRadio } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Radio: DnFC<React.ComponentProps<typeof FormilyRadio.Group>> =
  FormilyRadio.Group

Radio.Behavior = createBehavior({
  name: 'Radio',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Radio',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Radio.Group, 'Radio'),
  },
  designerLocales: AllLocales.RadioGroup,
})

Radio.Resource = createResource({
  icon: 'RadioGroupSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string | number',
        title: '单选',
        'x-decorator': 'FormItem',
        'x-component': 'Radio',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
      },
    },
  ],
})
