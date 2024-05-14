import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    photo: null,
  };
  const [formData, setFormData] = useState(initialFormData);


    // Function to handle file input change
    const handleFileInputChange = (e) => {
      setFormData({ ...formData, photo: e.target.files[0] });
      // Display the selected image preview
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("preview_img").src = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/register",
        formData
      );
      console.log("response", response);

      if (response.status === 200 || response.status === 201) {
        // clear the form
        alert("User Register successfully ");
        setFormData(initialFormData);
        navigate("/login");
      } else {
        // Handle registration error
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }
    console.log("Form Data:", formData);
  };

  return (
    <>
      <section className="bg-gray-200 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p className="text-xl"> User Register </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
            <img
                id="preview_img"
                className="h-20 w-20 object-cover rounded-full"
                src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
                alt="Current profile photo"
              />
            </div>
              <form
                className="space-y-4 md:space-y-2"
                action=""
                method="POST"
                onSubmit={handleLogin}
              >
                <div className="">
                  <label htmlFor="fileInput" className="text-4xl  fw-bold ">
                    +
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className="d-none   "
                    onChange={handleFileInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5"
                    placeholder="mr.John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5  dark:text-white  "
                    required
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-600 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300   "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const navigate = useNavigate();
//   const initialFormData = {
//     name: "",
//     email: "",
//     password: "",
//     photo: null,
//   };
//   const [formData, setFormData] = useState(initialFormData);
//   const [previewImage, setPreviewImage] = useState(null);

//   const handleInputChange = (e) => {
//     if (e.target.name === "photo") {
//       const file = e.target.files[0];
//       setFormData({ ...formData, [e.target.name]: file });
//       // Display preview of the selected image
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreviewImage(reader.result);
//         };
//         reader.readAsDataURL(file);
//       }
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("password", formData.password);
//       formDataToSend.append("photo", formData.photo);

//       const response = await axios.post(
//         "http://localhost:5000/api/v1/register",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert("User registered successfully");
//         setFormData(initialFormData);
//         setPreviewImage(null); // Clear preview image
//         navigate("/login");
//       } else {
//         console.error("Registration failed");
//       }
//     } catch (error) {
//       console.error("Axios Error:", error);
//     }
//   };

//   return (
//     <>
//       <section className="bg-gray-200 dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-green-700 md:text-2xl dark:text-white text-center">
//                 Register
//               </h1>

//               <form
//                 className="space-y-4 md:space-y-4"
//                 action=""
//                 method="POST"
//                 onSubmit={handleLogin}
//                 encType="multipart/form-data"
//               >
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
//                     placeholder="Mr. John Doe"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     id="password"
//                     placeholder="••••••••"
//                     className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5  dark:text-white  "
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="photo"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Profile Photo
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     name="photo"
//                     onChange={handleInputChange}
//                     className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
//                     required
//                   />
//                   {/* Display preview of selected image */}
//                   {previewImage && (
//                     <img
//                       src={previewImage}
//                       alt="Preview"
//                       className="mt-2 w-full rounded-lg"
//                     />
//                   )}
//                 </div>

//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="terms"
//                       aria-describedby="terms"
//                       type="checkbox"
//                       className="w-4 h-4 border border-gray-600 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300   "
//                       required
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label
//                       htmlFor="terms"
//                       className="font-light text-gray-500 dark:text-gray-300"
//                     >
//                       I accept the{" "}
//                       <a
//                         className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                         href="#"
//                       >
//                         Terms and Conditions
//                       </a>
//                     </label>
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
//                 >
//                   Create an account
//                 </button>
//                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                   Already have an account?{" "}
//                   <Link
//                     to={"/login"}
//                     className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                   >
//                     Login here
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Register;
