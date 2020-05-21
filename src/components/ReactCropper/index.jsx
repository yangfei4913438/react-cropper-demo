import React, { useRef, useState, useEffect, useCallback } from "react";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import Child from "../../assets/child.jpg";
import "./index.css";

const ReactCropper = ({
  uploadedImageFile,
  onClose,
  onSubmit,
  widthRatio = 1,
  heightRatio = 1,
}) => {
  const cropper = useRef();
  const [src, setSrc] = useState(Child);

  // 上传图片的时候，设置这里的图片
  useEffect(() => {
    // 不为真的时候，直接返回
    if (!uploadedImageFile) return;
    // 创建文件读取实例
    const fileReader = new FileReader();
    // 启用加载成功事件的监听
    fileReader.onload = (e) => {
      const dataURL = e.target.result;
      setSrc(dataURL);
    };
    // 开始读取文件
    fileReader.readAsDataURL(uploadedImageFile);
  }, [uploadedImageFile]);

  //  裁剪响应
  const cropImage = useCallback(() => {
    if (typeof cropper.current.getCroppedCanvas() === "undefined") {
      return;
    }
    // 裁切图片
    cropper.current.getCroppedCanvas().toBlob((blob) => {
      //把选中裁切好的的图片传出去
      onSubmit(blob);
      // 关闭弹窗
      onClose();
    });
  }, [onClose, onSubmit]);

  return (
    <section className={"react_cropper"}>
      <article className={"react_cropper_body"}>
        <header className={"react_cropper_body_header"}>
          <div className={"react_cropper_body_header_title"}>上传图片</div>
          <div className={"react_cropper_body_header_close"} onClick={onClose}>
            X
          </div>
        </header>
        <div className={"react_cropper_body_desc"}>
          <p>为了提升企业形象，请选择宽度大于500像素的图片</p>
          <p>支持的图片格式为: jpeg, jpg, png, 文件大小: 5MB以内</p>
        </div>
        <div className={"react_cropper_body_ctrl"}>
          <Cropper
            src={src}
            ref={cropper}
            style={{ height: "100%", width: "100%" }} // 操作区域的大小, 这个必须写，不能省略
            viewMode={1} // 选框不能超出图片范围
            aspectRatio={widthRatio / heightRatio} // 宽高比
            preview=".react_cropper_body_view_item" // 预览的div
            zoomable={false} // 禁止图片随便移动
            guides={false} // 禁用选框中的辅助线
          />
        </div>
        <div className={"react_cropper_body_view"}>
          <div
            className={"react_cropper_body_view_item"}
            style={{ width: 120, height: 120, marginRight: 24 }}
          />
          <div
            className={"react_cropper_body_view_item"}
            style={{ width: 40, height: 40, marginRight: 24 }}
          />
          <div
            className={"react_cropper_body_view_item"}
            style={{
              width: 120,
              height: 120,
              borderRadius: 120,
              marginRight: 24,
            }}
          />
          <div
            className={"react_cropper_body_view_item"}
            style={{ width: 40, height: 40, borderRadius: 40 }}
          />
        </div>
        <footer className={"react_cropper_body_btn"}>
          <button onClick={onClose}>取消</button>
          <button onClick={cropImage}>点击裁剪</button>
        </footer>
      </article>
    </section>
  );
};

export default ReactCropper;
