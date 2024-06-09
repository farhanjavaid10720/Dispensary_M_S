// import axios from "axios";
// import { logs } from "../constants/endpoints";
// import { toast } from "react-toastify";

// export const logEvent = (
//   name,
//   email,
//   image,
//   eventType,
//   resource,
//   eventData
// ) => {
//   const timestamp = new Date().toLocaleString();
//   const logEntry = `[${timestamp}] [${eventType}] - ${eventData}`;
//   const resources = resource;
//   const user_name = name;
//   const user_email = email;
//   const user_image = image;
//   // Use console.log or your preferred logging library to store the log entry.
//   console.log(logEntry, user_image);
//   const header = {
//     headers: {
//       Authorization: localStorage.getItem("jwt"),
//     },
//   };
//   const data = {
//     user_name: user_name,
//     user_email: user_email,
//     event: logEntry,
//     resource: resource,
//     date: timestamp,
//   };

//   const fd = new FormData();

//   fd.append("image", user_image);

//   fd.append("data", JSON.stringify(data));
//   axios.post(logs.add, fd, header).then(
//     (res) => {
//       if (res["data"]["error"] === 1) {
//         toast.error(res["data"]["msg"], {
//           autoClose: 5000,
//           hideProgressBar: true,
//           theme: "colored",
//           progress: undefined,
//         });
//       } else {
//         toast.success(" Log Record Is added", {
//           autoClose: 1000,
//           hideProgressBar: true,
//           theme: "colored",
//           progress: undefined,
//         });
//       }
//     },
//     (err) => {
//       toast.error(err, {
//         autoClose: 5000,
//         hideProgressBar: true,
//         theme: "colored",
//         progress: undefined,
//       });
//     }
//   );
// };

import axios from "axios";
import { logs } from "../constants/endpoints";
import { toast } from "react-toastify";

export const logEvent = (
  name,
  email,
  image,
  eventType,
  resource,
  details,
  eventData
) => {
  const timestamp = new Date().toLocaleString();
  // const logEntry = `[${timestamp}] [${eventType}] - ${eventData}`;

  const logEntry = `[${eventType}] - ${eventData}`;

  // Use console.log or your preferred logging library to store the log entry.
  console.log(logEntry);

  const header = {
    headers: {
      Authorization: localStorage.getItem("jwt"),
    },
  };

  const data = {
    user_name: name,
    user_email: email,
    image: image,
    event: logEntry,
    resource: resource,
    details: details,
    date: timestamp,
  };

  axios
    .post(logs.add, data, header)
    .then((res) => {
      if (res.data.error === 1) {
        toast.error(res.data.msg, {
          autoClose: 5000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
      } else {
        toast.success("Log Record Is added", {
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
      }
    })
    .catch((err) => {
      toast.error(err.message, {
        autoClose: 5000,
        hideProgressBar: true,
        theme: "colored",
        progress: undefined,
      });
    });
};
