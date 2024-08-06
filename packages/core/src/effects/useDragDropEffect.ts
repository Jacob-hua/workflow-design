import {
  Engine,
  ClosestPosition,
  CursorType,
  CursorDragType,
  TreeNode,
} from '../models'
import {
  DragStartEvent,
  DragMoveEvent,
  DragStopEvent,
  ViewportScrollEvent,
} from '../events'
import { Point } from '@designable/shared'

const isCheckIn = (componentNode) => {
  if (componentNode?.props?.['x-component'] === 'CheckIn') {
    return true
  } else {
    if (!componentNode?.parent) {
      return false
    } else {
      return isCheckIn(componentNode.parent)
    }
  }
}

const hasCheckIn = (treeNodes, dragNode) => {
  let flag = false
  treeNodes.eachTree((node) => {
    if (node.props?.['x-component'] === 'CheckIn' && node.id !== dragNode.id) {
      flag = true
    }
  })
  return flag
}

export const useDragDropEffect = (engine: Engine) => {
  engine.subscribeTo(DragStartEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal) return
    const target = event.data.target as HTMLElement
    const el = target?.closest(`
       *[${engine.props.nodeIdAttrName}],
       *[${engine.props.sourceIdAttrName}],
       *[${engine.props.outlineNodeIdAttrName}]
      `)
    const handler = target?.closest(
      `*[${engine.props.nodeDragHandlerAttrName}]`
    )
    const helper = handler?.closest(
      `*[${engine.props.nodeSelectionIdAttrName}]`
    )
    if (!el?.getAttribute && !handler) return
    const sourceId = el?.getAttribute(engine.props.sourceIdAttrName)
    const outlineId = el?.getAttribute(engine.props.outlineNodeIdAttrName)
    const handlerId = helper?.getAttribute(engine.props.nodeSelectionIdAttrName)
    const nodeId = el?.getAttribute(engine.props.nodeIdAttrName)
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const moveHelper = operation.moveHelper
      if (nodeId || outlineId || handlerId) {
        const node = engine.findNodeById(outlineId || nodeId || handlerId)
        if (node) {
          if (!node.allowDrag()) return
          if (node === node.root) return
          const validSelected = engine
            .getAllSelectedNodes()
            .filter((node) => node.allowDrag())
          if (validSelected.some((selectNode) => selectNode === node)) {
            moveHelper.dragStart({ dragNodes: TreeNode.sort(validSelected) })
          } else {
            moveHelper.dragStart({ dragNodes: [node] })
          }
        }
      } else if (sourceId) {
        const sourceNode = engine.findNodeById(sourceId)
        if (sourceNode) {
          moveHelper.dragStart({ dragNodes: [sourceNode] })
        }
      }
    })
    engine.cursor.setStyle('move')
  })

  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal) return
    if (engine.cursor.dragType !== CursorDragType.Move) return
    const target = event.data.target as HTMLElement
    const el = target?.closest(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `)
    const point = new Point(event.data.topClientX, event.data.topClientY)
    const nodeId = el?.getAttribute(engine.props.nodeIdAttrName)
    const outlineId = el?.getAttribute(engine.props.outlineNodeIdAttrName)
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const moveHelper = operation.moveHelper
      const dragNodes = moveHelper.dragNodes
      const tree = operation.tree
      if (!dragNodes.length) return
      const touchNode = tree.findById(outlineId || nodeId)
      moveHelper.dragMove({
        point,
        touchNode,
      })
    })
  })

  engine.subscribeTo(ViewportScrollEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal) return
    if (engine.cursor.dragType !== CursorDragType.Move) return
    const point = new Point(
      engine.cursor.position.topClientX,
      engine.cursor.position.topClientY
    )
    const currentWorkspace =
      event?.context?.workspace ?? engine.workbench.activeWorkspace
    if (!currentWorkspace) return
    const operation = currentWorkspace.operation
    const moveHelper = operation.moveHelper
    if (!moveHelper.dragNodes.length) return
    const tree = operation.tree
    const viewport = currentWorkspace.viewport
    const outline = currentWorkspace.outline
    const viewportTarget = viewport.elementFromPoint(point)
    const outlineTarget = outline.elementFromPoint(point)
    const viewportNodeElement = viewportTarget?.closest(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `)
    const outlineNodeElement = outlineTarget?.closest(`
    *[${engine.props.nodeIdAttrName}],
    *[${engine.props.outlineNodeIdAttrName}]
  `)
    const nodeId = viewportNodeElement?.getAttribute(
      engine.props.nodeIdAttrName
    )
    const outlineNodeId = outlineNodeElement?.getAttribute(
      engine.props.outlineNodeIdAttrName
    )
    const touchNode = tree.findById(outlineNodeId || nodeId)
    moveHelper.dragMove({ point, touchNode })
  })

  engine.subscribeTo(DragStopEvent, () => {
    if (engine.cursor.type !== CursorType.Normal) return
    if (engine.cursor.dragType !== CursorDragType.Move) return
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const moveHelper = operation.moveHelper
      const dragNodes = moveHelper.dragNodes
      const closestNode = moveHelper.closestNode
      const closestDirection = moveHelper.closestDirection
      const selection = operation.selection
      if (!dragNodes.length) return
      // console.log(hasCheckIn(operation.tree));
      // const dragNode = dragNodes.find()
      let checkIn = false
      let dragNode = null
      dragNodes.forEach((node) => {
        if (node.props['x-component'] === 'CheckIn') {
          checkIn = true
          dragNode = node
        }
      })

      if (checkIn) {
        if (hasCheckIn(operation.tree, dragNode)) return
        let parent = null
        if (
          closestNode?.props?.['x-component'] === 'ArrayCards' &&
          dragNodes[0].depth !== closestNode.depth
        ) {
          parent = closestNode
          parent.props['x-component-props'].addable = false
          dragNodes[0].resetNodesParent(dragNodes, parent)
        } else if (
          closestNode?.parent?.props?.['x-component'] === 'ArrayCards'
        ) {
          parent = closestNode?.parent
          parent.props['x-component-props'].addable = false
          closestNode.resetNodesParent([closestNode], parent)
        } else if (
          closestNode?.parent?.parent?.props?.['x-component'] === 'ArrayCards'
        ) {
          parent = closestNode?.parent?.parent
          parent.props['x-component-props'].addable = false
          closestNode.parent.resetNodesParent([closestNode.parent], parent)
        }
      }
      if (dragNodes.length && closestNode && closestDirection) {
        if (
          closestDirection === ClosestPosition.After ||
          closestDirection === ClosestPosition.Under
        ) {
          if (closestNode.allowSibling(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.insertAfter(
                ...TreeNode.filterDroppable(dragNodes, closestNode.parent)
              )
            )
          }
        } else if (
          closestDirection === ClosestPosition.Before ||
          closestDirection === ClosestPosition.Upper
        ) {
          if (closestNode.allowSibling(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.insertBefore(
                ...TreeNode.filterDroppable(dragNodes, closestNode.parent)
              )
            )
          }
        } else if (
          closestDirection === ClosestPosition.Inner ||
          closestDirection === ClosestPosition.InnerAfter
        ) {
          if (
            closestNode.props['x-component'] === 'ArrayCards' &&
            closestNode.children.length
          )
            return
          if (closestNode.allowAppend(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.append(
                ...TreeNode.filterDroppable(dragNodes, closestNode)
              )
            )
            moveHelper.dragDrop({ dropNode: closestNode })
          }
        } else if (closestDirection === ClosestPosition.InnerBefore) {
          if (closestNode.allowAppend(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.prepend(
                ...TreeNode.filterDroppable(dragNodes, closestNode)
              )
            )
            moveHelper.dragDrop({ dropNode: closestNode })
          }
        }
      }
      moveHelper.dragEnd()
    })
    engine.cursor.setStyle('')
  })
}
