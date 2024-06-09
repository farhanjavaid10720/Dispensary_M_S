// import "../dashboard/layout.css";
// import { Tooltip, Whisper } from "rsuite";
// import { useState, useContext, useEffect, useRef } from "react";
// import "../image_upload/imageUpload.css"; // Import your CSS file
// import img2 from "../image_upload/images/image1.jpg";
// import { Breadcrumb } from "rsuite";

// import axios from "axios";
// import { users } from "../constants/endpoints";

// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import { AppContext } from "../Context/AppContext";

// const EditUserProfile = (props) => {
//   const { user, setUser } = useContext(AppContext);
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({});
//   const [password, setPassword] = useState("");
//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [userId, setUserId] = useState("");
//   const checkUser = useRef(user);
//   const GetUserData = async (id) => {
//     var userId = checkUser._id;
//     try {
//       const header = {
//         headers: {
//           Authorization: localStorage.getItem("jwt"),
//         },
//       };

//       const response = await axios.get(users.byId(id), header);

//       setUserData(response.data.data[0]);
//     } catch (error) {
//       console.error("An error occurred while fetching user data: ", error);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       GetUserData(user._id);
//       setUserId(user._id);
//     }
//   }, [user, setUser]);

//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [email, setEmail] = useState("");
//   const [type, setTypes] = useState("");

//   useEffect(() => {
//     if (userData && userData.name) {
//       setName(userData.name);
//     }
//     if (userData && userData.age) {
//       setAge(userData.age);
//     }
//     if (userData && userData.email) {
//       setEmail(userData.email);
//     }
//     if (userData && userData.type) {
//       setTypes(userData.type);
//     }
//   }, [userData]);

//   const onsubmit = (e) => {
//     e.preventDefault();

//     const header = {
//       headers: {
//         Authorization: localStorage.getItem("jwt"),
//       },
//     };
//     const data = {
//       name: name,
//       age: age,
//       email: email,
//       type: type,
//     };
//     if (password) {
//       data.password = password;
//     }

//     const fd = new FormData();
//     if (image !== null) {
//       fd.append("image", image);
//     }
//     fd.append("data", JSON.stringify(data));

//     axios.put(users.update(userId), fd, header).then(
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
//           GetUserData(userId);
//           const btn1 = (document.getElementById("btn1").style.display =
//             "inline");
//           toast.success("User Account Is Updated", {
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
//         <Breadcrumb.Item>Edit Profile</Breadcrumb.Item>
//         <Breadcrumb.Item href="/dashboard/edit-profile">Edit</Breadcrumb.Item>
//       </Breadcrumb>
//       <h3 className="mt-2">Edit User Profile</h3>
//       <hr style={{ border: "1px solid black" }} />

//       <div className="container w-50">
//         <div className="row justify-content-center">
//           <div className="col-lg-7 ">
//             <form onSubmit={onsubmit} className="d-flex flex-column">
//               <div className="form-group">
//                 <div className="container">
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
//                           src={userData.image || img2}
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
//                   value={type}
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
//                     // type="password"
//                     className="form-control"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Update Account
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
//             navigate("/dashboard");
//           }}
//         >
//           Back To Dashboard
//         </a>
//       </div>
//       <br />
//       <hr style={{ border: "1px solid black" }} />
//     </div>
//   );
// };

// export default EditUserProfile;

import "../dashboard/layout.css";
import { Tooltip, Whisper } from "rsuite";
import { useState, useContext, useEffect, useRef } from "react";
import "../image_upload/imageUpload.css"; // Import your CSS file
import img2 from "../image_upload/images/image1.jpg";
import { Breadcrumb } from "rsuite";

import axios from "axios";
import { users } from "../constants/endpoints";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../Context/AppContext";

const EditUserProfile = (props) => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [userId, setUserId] = useState("");
  const checkUser = useRef(user);
  const GetUserData = async (id) => {
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };

      const response = await axios.get(users.byId(id), header);

      setUserData(response.data.data[0]);
    } catch (error) {
      console.error("An error occurred while fetching user data: ", error);
    }
  };

  const ShowUserData = async (id) => {
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };

      const response = await axios.get(users.byId(id), header);

      setUser(response.data.data[0]);
    } catch (error) {
      console.error("An error occurred while fetching user data: ", error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      GetUserData(user._id);
      setUserId(user._id);
    }
  }, [user, setUser]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [type, setTypes] = useState("");

  useEffect(() => {
    if (userData && userData.name) {
      setName(userData.name);
    }
    if (userData && userData.age) {
      setAge(userData.age);
    }
    if (userData && userData.email) {
      setEmail(userData.email);
    }
    if (userData && userData.type) {
      setTypes(userData.type);
    }
  }, [userData]);

  const onsubmit = (e) => {
    e.preventDefault();

    const header = {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    };
    const data = {
      name: name,
      age: age,
      email: email,
      type: type,
    };
    if (password) {
      data.password = password;
    }

    const fd = new FormData();
    if (image !== null) {
      fd.append("image", image);
    }
    fd.append("data", JSON.stringify(data));

    axios.put(users.update(userId), fd, header).then(
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
          GetUserData(userId);
          ShowUserData(userId);
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
        <Breadcrumb.Item>Edit Profile</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/edit-profile">Edit</Breadcrumb.Item>
      </Breadcrumb>
      <h4 className="">Edit User Profile</h4>
      <hr style={{ border: "1px solid black" }} />

      <div className="container-fluid w-75">
        <div className="row justify-content-center">
          <div className="col-lg-12 ">
            <form onSubmit={onsubmit} className="d-flex flex-column">
              <div className="form-group">
                <div className="row">
                  <div className="col-lg-6 ">
                    <div className="d-flex justify-content-start">
                      <a
                        type="button"
                        className="btn text-primary"
                        onClick={() => {
                          navigate("/dashboard");
                        }}
                      >
                        Back To Dashboard
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
                              className="img-thumbnail mb-3"
                            />
                          ) : (
                            <img
                              src={userData.image || img2}
                              alt="Selected"
                              className="img-thumbnail mb-3"
                            />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            id="imageInput" // Added an ID to the input element
                            onChange={handleImageChange}
                            className="form-control mb-3 choose-file"
                          />
                        </label>
                      </Whisper>
                    </div>
                    <div className="container mt-3">
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
                    <div className="mb- mt-2">
                      <label className="form-label">Name</label>
                      <input
                        value={name}
                        className="form-control"
                        // required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Type</label>
                      <select
                        options
                        value={type}
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
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        value={email}
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        // required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Age</label>
                      <input
                        value={age}
                        min={1}
                        type="number"
                        className="form-control"
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          value={password}
                          // type="password"
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update Account
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <br />
      <hr style={{ border: "1px solid black" }} />
    </div>
  );
};

export default EditUserProfile;
