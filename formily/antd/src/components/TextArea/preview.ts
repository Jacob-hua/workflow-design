import React from 'react'
import { Input as FormilyInput } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { FieldSchemas } from '../../fieldSchemas'

export const TextArea: DnFC<React.ComponentProps<typeof FormilyInput.TextArea>> =
  FormilyInput.TextArea

TextArea.Behavior = createBehavior(
  {
    name: 'TextArea',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'TextArea',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input.TextArea, FieldSchemas.TextArea),
    },
    designerLocales: AllLocales.TextArea,
  }
)

TextArea.Resource = createResource(
  {
    icon: 'TextAreaSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '多行输入',
          'x-decorator': 'FormItem',
          'x-component': 'TextArea',
        },
      },
    ],
  }
)
