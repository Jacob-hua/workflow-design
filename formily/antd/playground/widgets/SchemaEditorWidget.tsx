import React from 'react'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { TreeNode, ITreeNode } from '@designable/core'
import { MonacoInput } from '@designable/react-settings-form'

export interface ISchemaEditorWidgetProps {
  tree: TreeNode
  onChange?: (tree: ITreeNode) => void
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  const defaultSchema = '{"form":{"labelCol":6,"warapperCol":12},"schema":{"type":"object","properties":{}}}'
  // const a = {
  //   form: {
  //     labelCol: 6,
  //     warapperCol: 12
  //   },
  //   schema: {
  //     type: 'object',
  //     properties: {},
  //     'x-designable-id': 'q0geqjk15nk'
  //   }
  // }
return (
  <MonacoInput
    {...props}
    value={JSON.stringify(transformToSchema(props.tree), null, 2)}
    onChange={(value) => {
      props.onChange?.(transformToTreeNode(JSON.parse(value || defaultSchema)))
    }}
    language="json"
  />
)
}
