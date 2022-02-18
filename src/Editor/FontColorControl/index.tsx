import React, { useEffect, useState, useRef } from 'react';
import { Popover, Button } from 'antd';
import { RichUtils } from 'draft-js';
import styleMap from '../styleMap'
import './index.less'
export default ({ onChange,editorState }: {onChange:any,editorState:any}) => {
  const INLINE_STYLES = {
    color: [
      { label: 'Red', style: 'RED' },
      { label: 'GREEN', style: 'COLOR_GREEN' },
    ],
    background: [
      { label: 'Red', style: 'BACKGROUND_RED' },
      { label: 'Blue', style: 'BACKGROUND_BLUE' },
    ]
  };
  const onBtnToggle = (e: any, style: string) => {
    e.preventDefault();
    onChange(
      RichUtils.toggleInlineStyle(
          editorState,
          style
      )
    )
}
  const DDD = (list: any) => {
    return <ul>
      {list.map((item: any) => <li className='color-li' style={{backgroundColor :styleMap[item.style].backgroundColor || styleMap[item.style].color}} onClick={(e) => onBtnToggle(e, item.style)} key={item.label}></li>)}
    </ul>
  }
  const param = {
    width: '1.5em',
    heigth: '1.5em',
    viewBox: '0 0 1024 1024'
  }
  return <Popover
    content={
    Object.keys(INLINE_STYLES).map((item: any) => {
      return <span key={item}>{item}：{DDD(INLINE_STYLES[item])}</span>
    })
  }
    trigger='hover'
  >
    <svg {...param}><path d='M868.304 147.536a164.68 164.68 0 0 0-117.264-48.568c-44.272 0-85.872 17.224-117.128 48.504L499.2 282.208l-55.76-55.76a30.088 30.088 0 0 0-42.568 0 30.088 30.088 0 0 0 0 42.568l76.808 76.808c0.08 0.08 0.136 0.176 0.216 0.264l7.008 7-291.904 291.968a124.76 124.76 0 0 0-35.208 108.68l-45.96 45.984a72.904 72.904 0 0 0-21.52 51.888 72.776 72.776 0 0 0 21.488 51.888 72.944 72.944 0 0 0 51.952 21.544h0.024a72.696 72.696 0 0 0 51.832-21.496l45.736-45.672a124.72 124.72 0 0 0 20.76 1.784c32.72 0 64.56-12.84 88.608-36.864l291.936-291.952 7.016 7.016c0.112 0.112 0.24 0.184 0.36 0.296l76.72 76.712a30.048 30.048 0 0 0 42.568 0 30.088 30.088 0 0 0 0-42.568l-55.76-55.752 134.752-134.72c64.592-64.56 64.592-169.656 0-234.288z m-540.16 632.664c-16.744 16.712-40.736 22.84-63.376 16.76a30.048 30.048 0 0 0-30.616 3.512 63.552 63.552 0 0 0-3.08 2.504l-58.064 58.032a13.048 13.048 0 0 1-9.232 3.824h-0.024a13.224 13.224 0 0 1-9.344-22.544l56.08-56.104c0.392-0.344 4.288-4.608 5.2-5.944 0.408-0.576 2.144-3.568 2.576-4.512 0.504-1.064 1.624-4.32 1.768-4.864 0.416-1.552 0.904-5 0.92-5.16a30.088 30.088 0 0 0-1.96-14.08c-6.456-22.864-0.304-47.136 16.568-64l291.928-291.96 92.6 92.6-291.944 291.936z m497.592-440.96L690.976 473.968l-149.2-149.184 134.712-134.736c39.832-39.824 109.36-39.792 149.248 0.056 41.096 41.144 41.096 108.04 0 149.136z' fill='#666' p-id='1719'></path></svg>
  </Popover>

}
