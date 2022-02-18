import React, { useEffect, useState, useRef } from 'react';
import { RichUtils } from 'draft-js';
import {StyleButton} from '../components/StyleButton'
import './index.less'
export default ({onChange,editorState}:{onChange:any,editorState:any}) => {
  const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'line', style: 'STRIKETHROUGH' },
   
  ];
  const onToggle = (style:any) => {
    onChange(
      RichUtils.toggleInlineStyle(
          editorState,
          style
      )
  );
  }
  return <span className='RichEditor-controls'>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          // active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      )}
    </span>
 
}
