import { useContext } from "react";
import { context } from "../context/context";

const useHandleModal = () => {
  const { showModal } = useContext(context);

  const setModal = ({ data, post }) => {
    let { top, bottom, right, width } = data;
    showModal({
      post,
      isShowingModal: true,
      position: { top, bottom, right, width },
    });
  };

  return setModal;
};

export default useHandleModal;
