import React from 'react'
// import { DatePicker as FormilyDatePicker } from '@formily/antd'
import { RangePicker as FormilyRangePicker } from '../../customComponents'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { FieldSchemas } from '../../fieldSchemas'

export const RangePicker: DnFC<
  React.ComponentProps<typeof FormilyRangePicker>
> = FormilyRangePicker

RangePicker.Behavior = createBehavior({
  name: 'RangePicker',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'RangePicker',
  designerProps: {
    propsSchema: createFieldSchema(
      AllSchemas.RangePicker,
      FieldSchemas.RangePicker
    ),
  },
  designerLocales: AllLocales.DateRangePicker,
})

RangePicker.Resource = createResource({
  icon: 'DateRangePickerSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string[]',
        title: '日期范围',
        'x-decorator': 'FormItem',
        'x-component': 'RangePicker',
        'x-component-props': {
          picker: 'date',
          allowClear: true,
        },
      },
    },
  ],
})
