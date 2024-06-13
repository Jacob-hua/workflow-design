// { label: 'URL地址', value: 'url' },
// { label: '邮箱格式', value: 'email' },
// { label: '数字格式', value: 'number' },
// { label: '整数格式', value: 'integer' },
// { label: '身份证格式', value: 'idcard' },
// { label: '手机号格式', value: 'phone' },
// { label: '货币格式', value: 'money' },
// { label: '中文格式', value: 'zh' },
// { label: '日期格式', value: 'date' },
// { label: '邮编格式', value: 'zip' },

const ValidatorFormats = [
  {
    label: 'URL地址',
    value: '{"pattern":"^((https|http|ftp|rtsp|mms)?:\\\\/\\\\/)[^\\\\s]+$","message":"请输入正确的url","triggerType":"onBlur"}'
  },
  {
    label: '邮箱格式',
    value: '{"pattern":"^\\\\w[-\\\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\\\.)+[A-Za-z]{2,14}$","message":"请输入正确的邮箱","triggerType":"onBlur"}'
  },
  // {
  //   label: '邮箱格式',
  //   // value: '{"pattern":"\\\\w[-\\\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\\\.)+[A-Za-z]{2,14}","message":"请输入正确的邮箱","triggerType":"onBlur"}',
  //   sss: {
  //     pattern: "^(-)?+[0-9]+(\.)?[0-9]*$",
  //     message: "请输入正确的邮箱",
  //     triggerType: "onBlur"
  //   }
  // },
  {
    label: '数字格式',
    value: '{"pattern":"^(-)?[0-9]*(\\\\.)?[0-9]*$","message":"请输入正确的数字","triggerType":"onBlur"}'
  },
  {
    label: '整数格式',
    value: '{"pattern":"^[0-9]*$","message":"请输入正确的整数","triggerType":"onBlur"}'
  },
  {
    label: '身份证格式',
    value: '{"pattern":"^[1-9]\\\\d{5}(18|19|20)\\\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\\\d{3}[0-9Xx]$","message":"请输入正确的身份证","triggerType":"onBlur"}'
  },
  {
    label: '手机号格式',
    value: '{"pattern":"^1(3|4|5|6|7|8|9)\\\\d{9}$","message":"请输入正确的手机号","triggerType":"onBlur"}'
  },
  {
    label: '座机格式',
    value: '{"pattern":"^\\\\d{7,8}$|^0\\\\d{2}[-]?\\\\d{8}$|^0\\\\d{3}[-]?\\\\d{7}$","message":"请输入正确的座机号","triggerType":"onBlur"}'
  },
  {
    label: '手机或座机',
    value: '{"pattern":"^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\\\d{8}$|^\\\\d{7,8}$|^0\\\\d{2}[-]?\\\\d{8}$|^0\\\\d{3}[-]?\\\\d{7}$","message":"请输入正确的手机号或座机号","triggerType":"onBlur"}'
  },
  {
    label: '货币格式',
    value: '{"pattern":"^(-)?\\\\d+(\\\\.\\\\d\\\\d)?$","message":"请输入正确的货币","triggerType":"onBlur"}'
  },
  {
    label: '中文格式',
    value: '{"pattern":"^[\\\\u4e00-\\\\u9fa5]+$","message":"请输入中文","triggerType":"onBlur"}'
  },
  {
    label: '日期格式',
    value: '{"pattern":"^\\\\d{4}-\\\\d{1,2}-\\\\d{1,2}$","message":"请输入正确的日期","triggerType":"onBlur"}'
  },
  {
    label: '邮编格式',
    value: '{"pattern":"^[1-9]\\\\d{5}(?!\\\\d)$","message":"请输入正确的邮编","triggerType":"onBlur"}'
  },
]

export default {
  'zh-CN': {
    settings: {
      'x-validator': {
        title: '校验规则',
        addValidatorRules: '添加校验规则',
        drawer: '配置规则',
        triggerType: {
          title: '触发类型',
          placeholder: '请选择',
          dataSource: ['输入时', '聚焦时', '失焦时'],
        },
        format: {
          title: '格式校验',
          placeholder: '请选择',
          dataSource: ValidatorFormats,
        },
        validator: {
          title: '自定义校验器',
          tooltip: '格式: function (value){ return "Error Message"}',
        },
        pattern: '正则表达式',
        len: '长度限制',
        max: '长度/数值小于',
        min: '长度/数值大于',
        exclusiveMaximum: '长度/数值小于等于',
        exclusiveMinimum: '长度/数值大于等于',
        whitespace: '不允许空白符',
        required: '是否必填',
        message: {
          title: '错误消息',
          tooltip:
            '错误消息只对当前规则集的一个内置规则生效，如果需要对不同内置规则定制错误消息，请拆分成多条规则',
        },
      },
    },
    SettingComponents: {
      DataSourceSetter: {
        nodeProperty: '节点属性',
        pleaseSelectNode: '请先选择左侧树节点',
        addKeyValuePair: '添加键值对',
        configureDataSource: '配置可选项',
        dataSource: '可选项',
        defaultTitle: '默认标题',
        dataSourceTree: '可选项节点树',
        addNode: '新增节点',
        label: '键名',
        value: '键值',
        item: '选项',
      },
      ReactionsSetter: {
        configureReactions: '配置响应器',
        relationsFields: '依赖字段',
        variableName: '变量名',
        variableNameValidateMessage: '不符合变量命名规则',
        pleaseInput: '请输入',
        sourceField: '来源字段',
        sourceProperty: '字段属性',
        variableType: '变量类型',
        operations: '操作',
        addRelationField: '添加依赖字段',
        propertyReactions: '属性响应',
        actionReactions: '动作响应',
        visible: '显示/隐藏',
        hidden: 'UI隐藏',
        display: '展示状态',
        pattern: 'UI形态',
        title: '标题',
        description: '描述',
        value: '字段值',
        initialValue: '默认值',
        dataSource: '可选项',
        required: '是否必填',
        component: '组件',
        componentProps: '组件属性',
        decorator: '容器',
        decoratorProps: '容器属性',
        pleaseSelect: '请选择',
        expressionValueTypeIs: '表达式值类型为',
      },
      ValidatorSetter: {
        pleaseSelect: '请选择',
        formats: ValidatorFormats,
      },
    },
  },
}
