import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../Redux/Store";
import axios from "axios";

const Header = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      dispatch(authAction.logout());
      alert("logout successful");
      navigate("/login");
    } catch (error) {}
  };

const getUser=async () => {
  try {
    const response=await axios.get('http://localhost:5000/login/success',{withCredentials:true})
    console.log('response frontend response',response.data)
    
  } catch (error) {
    
  }
}
useEffect(()=>{
  getUser() 

},[])


  return (
    <>
      <header>
        <nav className="bg-gray-200 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Authentication
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              {isLogin && (
                <>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-800 text-white text-md  py-2  px-4 rounded-lg me-6"
                  >
                    Logout
                  </button>
                  <img
                    src="https://img.freepik.com/premium-vector/vector-design-user-profile-icon-style_1134108-30442.jpg?w=740" // Assuming user.photo contains the image URL
                    className="w-10 h-10 rounded-full object-cover mr-4"
                    alt="User Profile"
                  />
                </>
              )}

              {!isLogin && (
                <>
                  <Link
                    to="/login"
                    className="text-white bg-gray-700 hover:bg-primary-800  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  "
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-white bg-primary-700 hover:bg-primary-800  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  "
                  >
                    Register
                  </Link>
                </>
              )}

              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
