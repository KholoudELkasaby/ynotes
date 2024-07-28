import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authContext } from '../../Context/AuthContext'

function Login() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  let {setToken} = useContext(authContext);
 async function handleLogin(values){
  setisLoading(true);
   const {data} = await axios.post(`apikey`, values)
   .catch((err)=> {
    setisLoading(false);
    setMessageError(err.response.data.msg);
  });
if (data.msg === "done") {
  setMessageError("");
  setToken(`3b8ny__${data.token}`);
  localStorage.setItem("token",`3b8ny__${data.token}`);
  setisLoading(false);
  navigate("/");
}
  }
  let validationSchema = Yup.object({
  email: Yup.string().required("email is required").email("email is invalid"),
  password: Yup.string()
    .required("password is required")
    .matches(
      /^[A-Z][a-z0-9]{5,10}$/,
      "password must start with uppercase ..."
    )
  })
  let formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema,
    onSubmit:handleLogin,
  })
  return (
    <>
      <div className='container pt-5 mt-5'>
        <div className='row gx-0'>
          <div className='col-md-6'>
            <img
               src={require("../../assests/images/note-taking.png")}
               alt=''
               className='w-100 h-100'
            />
          </div>
          <div className='col-md-6 bg-white p-3'>
            <h2 className='text-center fw-bold text-main mb-3'>
              Log in to notes{" "}
            </h2>
            {messageError?<p className='text-danger'>{messageError}</p>:null}
            <form onSubmit={formik.handleSubmit} >
              
              <input
                className='form-control mb-2'
                type='email'
                name='email'
                id='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Email'
              />
            {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p>:null }
              <input
                className="form-control mb-2  "
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
              />
            {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p>:null }
              <button
                type="submit"
                className="btn bg-main text-white   w-100  "
              >
                {!isLoading ? (
                  " Login "
                ) : (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                )}
              </button>
               <hr/>
              <div className="text-main text-center mt-3 font-sm">
                Not a member yet ?
                <Link
                  className="nav-link py-1 px-2 text-blue d-inline"
                  to="/register"
                >
                  create  an acount
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

