const downloadFile = (fileName, data) => {
  const url = window.URL || window.webkitURL;
  const urlData = url.createObjectURL(data);

  const a = document.createElement("a");
  a.href = urlData;
  a.setAttribute("download", fileName);
  document.body.appendChild(a);
  a.click();
  a.parentNode.removeChild(a);
  url.revokeObjectURL(urlData);
};

const Utils = {
  downloadFile,
};

export default Utils;
