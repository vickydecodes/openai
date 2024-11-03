import React from 'react';
import './Message.css'

export default function Message({prompt}) {
  return (
    <div className='message-box mt-4'>{prompt}</div>
  )
}
