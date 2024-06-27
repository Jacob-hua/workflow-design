import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Display } from '../../src/components/DisplayFormily'
import { Abnormal } from '../../src/components/Abnormal'
import { ChooseEq } from '../../src/components/ChooseEq'
// import { CheckIn } from '../../src/components/CheckIn'
import { DataTranscription } from '../../src/components/DataTranscription'

import {
  Form,
  FormItem,
  // DatePicker,
  // Checkbox,
  // Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  // Radio,
  Reset,
  // Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  // Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayCollapse,
  // ArrayTable,
  // ArrayCards,
} from '@formily/antd'
import { ArrayCards, TextArea, Radio, Checkbox, Upload, RangePicker, DatePicker, Select, Cascader } from '../../src/customComponents'
import { Card, Slider, Rate, Card as CheckIn } from 'antd'
import { TreeNode } from '@designable/core'
import { transformToSchema } from '@designable/formily-transformer'
import { TestComp } from '../../src'

const Text: React.FC<{
  value?: string
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode
  return React.createElement(tagName, props, value || content)
}

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    // ArrayTable,
    ArrayCollapse,
    ArrayCards,
    FormItem,
    DatePicker,
    RangePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    TextArea,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
    TestComp,
    Display,
    Abnormal,
    ChooseEq,
    CheckIn,
    DataTranscription,
  },
})

export interface IPreviewWidgetProps {
  tree: TreeNode
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), [])
  const { form: formProps, schema } = transformToSchema(props.tree)
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  )
}
