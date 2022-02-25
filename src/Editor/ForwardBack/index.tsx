import React from 'react';
import {  EditorState} from 'draft-js';
import { BtnIconClick } from '../../components/StyleButton'
export default ({ editorState ,setEditorState}: {editorState:any,setEditorState:any}) => {
  const list = [
    { label: 'fowrad' },
    { label: 'back' },
  ]
      // 撤销
      const handleUndo = () => {
        setEditorState(EditorState.undo(editorState))

    }
    // 前进
    const handleRedo = () => {
        setEditorState(EditorState.redo(editorState))
    }
    const onUnReDoClick = (type: string) => {
        switch (type) {
            case 'fowrad':
                handleUndo();
                return false;
            case 'back':
                handleRedo()
                return false;
        }
    }
  return <>
    {
      list.map((item) => <BtnIconClick key={item.label} type={item.label} onClick={ ()=>onUnReDoClick(item.label)}/>)
    }
  </>
}