import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentState,convertToRaw } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert'
import InlineStyle from './InlineStyle'
import BlockStyle from './BlockStyle'
import LinkEditor from './LinkEditor'
import decorator from './decorator'
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
    },
    'RED': {
        color: 'red',
    },
};

const DraftEditor = () => {
    const editor = useRef<any>()
    const editorRender = useRef<any>()
    const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator()))
    // const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText('从暴怒的李成仁身上散发出一股让')))
    const onChange = (editorState: any, style?: any) => {
        const html = convertToHTML({
            styleToHTML: (style: any) => {
                if (style === 'COLOR_BLUE') {
                    return <span style={{ backgroundColor: '#597aae' }} />;
                } else if (style === 'COLOR_RED') {
                    return <span style={{ backgroundColor: 'red' }} />;
                } else if (style === 'COLOR_GREEN') {
                    return <span style={{ color: 'green' }} />;
                } else if (style === 'COLOR_ORANGE') {
                    return <span style={{ color: 'orange'}} />;
                }
               else  if (style === 'STRIKETHROUGH') {
                    return <span style={{ textDecoration: 'line-through' }} />;
                }
            },
            blockToHTML: (block) => {
                if (block.type === 'PARAGRAPH') {
                    return <p />;
                }
            },
            entityToHTML: (entity, originalText) => {
                if (entity.type === 'LINK') {
                    return <a href={entity.data.url}>{originalText}</a>;
                }
                return originalText;
            }
        })(editorState.getCurrentContent());
        console.log(22,editorState.getRedoStack());
        
        editorRender.current.innerHTML = html
        setEditorState(editorState)
    }



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
    const toggleBlockType = (blockType:string) => {
        console.log(1000, blockType);
     onChange(
            RichUtils.toggleBlockType(
               editorState,
                blockType
            )
        );
    }
    const ddd = (ss:any) => {
        setEditorState(ss)
    }
    return (
        <div>
            <InlineStyle
                onToggle={toggleInlineStyle}
            />
            <BlockStyle
                editorState={editorState}
                 onToggle={toggleBlockType}
            />
            <LinkEditor
                editorState={editorState}
                onToggle={ddd}
            />
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