import PropTypes from "prop-types";
import { Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, cloneElement } from "react";

const EditModels = ({ id, children }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [idContant, setIdContant] = useState(null);

  const showLoading = () => {
    setOpen(true);
    setIdContant(id);

    setLoading(true);
    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  //   console.log(idContant);

  return (
    <>
      <Button
        style={{
          backgroundColor: "#22c55e",
          color: "white",
          borderColor: "#22c55e",
        }}
        icon={<EditOutlined />}
        onClick={showLoading}
      >
        تعديل
      </Button>
      <Modal
        title={loading && <p> تحميل...</p>}
        footer={<Button onClick={() => setOpen(false)}>Cancel</Button>}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        {children && cloneElement(children, { setOpen })}
      </Modal>
    </>
  );
};
EditModels.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default EditModels;
