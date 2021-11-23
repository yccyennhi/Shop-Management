import { message } from "antd";


export const messageError = content => {
  console.log('error',content);
    if (typeof content === 'object' && content.message) {
      content = content.message;
    }
    if (content !== null && typeof content !== 'undefined' && content !== '') {
      message.error(content);
    } 
}

export const messageSuccess = (content) => {
  if (content !== null && typeof content !== "undefined" && content !== "") {
    message.success(content);
  }
};

export const messageLoadingSuccess = (content) => {
  const key = 'updatable';

  if (content !== null && typeof content !== "undefined" && content !== "") {
    message.loading({ content: content, key });
    setTimeout(() => {
      message.success({ content: content + " thành công", key, duration: 2 });
    }, 1000);
  }
};
