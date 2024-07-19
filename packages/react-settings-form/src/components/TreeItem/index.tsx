import React, { useState, useEffect, Fragment, useMemo } from 'react'
import { Tree, Button, Modal, Radio, RadioChangeEvent, Form, Input, Table } from 'antd'
import './styles.less'
import { observable } from '@formily/reactive'
import { usePrefix } from '@designable/react'
import { clone } from '@designable/shared'

export const TreeItem: React.FC<any> = observable((props) => {

  const { value = {}, onChange } = props
  const headers = {
    'Content-Type': 'application/json',
    'Workflow-Platform-Authorization':
      'R7P+1X8OQrdDGO6B+G4ZkRHtp1DTIZdvq+aNXa9UR5hViubDu7zIgbThItXx9xQnxG2ZFmYPzr4W0BLZDHww17BVnErrU8etYZPMRdJCArvNYvgPbpDocH6xaOoq+XlGd4germfwf3CcovUg+WFs6wWB4vtSSJVvNZYihnHLbxyVRWtoCjljS8IZkb9GONCdh0FBHP2rzWLOIaY794mclbbUWQ1mW3YIIVLFiRrf6fstpCTSZVZ7N+0K7uo0IV/6s//PmFWwVe6ELiCpBfXjUM6Ri1NOb46WQZksIFX+kggR/V+mIbEE/+cM+RNQXcnKVEJDmpAnfByAzd34d8eZ6UtmujQOGL3Y5rAJRRKXD3WakSYBGMLrv2wC0Lz0ckmUepH09co4C/uHyddds+sE/8nmb2y4vXFIpnj9hLyyU7+Zvh2or/FBP4UsuIHK0uG5U/e0tC+siEphsXq2ZR9jwNrvIHF0UnshnG7D67duOEXSUNhCoLKJfnrhLEMKF+rulHtnljRURyAlqMgo929HoWQYnM3kDcrgfo9giyRp7pZyq87xjNch6ylIKOK0qYIGWmnG9KArJRLyIeo345j5YKeIls1OdfHyGBERZp7LvDbB44H4KiIb31U2dkHpDx9nwBuUYx6I3bWXVFaKdPKxRr4iRylWsMvZgegi5pLzW2Xvak6NCn4VbiK3Zqj3KepTl/6rsgQJY3GPDlzmfwNhsO9qTo0KfhVuIrdmqPcp6lOwr5qZbkyflBbFn+xEVgWVjkIf0y30TiwlyURiWCbLhX1jKxlfYpizH3Uzl4DImpvANJdxlXrXc+bak/TXcz+agQhCO4GgomuvxlRmyX/a34vKeCBu3EneCmX5jaQYH5+8OrQbnwedEMkQmbTSWGwrHaSvDd61//TcAHzpLIbGejczr6TBEA3mH8WYFH3BWtFY4td9P/0eebVPxyMFwySLcuZoxcPUDdYrA29cn4BRK08lvaqrUP0ZO4liG+XiYHr+2K/KmNDhwrlLc/Vp0lGqAYfWPJbwXtUFzUPc8Pn4prKREKq1bC/Mk3WdLWXjBbDkt2HbDtT1IP/WEFCnaYXM9kA9prw/ULjSoL1qmzx9xMN2eMyFI6Hvs4oYFzT1BudiJhwx+BKFRdpKndZiYf/VTYABLmiqEVVbEnvjbB+gjkkDDiKWrS3Io+Qu5ujH2eSXjOHeeyllIcVRET3Ls0uK+XdQqS2mHoZ6zdyUIVyYnN3mZxhIVUOTZ+f6SySSQJEHQQx07zV2TqJO0pI80FuHKH1pFFR6zgVoW06JKAA+K7lVoLTMxjQ8TaL/BXhh/NMemtva/huAqkBgiyF/d5JCtDdMThpBXCzwJMideh2482Tfp24hkx4ey8tqY/1VV8WqbRHKhPjhpr+bk56mNm5jnws03Jh4byV+uEcQY8tsmvg16yp1zC0QUOW0L0ZCT6z4JQT/oY/Uii+nXKW1MBBD5oCJvDhsT8QUQd+fEVjIIg==',
  }
  let url1 = ''
  let url2 = ''
  let url3 = ''
  if (window.location.port === '10001') {
    url1 = '/workflow/design/form/sec/model/trees'
    url2 = '/workflow/design/form/sec/model/props'
    url3 = '/workflow/design/form/sec/model/meter/tree'
  } else {
    url1 = '/workflow/workflow/design/form/sec/model/trees'
    url2 = '/workflow/workflow/design/form/sec/model/props'
    url3 = '/workflow/workflow/design/form/sec/model/meter/tree'
  }

  const [form] = Form.useForm()

  const [modalVisible, setModalVisible] = useState(false)

  const [publicAuxiliary, setPublicAuxiliary] = useState([])
  const [meteringTopology, setMeteringTopology] = useState([])

  const [selectedProject, setSelectedProject] = useState(null)

  const [selectedEquip, setSelectedEquip] = useState({ dataCode: value?.dataCode, modelName: value?.modelName })

  const [selectedProps, setSelectedProps] = useState(value?.propertiesList)

  const [equipmentList, setEquipmentList] = useState([])

  const [displayEquipment, setDisplayEquipment] = useState([])

  const [systemType, setSystemType] = useState(value?.systemType ?? 'publicAuxiliary')

  const [equipmentType, setEquipmentType] = useState('dynamic')

  const [page, setPage] = useState(1)

  const [publicAuxiliaryTree1, setPublicAuxiliaryTree1] = useState([])
  const [publicAuxiliaryTree2, setPublicAuxiliaryTree2] = useState([])
  const [meteringTopologyTree1, setMeteringTopologyTree1] = useState([])

  const prefix = usePrefix('model-setter')

  const openModal = () => setModalVisible(true)
  const closeModal = () => {
    resetTable()
    setModalVisible(false)
  }

  const getTreeData = async () => {
    const result = await fetch(url1, {
      method: 'GET',
      headers,
    })
    result.json().then((res) => {
      setPublicAuxiliary([...res.data])
      if (value?.rootCode) {
        setSelectedProject(res.data.find(item => item.dataCode === value.rootCode))
      }
    })
  }

  const getMeteringTopology = async (projectCode) => {
    const url = `${url3}?dataCode=${projectCode}`
    const result = await fetch(url, {
      method: 'GET',
      headers,
    })
    result.json().then((res) => {
      setMeteringTopology([res.data])
      if (value?.rootCode) {
        setSelectedProject([res.data].find(item => item.dataCode === value.rootCode))
      }
    })
  }

  const getpropertiesData = async (code, type = 'dynamic') => {
    const result = await fetch(url2, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dataCode: code,
        propGroup: type,
        page: 1,
        limit: 99999,
      }),
    })
    result.json().then((res) => {
      setEquipmentList(res.data.props ?? [])
      setDisplayEquipment(res.data.props ?? [])
    })
  }

  const resetTable = () => {
    form.resetFields()
    setPage(1)
  }

  const handoff = ({ target: { value } }: RadioChangeEvent) => {
    if (systemType === value) return
    resetTable()
    setSystemType(value)
    if (value === 'meteringTopology') {
      getMeteringTopology(selectedProject.dataCode ?? props.value.rootCode)
    }
    setSelectedEquip({})
    setSelectedProps([])
  }

  const changeEquipType = ({ target: { value } }: RadioChangeEvent) => {
    if (equipmentType === value) return
    resetTable()
    setEquipmentType(value)
    getpropertiesData(selectedEquip?.dataCode, value)
  }

  const selectProject = (code) => {
    if (code.dataCode === selectedProject?.dataCode) return
    if (systemType === 'meteringTopology') {
      getMeteringTopology(code.dataCode)
    }
    resetTable()
    setSelectedProject(code)
    setSelectedEquip({})
    setSelectedProps([])
    setDisplayEquipment([])
    setPublicAuxiliaryTree1([])
    setPublicAuxiliaryTree2([])
    setMeteringTopologyTree1([])
  }

  const selectInvert = (record, selected, selectedRows) => {
    const newSelectedRows = selectedRows.filter(item => item)
    const allSelectedRow = selectedProps ? selectedProps.concat(newSelectedRows) : selectedRows
    const set = new Set(allSelectedRow)
    let propsArray = Array.from(set)
    if (!selected) {
      propsArray = propsArray.filter(({ dataCode }) => dataCode !== record.dataCode)
    }
    setSelectedProps(propsArray)

  }

  const setModel = () => {
    const treeDataItem = {
      rootCode: selectedProject.dataCode,
      key: selectedEquip.dataCode,
      title: selectedEquip.modelName,
      dataCode: selectedEquip.dataCode,
      modelName: selectedEquip.modelName,
      systemType: systemType,
      propertiesList: selectedProps ? selectedProps.map(({ dataCode, propCode, propName }) => ({ key: dataCode, value: propCode, children: propName, dataCode })) : []
    }
    onChange(treeDataItem)
    closeModal()
  }

  const handleSearch = (values) => {
    if (!values.propName) {
      setDisplayEquipment(clone(equipmentList))
      return
    }
    setPage(1)
    const temp = clone(equipmentList).filter(({ propName }) => propName.indexOf(values.propName) !== -1)
    setDisplayEquipment(temp)
  }

  const changePublicAuxiliaryTree1 = (selectedKeys, e) => {
    if (e.node.key === selectedEquip?.dataCode) return
    resetTable()
    getpropertiesData(selectedKeys[0], equipmentType)
    setSelectedEquip(e.node)
    setPublicAuxiliaryTree2([])
    setSelectedProps([])
    if (e.node.parentDataCode) {
      getPublicAuxiliaryTree(e.node.key)
    }
  }

  const changePublicAuxiliaryTree2 = (selectedKeys, e) => {
    if (e.node.key === selectedEquip?.dataCode) return
    resetTable()
    getpropertiesData(selectedKeys[0], equipmentType)
    setSelectedEquip(e.node)
    setSelectedProps([])
    if (e.node.parentDataCode) {
      getPublicAuxiliaryUnitTree(e.node.key)
    }
  }

  const changeUnitTree = (selectedKeys, e) => {
    if (e.node.key === selectedEquip?.dataCode) return
    resetTable()
    getpropertiesData(selectedKeys[0], equipmentType)
    setSelectedEquip(e.node)
    setSelectedProps([])
  }

  const changeMeteringTopologyTree1 = (selectedKeys, e) => {
    if (e.node.key === selectedEquip?.dataCode) return
    resetTable()
    getpropertiesData(selectedKeys[0], equipmentType)
    setSelectedEquip(e.node)
    setSelectedProps([])
    if (e.node.parentDataCode) {
      getMeteringTopologyTree(e.node.key)
    }
  }

  const getChildrenTree = (tree, code) => {
    let res = tree.find(({ dataCode }) => dataCode === code)
    if (res) return res
    for (let treeNode of tree) {
      if (treeNode.children && treeNode.children.length > 0) {
        res = getChildrenTree(treeNode.children, code)
        if (res) return res
      }
    }
    return null
  }

  const getPublicAuxiliaryTree = code => {

    const temp = getChildrenTree(clone(publicAuxiliary), code)
    if (!temp) {
      setPublicAuxiliaryTree1([])
      return
    }
    if (!temp.children || temp.children.length <= 0) {
      setPublicAuxiliaryTree1([temp])
      return
    }
    temp.children = temp?.children?.map(chil => ({ ...chil, children: [] }))
    setPublicAuxiliaryTree1([temp])
  }


  const getPublicAuxiliaryUnitTree = code => {
    const temp = getChildrenTree(publicAuxiliary, code)
    if (!temp) {
      setPublicAuxiliaryTree2([])
      return
    }
    if (!temp.children || temp.children.length <= 0) {
      setPublicAuxiliaryTree2([temp])
      return
    }
    setPublicAuxiliaryTree2([temp])
  }

  const getMeteringTopologyTree = code => {
    const temp = getChildrenTree(meteringTopology, code)
    if (!temp) {
      setMeteringTopologyTree1([])
      return
    }
    if (!temp.children || temp.children.length <= 0) {
      setMeteringTopologyTree1([temp])
      return
    }
    setMeteringTopologyTree1([temp])
  }

  const changePage = page => {
    setPage(page)
  }

  useEffect(
    () => {
      if (!modalVisible) return
      getTreeData()
      if (value.rootCode && value.systemType === 'meteringTopology') {
        getMeteringTopology(value.rootCode)
      }
      if (value?.key) {
        getpropertiesData(value.key)
      }
    }, [modalVisible]
  )

  useEffect(
    () => {
      if (equipmentList.length <= 0) return

    },
    [equipmentList]
  )
  return (
    <Fragment>
      <Button block onClick={openModal}>
        模型选择
      </Button>
      <Modal
        title="模型选择"
        width="80%"
        bodyStyle={{ padding: 10 }}
        destroyOnClose
        transitionName=""
        maskTransitionName=""
        maskClosable={false}
        visible={modalVisible}
        onCancel={closeModal}
        onOk={setModel}>
        <div className={`${prefix}-content`}>
          <div className={`${prefix}-left`}>
            <div className={`${prefix}-left-root`}>
              <div className={`${prefix}-left-root-header`}>
                <div className={`${prefix}-left-root-header-title`}>项目</div>
              </div>
              <div className={`${prefix}-left-root-content`}>
                {publicAuxiliary.map(item =>
                  <div key={item?.dataCode} className={`${prefix}-left-root-item ${selectedProject?.dataCode === item?.dataCode ? `${prefix}-left-root-item-active` : ''}`} onClick={() => selectProject(item)}>{item.modelName}</div>
                )}
              </div>
            </div>
            <div className={`${prefix}-left-tree`}>
              <div className={`${prefix}-left-tree-header`}>
                <div className={`${prefix}-left-tree-header-title`}>
                  模型</div>
                <div className={`${prefix}-left-tree-header-extra`}>
                  <Radio.Group value={systemType} onChange={handoff}>
                    <Radio.Button defaultChecked value='publicAuxiliary'>公辅系统</Radio.Button>
                    <Radio.Button value='meteringTopology'>计量拓扑</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div className={`${prefix}-left-tree-content`}>
                {systemType === 'publicAuxiliary' ?
                  (<Fragment>
                    <div className={`${prefix}-left-tree-system publicAuxiliary`}>
                      <div className={`${prefix}-left-tree-system-tree publicAuxiliary-system-tree`}>
                        <Tree
                          defaultExpandAll
                          autoExpandParent
                          selectedKeys={[selectedEquip?.dataCode]}
                          treeData={
                            publicAuxiliary.filter(itm => itm.dataCode === selectedProject?.dataCode).map(el => {
                              const child = el?.children?.map(chil => ({ ...chil, children: [] })) ?? []
                              return {
                                ...el,
                                children: child
                              }
                            })}
                          fieldNames={{
                            title: 'modelName',
                            key: 'dataCode',
                            children: 'children',
                          }}
                          onSelect={changePublicAuxiliaryTree1}>
                        </Tree>
                      </div>
                      <div className={`${prefix}-left-tree-system-tree publicAuxiliary-system-tree`}>
                        <Tree
                          defaultExpandAll
                          autoExpandParent
                          selectedKeys={[selectedEquip?.dataCode]}
                          treeData={publicAuxiliaryTree1}
                          fieldNames={{
                            title: 'modelName',
                            key: 'dataCode',
                            children: 'children',
                          }}
                          onSelect={changePublicAuxiliaryTree2}></Tree>
                      </div>
                    </div>
                    <div className={`${prefix}-left-tree-unit`}>
                      <Tree
                        defaultExpandAll
                        autoExpandParent
                        selectedKeys={[selectedEquip?.dataCode]}
                        treeData={publicAuxiliaryTree2}
                        fieldNames={{
                          title: 'modelName',
                          key: 'dataCode',
                          children: 'children',
                        }}
                        onSelect={changeUnitTree}></Tree>
                    </div>
                  </Fragment>) : (
                    <Fragment>
                      <div className={`${prefix}-left-tree-system meteringTopology`}>
                        <div className={`${prefix}-left-tree-system-tree meteringTopology-system-tree`}>
                          <Tree
                            defaultExpandAll
                            autoExpandParent
                            selectedKeys={[selectedEquip?.dataCode]}
                            treeData={
                              meteringTopology?.map(el => {
                                const child = el?.children?.map(chil => ({ ...chil, children: [] })) ?? []
                                return {
                                  ...el,
                                  children: child
                                }
                              })}
                            fieldNames={{
                              title: 'modelName',
                              key: 'dataCode',
                              children: 'children',
                            }}
                            onSelect={changeMeteringTopologyTree1}></Tree>
                        </div>
                      </div>
                      <div className={`${prefix}-left-tree-unit`}>
                        <Tree
                          autoExpandParent
                          defaultExpandAll
                          selectedKeys={[selectedEquip?.dataCode]}
                          treeData={meteringTopologyTree1}
                          fieldNames={{
                            title: 'modelName',
                            key: 'dataCode',
                            children: 'children',
                          }}
                          onSelect={changeUnitTree}></Tree>
                      </div>
                    </Fragment>
                  )
                }
              </div>
            </div>
          </div>
          <div className={`${prefix}-right`}>
            <div className={`${prefix}-right-header`}>
              {selectedEquip?.modelName ? selectedEquip?.modelName : (selectedProject?.modelName ?? '属性')}
            </div>
            <div className={`${prefix}-right-tab`}>
              <Radio.Group value={equipmentType} onChange={changeEquipType}>
                <Radio.Button value="basic">基础属性</Radio.Button>
                <Radio.Button value="static">静态属性</Radio.Button>
                <Radio.Button value="dynamic">动态属性</Radio.Button>
              </Radio.Group>
            </div>
            <div className={`${prefix}-right-search`}>
              <Form form={form} layout='inline' onFinish={handleSearch}>
                <Form.Item label="属性名称" name='propName'>
                  <Input></Input>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
              </Form>
            </div>
            <div className={`${prefix}-right-table`}>
              <Table
                dataSource={displayEquipment}
                rowSelection={
                  {
                    type: 'checkbox',
                    // onChange: selectedRow,
                    selectedRowKeys: selectedProps ? selectedProps?.map(item => item.dataCode) : value?.propertiesList?.map(itm => itm.key),
                    onSelect: selectInvert
                  }
                }
                pagination={
                  {
                    total: displayEquipment.length,
                    pageSize: 10,
                    current: page,
                    onChange: changePage
                  }
                }
                rowKey={(record) => record.dataCode}>
                <Table.Column title="序号" render={(text, record, index) => `${index + 1}`}></Table.Column>
                <Table.Column title="属性名称" dataIndex="propName" key="propName" ellipsis></Table.Column>
                <Table.Column title="属性编码" dataIndex="propCode" key="propCode" ellipsis></Table.Column>
                <Table.Column title="英文名称" dataIndex="rw" key="rw" ellipsis></Table.Column>
                <Table.Column title="属性类型" dataIndex="propType" key="propType" ellipsis></Table.Column>
                <Table.Column title="数据类型" dataIndex="dataType" key="dataType" ellipsis></Table.Column>
                <Table.Column title="单位" dataIndex="unit" key="unit" ellipsis></Table.Column>
                <Table.Column title="采集类型" dataIndex="otherType" key="otherType" ellipsis></Table.Column>
              </Table>
            </div>
          </div>
        </div>

      </Modal>
    </Fragment>
  )
})

