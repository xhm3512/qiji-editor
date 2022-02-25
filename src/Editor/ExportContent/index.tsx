import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { convertToRaw } from 'draft-js';
import StateToPdfMake from 'draft-js-export-pdfmake';
import 'pdfmake/build/vfs_fonts.js'; // 导出pdf
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs; //ttr报错问题修复
import exportHtml from '../../components/exportHtml' //导出html处理
import { BtnIcon } from '../../components/StyleButton'
const BLOCK_TYPES = [
  { label: 'HTML' },
  { label: 'PDF' },
];
export default ({ editorState }: { editorState: any }) => {
  //导出html
  const handleGenerateHTML = () => {
    // const content=editorState.getCurrentContent().getPlainText()
    const content = exportHtml(editorState)
    const eleLink = document.createElement('a');
    eleLink.download = 'filename.html';
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    const blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);

  }
  /**
   * 导出pdf
   */
  const handleGeneratePDF = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const stateToPdfMake = new StateToPdfMake(rawContent);
    pdfMake.createPdf(stateToPdfMake.generate()).download('pdf_test.pdf');
  };
  const onClick = (type: any) => {
    switch (type) {
      case 'HTML':
        handleGenerateHTML()
      case 'PDF':
        handleGeneratePDF()

    }
  }
  const menu = (
    <Menu>
      {BLOCK_TYPES.map((type) =>
        <Menu.Item key={type.label} onClick={() => onClick(type.label)}>{type.label}</Menu.Item>
      )}
    </Menu>
  )
  return (
    <span className='RichEditor-controls'>
      <Dropdown overlay={menu} placement='bottomLeft' arrow>
        <span>
          <BtnIcon type='export' />
        </span>
      </Dropdown>
    </span>
  );
}