import React, { Fragment } from 'react'
import { Card, CardProps } from 'antd'
import { TreeNode, createResource } from '@designable/core'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
  DnFC,
} from '@designable/react'
import { ArrayBase } from '@formily/antd'
import { observer } from '@formily/react'
import { LoadTemplate } from '../../common/LoadTemplate'
import { useDropTemplate } from '../../hooks'
import {
  hasNodeByComponentPath,
  queryNodesByComponentPath,
  createEnsureTypeItemsNode,
  findNodeByComponentPath,
  createNodeId,
} from '../../shared'
import { createArrayBehavior } from '../ArrayBase'
import cls from 'classnames'
import './styles.less'

interface CardExtendProps extends CardProps {
  foldable?: boolean
  addable?: boolean
}

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

const isArrayCardsOperation = (name: string) =>
  name === 'ArrayCards.Remove' || name === 'ArrayCards.MoveDown'

export const ArrayCards: DnFC<CardExtendProps> = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const designer = useDropTemplate('ArrayCards', (source) => {
    const indexNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: 'void',
        'x-component': 'ArrayCards.Index',
      },
    })
    const additionNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: 'void',
        title: '复制',
        'x-component': 'ArrayCards.Addition',
      },
    })
    const removeNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: 'void',
        title: 'remove',
        'x-component': 'ArrayCards.Remove',
      },
    })
    const foldNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: 'void',
        title: 'fold',
        'x-component': 'ArrayCards.MoveDown',
      },
    })
    // const moveDownNode = new TreeNode({
    //   componentName: node.componentName,
    //   props: {
    //     type: 'void',
    //     title: 'Addition',
    //     'x-component': 'ArrayCards.MoveDown',
    //   },
    // })
    // const moveUpNode = new TreeNode({
    //   componentName: node.componentName,
    //   props: {
    //     type: 'void',
    //     title: 'Addition',
    //     'x-component': 'ArrayCards.MoveUp',
    //   },
    // })

    const objectNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: 'object',
        'x-component': 'cardItems',
      },
      children: [indexNode, ...source, removeNode, foldNode],
    })
    return [objectNode, additionNode]
  })
  const renderCard = () => {
    if (node.children.length === 0) return <DroppableWidget />
    const additions = queryNodesByComponentPath(node, [
      'ArrayCards',
      'ArrayCards.Addition',
    ])
    const indexes = queryNodesByComponentPath(node, [
      'ArrayCards',
      '*',
      'ArrayCards.Index',
    ])
    const operations = queryNodesByComponentPath(node, [
      'ArrayCards',
      '*',
      isArrayCardsOperation,
    ])
    const children = queryNodesByComponentPath(node, [
      'ArrayCards',
      '*',
      (name) => name.indexOf('ArrayCards.') === -1,
    ])
    const propKeys = Object.keys(props)
    let properties = JSON.parse(JSON.stringify(props))
    propKeys.forEach((item) => {
      if (item === 'addable' || item === 'foldable') {
        delete properties[item]
      }
    })
    return (
      <ArrayBase disabled>
        <ArrayBase.Item index={0} record={null}>
          <Card
            {...properties}
            title={
              <Fragment>
                {indexes.map((node, key) => (
                  <TreeNodeWidget key={key} node={node} />
                ))}
                <span data-content-editable="x-component-props.title">
                  {props.title}
                </span>
              </Fragment>
            }
            className={cls('ant-formily-array-cards-item', props.className)}
            extra={
              <Fragment>
                {operations.map((node) => {
                  if (node.props.title === 'fold') {
                    if (props.foldable) {
                      return <TreeNodeWidget key={node.id} node={node} />
                    }
                  } else {
                    return <TreeNodeWidget key={node.id} node={node} />
                  }
                })}
              </Fragment>
            }
          >
            <div {...createNodeId(designer, ensureObjectItemsNode(node).id)}>
              {children.length ? (
                children.map((node) => (
                  <TreeNodeWidget key={node.id} node={node} />
                ))
              ) : (
                <DroppableWidget hasChildren={false} />
              )}
            </div>
          </Card>
        </ArrayBase.Item>
        {props.addable ? (
          additions.map((node) => <TreeNodeWidget key={node.id} node={node} />)
        ) : (
          <></>
        )}
      </ArrayBase>
    )
  }

  return (
    <div {...nodeId} className="dn-array-cards">
      {renderCard()}
      <LoadTemplate
        actions={[
          {
            title: node.getMessage('addIndex'),
            icon: 'AddIndex',
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'ArrayCards',
                  '*',
                  'ArrayCards.Index',
                ])
              )
                return
              const indexNode = new TreeNode({
                componentName: node.componentName,
                props: {
                  type: 'void',
                  'x-component': 'ArrayCards.Index',
                },
              })
              ensureObjectItemsNode(node).append(indexNode)
            },
          },

          {
            title: node.getMessage('addOperation'),
            icon: 'AddOperation',
            onClick: () => {
              const oldAdditionNode = findNodeByComponentPath(node, [
                'ArrayCards',
                'ArrayCards.Addition',
              ])
              if (!oldAdditionNode && props.addable) {
                const additionNode = new TreeNode({
                  componentName: node.componentName,
                  props: {
                    type: 'void',
                    title: '复制',
                    'x-component': 'ArrayCards.Addition',
                  },
                })
                ensureObjectItemsNode(node).insertAfter(additionNode)
              }
              const oldRemoveNode = findNodeByComponentPath(node, [
                'ArrayCards',
                '*',
                'ArrayCards.Remove',
              ])
              if (!oldRemoveNode) {
                ensureObjectItemsNode(node).append(
                  new TreeNode({
                    componentName: node.componentName,
                    props: {
                      type: 'void',
                      title: 'remove',
                      'x-component': 'ArrayCards.Remove',
                    },
                  })
                )
              }
              const oldFoldNode = findNodeByComponentPath(node, [
                'ArrayCards',
                '*',
                'ArrayCards.MoveDown',
              ])
              if (!oldFoldNode && props.foldable) {
                ensureObjectItemsNode(node).append(
                  new TreeNode({
                    componentName: node.componentName,
                    props: {
                      type: 'void',
                      title: 'fold',
                      'x-component': 'ArrayCards.MoveDown',
                    },
                  })
                )
              }
            },
          },
        ]}
      />
    </div>
  )
})

ArrayBase.mixin(ArrayCards)

ArrayCards.Behavior = createArrayBehavior('ArrayCards')

ArrayCards.Resource = createResource({
  icon: 'ArrayCardsSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'array',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayCards',
        'x-component-props': {
          title: '标题',
          addable: false,
          foldable: false,
        },
      },
    },
  ],
})
