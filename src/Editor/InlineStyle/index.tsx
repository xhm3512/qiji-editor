import React, { useEffect, useState, useRef } from 'react';
import {StyleButton} from '../components/StyleButton'
import './index.less'
export default ({onToggle}:any) => {
  const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    // { label: 'Monospace', style: 'CODE' },
    // { label: 'Red', style: 'RED' },
    { label: 'line', style: 'STRIKETHROUGH' },
   
  ];
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
