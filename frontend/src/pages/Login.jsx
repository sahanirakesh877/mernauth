import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "./../Redux/Store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        formData
      );
      console.log(response)

      if (response.status === 200 || response.status === 201) {
        // clear the form
        alert("User Signin successfully ");
    // Extract the token from the response data
    const token = response.data.token;
    // Store the token in localStorage
    localStorage.setItem('token', token);
     // Optionally, you can also store the user ID if needed
     console.log(response.data, "to be set")
     if (response.data.userID) {
      localStorage.setItem('userId', response.data.userID);
  } else {
      console.error("User ID not found in response data");
  }

 
        setFormData(initialFormData);
        dispatch(authAction.login());

        navigate("/");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loginGoogle = () => {
    // Redirect to Google authentication
    window.location.href = "http://localhost:5000/auth/google/callback";
  };

 

  return (
    <>
      <section className="bg-gray-200 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-green-700 md:text-2xl dark:text-white text-center">
                Login
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                method="POST"
                onSubmit={handleLogin}
              >
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
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <Link to={"/forgetpassword"}>
                      <span className="block  mb-2 text-sm font-medium text-blue-500 dark:text-white">
                        Forget Password ?
                      </span>
                    </Link>
                   
                  </div>
                  
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                  <div className="ml-3 text-sm flex  ">
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
                    <Link to={"/changepassword"}>
                      <span className="block  ms-6  text-sm font-semibold text-blue-800 dark:text-white">
                        Change Password?
                      </span>
                    </Link> 
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Sign in Your account
                </button>

                <button
                  type="submit"
                  className="w-full text-dark border border-gray-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-1 text-center  flex items-center justify-center"
                  onClick={loginGoogle}
                >
                  <span>
                    <img
                      src="https://cdn-teams-slug.flaticon.com/google.jpg"
                      alt="..loading"
                      className="w-10 h-10 "
                    />
                  </span>
                  Continue With Google
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
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

export default Login;
