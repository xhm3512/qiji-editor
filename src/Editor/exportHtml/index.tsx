import React from 'react';
import { convertToHTML, convertFromHTML } from 'draft-convert'
import './index.less'
export default (editorState: any) => {
    const html = convertToHTML({
        styleToHTML: (style: any) => {
            switch (style) {
                case 'COLOR_BLUE':
                    return <span style={{ backgroundColor: '#597aae' }} />;
                case 'COLOR_RED':
                    return <span style={{ backgroundColor: 'red' }} />;
                case 'COLOR_GREEN':
                    <span style={{ color: 'green' }} />;
                case 'COLOR_ORANGE':
                    return <span style={{ color: 'orange' }} />;
                case 'RED':
                    return <span style={{ color: 'red' }} />;
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
                return <blockquote className='RichEditor-blockquote'/>
            }
        },
        entityToHTML: (entity, originalText) => {
            const type=entity.type
            //"image"
            switch (type) {
                case 'LINK':
                    return <a href={entity.data.url}>{originalText}</a>;
                case 'image':
                    return <img className='upload-img' src={entity.data.src }/>   
            }
            return originalText;
        }
    })(editorState.getCurrentContent());
    return html;
}