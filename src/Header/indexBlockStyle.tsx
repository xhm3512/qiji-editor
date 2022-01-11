/**
 * @file 块级样式
 * @author Marx
 */

import 'draft-js/dist/Draft.css';
import './block.less';
import React, { Component, useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default () => {
  const [editorState, setState] = useState(EditorState.createEmpty())
  const onChange = (editorState: any) => {
    setState(editorState)
  }
  const toggleBlockType = (blockType: any) => {
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  }
  return (
    <div className='basic'>
      块级样式
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <div className='editor'>
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          onChange={onChange} />
      </div>
    </div>
  )
}

function getBlockStyle(block: any) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return '';
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className='RichEditor-controls'>
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const StyleButton = ({active,label,onToggle,style}:any) => {
  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }
  return (
    <span className={className} onMouseDown={()=>onToggle(style)}>
      {label}
    </span>
  );
}