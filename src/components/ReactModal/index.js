import ReactDom from "react-dom";
import usePortal from "../../hooks/usePortal";

const ReactModal = ({ id = "modal_root", children }) => {
  const target = usePortal(id);
  return ReactDom.createPortal(children, target);
};

export default ReactModal;
