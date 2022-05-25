import React, { useState,useRef } from 'react';
import Editor from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import { EditorState } from 'draft-js';

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();

const plugins = [linkifyPlugin, hashtagPlugin];
import  './CustomComponentMentionEditor.module.css';
export default () => {
  const ref = useRef<Editor>(null);
  const [editorState,setEditorState]=useState(EditorState.createEmpty())

  const onChange = (editorState: any) => {
    setEditorState(editorState)
  };

  return (
    <div
    className='editor'
    onClick={() => {
      ref.current!.focus();
    }}
  >
        <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={ref}
      /> 
  </div>
   
    );
}