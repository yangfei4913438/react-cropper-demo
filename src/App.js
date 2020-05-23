import React, { useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import src from "./assets/child.jpg";
import ReactCropper from "./components/ReactCropper";
import ReactModal from "./components/ReactModal";
import "./App.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 文件最大限制为5M

const App = () => {
  const [resultImgUrl, setResultImgUrl] = useState();
  const [modalFile, setModalFile] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const img = useRef();

  const onFileChange = (e) => {
    e.preventDefault();
    let file;
    if (e.dataTransfer) {
      file = e.dataTransfer.files[0];
    } else if (e.target) {
      file = e.target.files[0];
    }
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        setModalFile(file); // 先把上传的文件暂存在state中
        setModalVisible(true); // 然后弹出modal
      } else {
        console.log("文件过大");
      }
    }
  };

  const handleCancel = () => {
    // 解决input组件，重复上传文件的时候，不能触发onChange事件
    img.current.value = "";
    // 关闭弹窗
    setModalVisible(false);
  };

  const handleGetResultImgUrl = (blob) => {
    // 本地图片显示
    const str = URL.createObjectURL(blob);
    console.log(str);
    setResultImgUrl(str);

    // // 创造提交表单数据对象
    // const formData = new FormData()
    // // 添加要上传的文件
    // formData.append('file', blob, filename)
    // 提示开始上传 (因为demo没有后端server, 所以这里代码我注释掉了, 这里是上传到服务器并拿到返回数据的代码)
    // this.setState({submitting: true})
    // 上传图片
    // const resp = await http.post(url, formData)
    // 拿到服务器返回的数据(resp)
    // console.log(resp)
    // 提示上传完毕
    // this.setState({submitting: false})
  };

  return (
    <div className={"app"}>
      <header className={"app_upload"}>
        <label className="app_upload_label">
          <div className={"app_upload_label_btn"}>选择图片</div>
          <input
            ref={img}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/svg+xml"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
        </label>
      </header>
      <div className="app_img">
        <img src={resultImgUrl || src} alt="resultImgUrl" />
      </div>

      {modalVisible ? (
        <ReactModal>
          <ReactCropper
            widthRatio={1}
            heightRatio={1}
            uploadedImageFile={modalFile}
            onSubmit={handleGetResultImgUrl}
            onClose={handleCancel}
          />
        </ReactModal>
      ) : null}
    </div>
  );
};

export default App;
