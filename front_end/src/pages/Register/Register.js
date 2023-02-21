import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

// CSS
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  // React Form
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  //   Firebase
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  if (loading) {
    // return <Loading></Loading>;
  }

  // Register
  const onSubmit = (data) => {
    const { email, password } = data;
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <div className="px-7 sm:px-0 min-h-screen bg-[#6c34e0] flex flex-col justify-center py-12">
      <div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-5xl pb-5 leading-9 font-extrabold text-gray-900">
                  Sign Up
                </h2>
                <p className="mt-2 text-center text-base leading-5 text-gray-600">
                  Or{" "}
                  <Link
                    to="/login"
                    className="font-medium text-[#6c34e0] hover:text-indigo-500 focus:underline transition ease-in-out duration-150"
                  >
                    log in
                  </Link>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium leading-5 mb-1 text-gray-700">
                  E-mail
                </label>
                <div>
                  <input
                    type="text"
                    autoComplete="off"
                    name="null"
                    style={{
                      transitionProperty:
                        "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
                    }}
                    className={`form-input block py-2 px-3 border rounded-md focus:shadow-outline-blue focus:border-blue-300 duration-150 ease-in-out sm:text-sm sm:leading-5 w-full focus:shadow-[0_0_0_3px_rgba(164,202,254,0.45)] focus-visible:outline-none ${
                      errors["email"] ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Please enter an email",
                      },
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {(errors.email?.type === "required" || "pattern") && (
                    <div className="text-xs text-red-500 mt-1">
                      {errors.email?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium leading-5 mb-1 text-gray-700">
                  Retype e-mail
                </label>
                <div>
                  <input
                    type="email"
                    autoComplete="off"
                    name="null"
                    style={{
                      transitionProperty:
                        "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
                    }}
                    className={`form-input block py-2 px-3 border rounded-md focus:shadow-outline-blue focus:border-blue-300 duration-150 ease-in-out sm:text-sm sm:leading-5 w-full focus:shadow-[0_0_0_3px_rgba(164,202,254,0.45)] focus-visible:outline-none ${
                      errors["repeatEmail"]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    {...register("repeatEmail", {
                      required: {
                        value: true,
                        message: "Please enter an email",
                      },
                      validate: (value) =>
                        value === getValues("email") ||
                        "Enter same email",
                    })}
                  />
                  {(errors.repeatEmail?.type === "required" || "validate") && (
                    <div className="text-xs text-red-500 mt-1">
                      {errors.repeatEmail?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Password
                </label>
                <div>
                  <input
                    type="password"
                    autoComplete="off"
                    name="null"
                    style={{
                      transitionProperty:
                        "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
                    }}
                    className={`form-input block py-2 px-3 border rounded-md focus:shadow-outline-blue focus:border-blue-300 duration-150 ease-in-out sm:text-sm sm:leading-5 w-full focus:shadow-[0_0_0_3px_rgba(164,202,254,0.45)] focus-visible:outline-none ${
                      errors["password"] ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Please enter a password",
                      },
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <div className="text-xs text-red-500 mt-1">
                      {errors.password?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="relative flex items-start mt-2">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      style={{
                        transitionProperty:
                          "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
                      }}
                      className={`border appearance-none bg-white inline-block checked:bg-current form-checkbox h-4 w-4 text-[#6c34e0] transition rounded duration-150 ease-in-out cursor-pointer focus:shadow-outline-blue focus:shadow-[0_0_0_3px_rgba(164,202,254,0.45)] focus-visible:outline-none checked:border-indigo-600 checked:bg-[length:100%_100%] checked:bg-center checked:bg-no-repeat ${
                        errors["checkbox"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      {...register("checkbox", {
                        required: {
                          value: true,
                          message: "Click the checkbox",
                        },
                      })}
                    />
                  </div>
                  <div className="ml-2 text-sm leading-5">
                    <span className="font-medium text-gray-700">
                      I am agree with the{" "}
                      <Link
                        to={{
                          pathname: "/terms",
                        }}
                        target="_blank"
                        className="underline"
                      >
                        terms
                      </Link>
                      ,and{" "}
                      <Link
                        to={{
                          pathname: "/condition",
                        }}
                        target="_blank"
                        className="underline"
                      >
                        conditions
                      </Link>
                      .
                    </span>
                    {errors.checkbox?.type === "required" && (
                      <div className="text-xs text-red-500 mt-1">
                        {errors.checkbox?.message}
                      </div>
                    )}
                  </div>
                </label>
              </div>
              {error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 mb-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="24px"
                        height="24px"
                        className="text-red-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm leading-5 text-red-700">
                        {error.message.split("(")[1].split(")")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6c34e0] hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Register
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
