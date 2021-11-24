import { message } from "antd";

export const messageError = (content) => {
  // console.log('error',content);
  // //   let content = null;
  // //   if (typeof error === 'object' && error.message) {
  // //     content = error.message;
  // //   }
  if (content !== null && typeof content !== "undefined" && content !== "") {
    message.error(content);
  }
};

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
