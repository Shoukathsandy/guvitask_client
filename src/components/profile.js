import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import * as React from 'react'
import TextField from '@mui/material/TextField';
import "../App.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { API } from "../globel";
import { useFormik } from 'formik';
import * as yup from 'yup';




export default function Profile() {
    const navigate = useNavigate();

    const FormValidationSchema = yup.object({
        fullname:yup.string().required("enter valid text"),
        dob: yup.string().required("enter valid date"),
        age: yup.number().required("enter valid umber"),
        gender:yup.string().required("enter valid detail"),
        contact:yup.number().required("enter number"),
    })

    const { handleChange, handleBlur, handleSubmit, values, touched, errors } = useFormik({
        initialValues: { fullname: "", dob: "", age:"", gender:"", contact:"" },
        validationSchema: FormValidationSchema,
        onSubmit: (values) => {
            login(values)
        }
    });

    const login = (data) => {
    
        fetch(`${API}/user/profile`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    toast.error(data.error);
                } else {
                    console.log(data);
                    toast.success(data.msg);
                    navigate("/logout");
                }
            })
    }
    return (
        <form onSubmit={handleSubmit} className="user">
          <div>
             < TextField
                    className="form-control form-control-user"
                    type="text"
                    name="fullname"
                    label="fullname"
                    value={values.fullname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.fullname && touched.fullname}
                    helperText={errors.fullname && touched.fullname ? errors.fullname : ""}
                />
            </div>
            <div>
             < TextField
                    className="form-control form-control-user"
                    type="date"
                    name="dob"
                    label=""
                    value={values.dob}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.dob && touched.dob}
                    helperText={errors.dob && touched.dob ? errors.dob : ""}
                />
            </div>
            <div>
             < TextField
                    className="form-control form-control-user"
                    type="text"
                    name="age"
                    label="age"
                    value={values.age}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.age && touched.age}
                    helperText={errors.age && touched.age ? errors.age : ""}
                />
            </div>
            <div>
             < TextField
                    className="form-control form-control-user"
                    type="text"
                    name="gender"
                    label="gender"
                    value={values.gender}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.gender && touched.gender}
                    helperText={errors.gender && touched.gender ? errors.gender : ""}
                />
            </div>
            <div>
             < TextField
                    className="form-control form-control-user"
                    type="text"
                    name="contact"
                    label="contact"
                    value={values.contact}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.contact && touched.contact}
                    helperText={errors.contact && touched.contact ? errors.contact : ""}
                />
            </div>
            <Button
                type="submit"
                className="btn btn-primary btn-user btn-block form-control form-control-user"
                variant="contained">save</Button>
         
          
          
        </form>
    )
};