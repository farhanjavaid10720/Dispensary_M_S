// import {
//   Modal,
//   ButtonToolbar,
//   Button,
//   RadioGroup,
//   Radio,
//   Placeholder,
// } from "rsuite";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// const ViewModelBox = (props) => {
//   const { open, onClose, title, data, meta, updateCallBack } = props;
//   const [value, setValue] = useState([]);

//   const [backdrop, setBackdrop] = useState("static");

//   const handle = (data) => {
//     if (updateCallBack != null) {
//       updateCallBack(data);
//     }
//   };
//   useEffect(() => {
//     if (data !== undefined) {
//       meta.map((items) => {
//         setValue(items["dataKey"], data[items["dataKey"]]);
//       });
//     }
//   }, [data]);
//   return (
//     <>
//       <Modal
//         overflow={true}
//         backdrop={backdrop}
//         keyboard={false}
//         open={open}
//         onClose={onClose}
//       >
//         <Modal.Header>
//           <Modal.Title>{title}</Modal.Title>
//         </Modal.Header>
//         {/* {errors.lastName && <p>Last name is required.</p>} */}
//         <Modal.Body style={{ maxHeight: "auto !important" }}>
//           {meta.map((items) => (
//             <div>
//               <table className="table table-bordered table-hover">
//                 <thead>
//                   <tr>
//                     <th scope="col">{items["text"]}</th>
//                   </tr>
//                 </thead>
//                 <tbody className="table-group-divider">
//                   <tr>
//                     <td>{value}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </Modal.Body>
//         <Modal.Footer>
//           <input className="btn btn-primary" type="submit" />
//           <Button onClick={onClose} appearance="subtle">
//             Cancel
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ViewModelBox;

import React, { useEffect, useState, useContext } from "react";

import { Modal, Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
import { AppContext } from "../Context/AppContext";

const ViewModelBox = (props) => {
  const { open, onClose, title, data, meta } = props;

  const [value, setValue] = useState([]);
  const [backdrop] = useState("static");

  useEffect(() => {
    if (data !== undefined) {
      meta.forEach((items) => {
        setValue((prevValue) => ({
          ...prevValue,
          [items.dataKey]: data[items.dataKey],
        }));
      });
    }
  }, [data]);

  const { theme } = useContext(AppContext);
  if (theme === "dark") {
    var tableColor = "dark";
  } else {
    tableColor = "light";
  }

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
        <Modal.Body style={{ maxHeight: "auto !important" }}>
          <div>
            <ul className="list-group">
              {meta.map((item) => (
                <li key={item.dataKey} className="list-group-item">
                  {item.type.toLowerCase() === "image" ? (
                    <span>
                      {" "}
                      <strong>{item.text} :</strong>
                      <img
                        src={value[item.dataKey]}
                        alt="profile Pic"
                        className="w-100 h-50"
                      />
                    </span>
                  ) : (
                    <span>
                      <strong>{item.text} :</strong> &nbsp;{" "}
                      {value[item.dataKey]}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} appearance="primary">
            ok
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </CustomProvider>
  );
};

export default ViewModelBox;
