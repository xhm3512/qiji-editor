import React, { useEffect, useState, useRef } from 'react';
export default () => {

const basicStyleMap = [
	'#ffffff','#f8d9d6','#fadbaf','#fffed8','#dcf94f','#99f8d8','#acc8fa','#f3b0d3','#ef87a8',
	'#d6d6d6','#f4b0ad','#f4bc99','#fefc52','#96f688','#73f8fd','#84abf8','#c859a5','#ed5e7a',
	'#b2b2b2','#d0adab','#ee733a','#f9db69','#60cd3e','#60d1fb','#367ef7','#9e43f6','#eb4547',
	'#888888','#734744','#ec5c28','#f3ad3d','#5ca450','#5ea7d2','#1e52f6','#7451cf','#c73945',
	'#000000','#711b0a','#eb5c4b','#cfaa52','#4d751f','#3478a5','#071ea2','#787ba6','#9d2b42'
]

  return <>
    {
      basicStyleMap.map((item: any) => {
        const bgColorStyle = {
          backgroundColor: item,
          display: 'inline-block',
          width: '10px',
          height: '10px',
          margin:'0 6px'
        }
        return <span key={item} style={bgColorStyle}></span>
      })
}
  </>
}