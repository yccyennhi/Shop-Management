import {message} from 'antd'

export const messageError = content => {
  console.log('error',content);
    if (typeof content === 'object' && content.message) {
      content = content.message;
    }
    if (content !== null && typeof content !== 'undefined' && content !== '') {
      message.error(content);
    } 
}

  export const messageSuccess = content => {
    if (content !== null && typeof content !== 'undefined' && content !== '') {
      message.success(content);
    }
  };
  