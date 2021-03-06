import React from 'react';
import { convertToHTML } from 'draft-convert'
import styleMap from '../../Editor/styleMap'
import './index.less'
export default (editorState: any) => {
    console.log(99,editorState.getCurrentContent());
    
    const html = convertToHTML({
        styleToHTML: (style: any) => {
            switch (style) {
                case 'COLOR_BLUE':
                    return <span style={styleMap['COLOR_BLUE']} />;
                case 'COLOR_RED':
                    return <span style={styleMap['COLOR_RED']} />;
                case 'COLOR_GREEN':
                    return <span style={styleMap['COLOR_GREEN']} />;
                case 'COLOR_ORANGE':
                    return <span style={styleMap['COLOR_ORANGE']} />;
                case 'RED':
                    return <span style={styleMap['RED']} />;
                case 'BACKGROUND_RED':
                    return <span style={styleMap['BACKGROUND_RED']} />;
                case 'BACKGROUND_BLUE':
                    return <span style={styleMap['BACKGROUND_BLUE']} />;
                case 'STRIKETHROUGH':
                    return <span style={{ textDecoration: 'line-through' }} />;
            }
        },
        blockToHTML: (block) => {
            const type = block.type
            const matches = block.text.match(/\!\[(.*)\]\((http.*)\)/);
            if (type === 'PARAGRAPH') {
                return <p />;
            } else if (matches) {
                return <img src={matches[2]} />
            } else if (type === 'blockquote') {
                return <blockquote className='RichEditor-blockquote' />
            }
        },
        entityToHTML: (entity, originalText) => {
            console.log(666,entity,originalText);
            
            const type = entity.type
            //"image"
            switch (type) {
                case 'LINK':
                    return <a href={entity.data.url}>{originalText}</a>;
                case 'image':
                    return <div className='upload-show-box'><img src={entity.data.src} /></div>
            }
            return originalText;
        }
    })(editorState.getCurrentContent());
    return html;
}