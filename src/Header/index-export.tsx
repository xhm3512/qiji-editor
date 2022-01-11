import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentState,convertToRaw } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert'
import {stateFromHTML} from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';

import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import './index.less'
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
    }
};

const DraftEditor = () => {
    const editor = useRef<any>()
    const editorRender = useRef<any>()
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(`从暴怒的李成


  仁身上散发出一股让我都不可小视的气息。
  <div>ww</div>
  
  而我当即也不甘示弱，几乎和李成仁是同一时间开启了阳神面具，我的右眼也随之睁开。
  
  
  “令神骨！”
  
  
  李成仁很识货，而我却没有说话，只是安静的用右眼看着出现在他身后出现的巨大神影。

  见我答应，李空诚竟然还拿出合同：“没问题，就签个字。”`)))
    const onChange = (editorState: any, style?: any) => {
        const options = {
            inlineStyles: {
              // Override default element (`strong`).
              BOLD: {element: 'b'},
              ITALIC: {
                // Add custom attributes. You can also use React-style `className`.
                attributes: {class: 'foo'},
                // Use camel-case. Units (`px`) will be added where necessary.
                style: {fontSize: 12}
              },
              // Use a custom inline style. Default element is `span`.
              'COLOR_RED': {style: {backgroundColor: 'red'}},
              'COLOR_BLUE': {style: {backgroundColor: '#597aae'}},
            },
          };
          const html = stateToHTML(editorState.getCurrentContent(), options);
        
        editorRender.current.innerHTML = html
        setEditorState(editorState)
    }
    const defaultInlineStyle = [
        { el: <span className='color-show' style={{ fontWeight: 'bold' }}>B</span>, style: 'BOLD' },
        { el: <span className='color-show' style={{ fontStyle: 'italic' }}>I</span>, style: 'ITALIC' },
        { el: <span className='color-show' style={{ textDecoration: 'underline' }}>U</span>, style: 'UNDERLINE' },
        { el: <span className='color-show' style={{ textDecoration: 'line-through' }}>L</span>, style: 'STRIKETHROUGH' },
        { el: <span><div className='color-show' style={{ backgroundColor: '#e24' }}>12</div></span>, style: 'COLOR_RED' },
        { el: <span><div className='color-show' style={{ backgroundColor: '#39f' }}>34</div></span>, style: 'COLOR_BLUE' },
        { el: <span><div className='color-show' style={{ backgroundColor: '#f93' }}>56</div></span>, style: 'COLOR_ORANGE' },
        { el: <span><div className='color-show' style={{ backgroundColor: '#3a6' }}>78</div></span>, style: 'COLOR_GREEN' }
    ];


    const toggleInlineStyle = (style: string) => {
        const state = RichUtils.toggleInlineStyle(editorState, style);
        onChange(state, style);
    }
    // 定义快捷键
    const handleKeyCommand = (command: any, ww: any) => {
        const newState = RichUtils.handleKeyCommand(ww, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    const focusEditor = () => {
        if (editor) {
            editor.current.focus()
        }

    }
    useEffect(() => {
        focusEditor()
    }, [])
    const getBlockStyle = (block: any) => {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return '';
        }
    }
    // 获得鼠标在页面的位置
    const getMouseLOcal = (_e: any) => {
        const e = _e || window.event;
        return {
            x: e.clientX,
            y: e.clientY,
        };
    };
    return (
        <div>
            <div className='editor-btn-group'>
                {defaultInlineStyle.map(item =>
                    <span key={item.style} onClick={() => toggleInlineStyle(item.style)}>
                        {item.el}
                    </span>)}
            </div>
            <div className='editor' onClick={focusEditor}>
                <Editor
                    ref={editor}
                    blockStyleFn={getBlockStyle}
                    placeholder={'Write what you would say.'}
                    editorState={editorState}
                    onChange={onChange}
                    customStyleMap={styleMap}
                    handleKeyCommand={handleKeyCommand}
                />
            </div>
            <div ref={editorRender}>1</div>
        </div >
    )
}

export default DraftEditor;