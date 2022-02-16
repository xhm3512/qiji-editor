import React, { useEffect, useState, useRef } from 'react';
import { Upload, message, Button } from 'antd';
import { BtnIcon } from '../components/StyleButton'
import './index.less'
export default ({ addImage }: any) => {

  // 获得图片
  const getImgFile = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image: any = new Image();
        image.src = reader.result;
        resolve(image)
      }
    })
  }

  const beforeUpload = async (file: any) => {
    const imgSize: any = await getImgFile(file)
      .then((image: any) => {
        addImage(image.src)
      })

    // reader.readAsDataURL(file);
  }
  return <span className='RichEditor-controls'>
    <Upload
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      <BtnIcon type='upImage' />
    </Upload>
  </span>

}
