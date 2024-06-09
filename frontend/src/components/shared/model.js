import { Modal, Button } from "rsuite";

import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../Context/AppContext";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
const CustomModelBox = (props) => {
  const { open, onClose, title, data, meta, updateCallBack } = props;

  const [backdrop, setBackdrop] = useState("static");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handle = (data) => {
    if (updateCallBack != null) {
      updateCallBack(data);
    }
  };

  const { theme } = useContext(AppContext);
  if (theme === "dark") {
    var tableColor = "dark";
  } else {
    tableColor = "light";
  }

  // const handle = (data) => {
  //   if (updateCallBack != null && data.image && data.image.length > 0) {
  //     updateCallBack(data);
  //   }
  // };
  useEffect(() => {
    if (data !== undefined) {
      meta.map((items) => {
        setValue(items["dataKey"], data[items["dataKey"]]);
      });
    }
  }, [data]);
  return (
    <CustomProvider theme={tableColor}>
      <Modal
        overflow={true}
        backdrop={backdrop}
        keyboard={false}
        open={open}
        onClose={onClose}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {/* {errors.lastName && <p>Last name is required.</p>} */}
        <form onSubmit={handleSubmit((data) => handle(data))}>
          <Modal.Body style={{ maxHeight: "auto !important" }}>
            {meta.map((items) => (
              <div className="form-group">
                <label>{items["text"]}</label>
                {items["type"].toLowerCase() === "text" ? (
                  <input
                    type="text"
                    className="form-control"
                    {...register(items["dataKey"])}
                  />
                ) : items["type"].toLowerCase() === "number" ? (
                  <input
                    type="number"
                    className="form-control"
                    {...register(items["dataKey"])}
                  />
                ) : (
                  <input
                    type="file"
                    className="form-control"
                    {...register(items["dataKey"])}
                  />
                )}
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <input className="btn btn-primary" type="submit" />
            <Button onClick={onClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </CustomProvider>
  );
};

export default CustomModelBox;
