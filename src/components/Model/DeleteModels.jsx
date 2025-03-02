import PropTypes from "prop-types";
import { useState } from "react";
import { Button, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASEURL } from "../../utils/api";
import Cookies from "universal-cookie";

const DeleteModels = ({ id, url, getData }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [idContant, setIdContant] = useState(null);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const showModal = () => {
    setOpen(true);
    setIdContant(id);
  };
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const res = await axios.delete(`${BASEURL}/${url}/${idContant}`, {
        headers: { Authorization: "Bearer " + token },
      });
      message.success(res.data.msg);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        getData();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button icon={<DeleteOutlined />} danger onClick={showModal}>
        حذف
      </Button>
      <Modal
        title="حذف "
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>هل متاكد انك تريد الحذف؟</p>
      </Modal>
    </>
  );
};

DeleteModels.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  getData: PropTypes.func,
};

export default DeleteModels;
