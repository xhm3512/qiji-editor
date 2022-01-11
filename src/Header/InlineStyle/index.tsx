import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import './index.less'
export default ({onToggle}:any) => {
  const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
    { label: 'Red', style: 'RED' },
    { label: 'line', style: 'STRIKETHROUGH' },
  ];
  return <div>
    <div className='RichEditor-controls'>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          // active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      )}
    </div>
  </div>
}
const StyleButton = ({ label,onToggle,style }: any) => {
  const className = 'RichEditor-styleButton';
  const onBtnToggle = () => {
    onToggle(style)
  }
  return <span className={className} onMouseDown={onBtnToggle}>
    {label}
  </span>
}