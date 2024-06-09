// import "../dashboard/layout.css";
// import { Tooltip, Whisper } from "rsuite";
// import { useState } from "react";
// import "../image_upload/imageUpload.css"; // Import your CSS file
// import img2 from "../image_upload/images/image1.jpg";

// import { Breadcrumb } from "rsuite";

// import axios from "../../axios-interceptor";
// import { auth } from "../constants/endpoints";

// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import ImageUpload from "../image_upload/imageUpload";

// const AddUser = (props) => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [email, setEmail] = useState("");
//   const [type, setTypes] = useState("");

//   const [password, setPassword] = useState("");
//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   // const handleImageChange = (e) => {
//   //   console.log(e);
//   //   const file = e.target.files[0];
//   //   setImage(file);
//   //   setPreviewImage(URL.createObjectURL(file)); // Create a preview URL
//   // };
//   const onsubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       name: name,
//       age: age,
//       email: email,
//       type: type,
//       password: password,
//     };
//     const fd = new FormData();
//     fd.append("image", image);
//     fd.append("data", JSON.stringify(data));
//     axios.post(auth.register, fd).then(
//       (res) => {
//         if (res["data"]["error"] === 1) {
//           toast.error(res["data"]["msg"], {
//             autoClose: 5000,
//             hideProgressBar: true,
//             theme: "colored",
//             progress: undefined,
//           });
//         } else {
//           setImage(null);
//           setName("");
//           setAge("");
//           setTypes("");
//           setPassword("");
//           setEmail("");
//           setPreviewImage(null);
//           const btn1 = (document.getElementById("btn1").style.display =
//             "inline");
//           toast.success("New Account Created", {
//             autoClose: 1000,
//             hideProgressBar: true,
//             theme: "colored",
//             progress: undefined,
//           });
//         }
//       },
//       (err) => {
//         toast.error(err, {
//           autoClose: 5000,
//           hideProgressBar: true,
//           theme: "colored",
//           progress: undefined,
//         });
//       }
//     );
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Prevent the default form submission
//       onsubmit();
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   // Function to handle image deletion
//   const handleImageDelete = () => {
//     setImage(null);
//     setPreviewImage(null);
//     // Clear the file input by resetting its value
//     const fileInput = document.getElementById("imageInput");
//     if (fileInput) {
//       fileInput.value = "";
//     }
//   };

//   // Function to handle image deletion

//   return (
//     <div className="container-fluid">
//       <Breadcrumb className="mt-3">
//         <Breadcrumb.Item>User Management</Breadcrumb.Item>
//         <Breadcrumb.Item href="/dashboard/users/add">Add</Breadcrumb.Item>
//       </Breadcrumb>
//       <h3 className="mt-2">Add User</h3>
//       <hr style={{ border: "1px solid black" }} />
//       <br />
//       <div className="container mt-2">
//         <div className="row justify-content-center">
//           <div className="col-lg-7 ">
//             <form onSubmit={onsubmit} className="d-flex flex-column">
//               <div className="form-group">
//                 {/* <img src={previewImage} className="img-fluid" alt="" />
//                 <label htmlFor="imageInput" className="custom-file-label">
//                   {image ? image.name : "Choose an image"}
//                 </label>
//                 <input
//                   type="file"
//                   className="custom-file-input"
//                   id="imageInput"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 /> */}
//                 <div className="container w-50">
//                   <Whisper
//                     followCursor
//                     speaker={<Tooltip>Click Here To Add Picture</Tooltip>}
//                   >
//                     <label className="cursor" id="btn1">
//                       {image ? (
//                         <img
//                           src={previewImage}
//                           alt="Selected"
//                           className="img-thumbnail mb-3"
//                         />
//                       ) : (
//                         <img
//                           src={img2}
//                           alt="Selected"
//                           className="img-thumbnail mb-3"
//                         />
//                       )}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         id="imageInput" // Added an ID to the input element
//                         onChange={handleImageChange}
//                         className="form-control mb-3 choose-file"
//                       />
//                     </label>
//                   </Whisper>
//                 </div>
//                 <div className="container mt-3">
//                   {image && (
//                     <div>
//                       <button
//                         className="btn btn-danger mb-2"
//                         id="btn24"
//                         onClick={handleImageDelete}
//                       >
//                         Delete Image
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="mb- mt-2">
//                 <label className="form-label">Name</label>
//                 <input
//                   value={name}
//                   className="form-control"
//                   // required
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Type</label>
//                 <select
//                   options
//                   class="form-select"
//                   onChange={(e) => setTypes(e.target.value)}
//                 >
//                   <option selected disabled>
//                     Select Type
//                   </option>
//                   <option>admin</option>
//                   <option>staff</option>
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input
//                   value={email}
//                   type="email"
//                   className="form-control"
//                   onChange={(e) => setEmail(e.target.value)}
//                   // required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Age</label>
//                 <input
//                   value={age}
//                   min={1}
//                   type="number"
//                   className="form-control"
//                   onChange={(e) => setAge(e.target.value)}
//                 />
//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     value={password}
//                     type="password"
//                     className="form-control"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Create Account
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div class="d-flex justify-content-start mt-5">
//         <a
//           type="button"
//           class="btn text-primary"
//           onClick={() => {
//             navigate("/dashboard/users");
//           }}
//         >
//           Back To List
//         </a>
//       </div>
//       <br />
//       <hr style={{ border: "1px solid black" }} />
//     </div>
//   );
// };

// export default AddUser;
import "../dashboard/layout.css";
import { Tooltip, Whisper } from "rsuite";
import { useState } from "react";
import "../image_upload/imageUpload.css"; // Import your CSS file
import img2 from "../image_upload/images/image1.jpg";

import { Breadcrumb } from "rsuite";

import axios from "../../axios-interceptor";
import { auth } from "../constants/endpoints";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../image_upload/imageUpload";

const AddUser = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [type, setTypes] = useState("");

  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // const handleImageChange = (e) => {
  //   console.log(e);
  //   const file = e.target.files[0];
  //   setImage(file);
  //   setPreviewImage(URL.createObjectURL(file)); // Create a preview URL
  // };
  const onsubmit = (e) => {
    e.preventDefault();

    if (name && age && email && type && password) {
      const data = {
        name: name,
        age: age,
        email: email,
        type: type,
        password: password,
      };
      const fd = new FormData();
      fd.append("image", image);
      fd.append("data", JSON.stringify(data));
      axios.post(auth.register, fd).then(
        (res) => {
          if (res["data"]["error"] === 1) {
            toast.error(res["data"]["msg"], {
              autoClose: 5000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            });
          } else {
            setImage(null);
            setName("");
            setAge("");
            setTypes("");
            setPassword("");
            setEmail("");
            setPreviewImage(null);
            const btn1 = (document.getElementById("btn1").style.display =
              "inline");
            toast.success("New Account Created", {
              autoClose: 1000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            });
          }
        },
        (err) => {
          toast.error(err, {
            autoClose: 5000,
            hideProgressBar: true,
            theme: "colored",
            progress: undefined,
          });
        }
      );
    } else {
      toast.error("Please Fill All Fields", {
        autoClose: 5000,
        hideProgressBar: true,
        theme: "colored",
        progress: undefined,
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
      onsubmit();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Function to handle image deletion
  const handleImageDelete = () => {
    setImage(null);
    setPreviewImage(null);
    // Clear the file input by resetting its value
    const fileInput = document.getElementById("imageInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Function to handle image deletion

  return (
    <div className="container-fluid">
      <Breadcrumb className="">
        <Breadcrumb.Item>User Management</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/users/add">Add</Breadcrumb.Item>
      </Breadcrumb>
      <h4 className="">Add User</h4>
      <hr style={{ border: "1px solid black" }} />
      <br></br>
      <div className="container-fluid w-75">
        <div className="row justify-content-center">
          <div className="col-lg-12 ">
            <form onSubmit={onsubmit} className="d-flex flex-column">
              <div className="form-group">
                <div className="row">
                  <div className="col-lg-6 ">
                    <div className="d-flex justify-content-start ">
                      <a
                        type="button"
                        className="btn text-primary"
                        onClick={() => {
                          navigate("/dashboard/users");
                        }}
                      >
                        Back To List
                      </a>
                    </div>
                    <div className="container w-50 mt-3">
                      <Whisper
                        followCursor
                        speaker={<Tooltip>Click Here To Add Picture</Tooltip>}
                      >
                        <label className="cursor" id="btn1">
                          {image ? (
                            <img
                              src={previewImage}
                              alt="Selected"
                              className="img-thumbnail mb-2"
                            />
                          ) : (
                            <img
                              src={img2}
                              alt="Selected"
                              className="img-thumbnail mb-2"
                            />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            id="imageInput" // Added an ID to the input element
                            onChange={handleImageChange}
                            className="form-control mb-2 choose-file"
                          />
                        </label>
                      </Whisper>
                    </div>
                    <div className="container mt-2">
                      {image && (
                        <div>
                          <button
                            className="btn btn-danger mb-2"
                            id="btn24"
                            onClick={handleImageDelete}
                          >
                            Delete Image
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="">
                      <label className="form-label">Name</label>
                      <input
                        value={name}
                        className="form-control"
                        // required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <label className="form-label">Type</label>
                      <select
                        options
                        className="form-select"
                        onChange={(e) => setTypes(e.target.value)}
                      >
                        <option selected disabled>
                          Select Type
                        </option>
                        <option>admin</option>
                        <option>staff</option>
                      </select>
                    </div>

                    <div className="">
                      <label className="form-label">Email</label>
                      <input
                        value={email}
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        // required
                      />
                    </div>

                    <div className="">
                      <label className="form-label">Age</label>
                      <input
                        value={age}
                        min={1}
                        type="number"
                        className="form-control"
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <input
                        value={password}
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 ">
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br></br>
      <hr style={{ border: "1px solid black" }} />
    </div>
  );
};

export default AddUser;
