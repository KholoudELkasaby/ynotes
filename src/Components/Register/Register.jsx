import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

function Register() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

 async function handleRegister(values){
  setisLoading(true);
   const {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
   .catch((err)=> {
    setisLoading(false);
    setMessageError(err.response.data.msg);
  });
if (data.msg === "done") {
  setMessageError("");
  setisLoading(false);
  navigate("/login");
}
  }
  let validationSchema = Yup.object({
    name: Yup.string()
    .required("name is required")
    .min(3, "name min is 3")
    .max(10, "name max  is 10"),
  email: Yup.string().required("email is required").email("email is invalid"),
  password: Yup.string()
    .required("password is required")
    .matches(
      /^[A-Z][a-z0-9]{5,10}$/,
      "password must start with uppercase ..."
    ),
  age: Yup.number()
    .required("age is required")
    .min(18, "You must be at leat 18 Years old")
    .max(60, "You can't be more than 60"),
  phone: Yup.string()
    .required("phone is required")
    .matches(/^01[0125][0-9]{8}$/, "phone must be egyption number"),

  })
  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      age:"",
      phone:""
    },
    validationSchema,
    onSubmit:handleRegister,
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
              Create My Account!{" "}
            </h2>
            {messageError?<p className='text-danger'>{messageError}</p>:null}
            <form onSubmit={formik.handleSubmit} >
              <input
               className='form-control mb-2'
               type='text'
               name='name'
               id='name'
               value={formik.values.name}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               placeholder='Name'
              />
            {formik.errors.name && formik.touched.name ? <p className='text-danger'>{formik.errors.name}</p>:null }
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
              <input
                className="form-control mb-2  "
                type="number"
                name="age"
                id="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="age"
              />
            {formik.errors.age && formik.touched.age ? <p className='text-danger'>{formik.errors.age}</p>:null }
              <input
                className="form-control mb-2  "
                type="tel"
                name="phone"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Phone"
              />
            {formik.errors.phone && formik.touched.phone ? <p className='text-danger'>{formik.errors.phone}</p>:null }
              <button
               disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white   w-100  "
              >
                {!isLoading ? (
                  " Creat Account "
                ) : (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                )}
              </button>

              <div className="text-main text-center mt-3 font-sm">
                Already a member?
                <Link
                  className="nav-link py-1 px-2 text-blue d-inline"
                  to="/login"
                >
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
