import {message} from 'antd'

export const messageError = content => {
  // console.log('error',content);
  // //   let content = null;
  // //   if (typeof error === 'object' && error.message) {
  // //     content = error.message;
  // //   }
    if (content !== null && typeof content !== 'undefined' && content !== '') {
      message.error(content);
    } 
}

  export const messageSuccess = content => {
    if (content !== null && typeof content !== 'undefined' && content !== '') {
      message.success(content);
    }
  };
  