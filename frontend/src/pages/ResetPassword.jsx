import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate=useNavigate()
  const{id,resetToken}=useParams()
  const initialFormData = {
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const HandleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/v1/resetpassword/${id}/${resetToken}`, {
        password: formData.password,
      });
      console.log('reset password response', response);

      if (response.status === 200) {
        //  clear the form
        alert("Password update successfully");
        navigate('/login')
        setFormData(initialFormData);
      } else {
        // Handle login error
        console.error("Reset password failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Form Data:", formData);
  };

  return (
    <>
      <section className="bg-gray-200 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-green-700 md:text-2xl dark:text-white text-center">
                New Password
              </h1>
              <p className=" text-center bg-green-50">
                Please create a new password
              </p>
              <form
                className="space-y-4 md:space-y-4"
                action="#"
                onSubmit={HandleReset}
              >
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

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  UpdatePassword
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
