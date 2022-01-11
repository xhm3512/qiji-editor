/**
 * styleMap用来定义渲染规则 
 * key值是样式的名称, 在RichUtils.toggleInlineStyle(EditorState, key)中使用
 * value是渲染的css规则, 其中用驼峰格式来标识样式属性
 **/
 const styleMap = {
  // 默认
  'STRIKETHROUGH': {
      textDecoration: 'line-through',
  },
  BOLD: {
      fontWeight: 'bold'
  },
  ITALIC: {
      fontStyle: 'italic'
  },
  UNDERLINE: {
      textDecoration: 'underline'
  },
  // 自定义
  'COLOR_RED': {
      backgroundColor: 'red'
  },
  'COLOR_BLUE': {
      backgroundColor: '#597aae'
  },
  'COLOR_ORANGE': {
      color: '#f93'
  },
  'COLOR_GREEN': {
      color: '#3a6'
  },
  'RED': {
      color: 'red',
  },
 };
export default styleMap