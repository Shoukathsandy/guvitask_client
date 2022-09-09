import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from "../globel.js";
import "../App.css";



export default function Register() {
    const navigate = useNavigate();

    const FormValidationSchema = yup.object({
        name:yup.string().required(),
        email: yup.string().email().required(),
        password: yup
            .string()
            .required("Please Enter your password")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            )
            .min(8, "Password is too short - should be 8 chars minimum."),
        confirmPassword:yup.string().required("password and confirm password should be same")

    });

    const { handleChange, handleBlur, handleSubmit, values, touched, errors } = useFormik({
        initialValues: { name:"",email: "", password: "",confirmPassword:"" },
        validationSchema: FormValidationSchema,
        onSubmit: (values) => {
            addquotationmaker(values);

        }
    });
    const addquotationmaker = (data) => {
        fetch(`${API}/user/register`,
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
                    navigate("/login");
                }
            }).catch((error) => { console.log(error) })
    }
    return (
        <>

        <form onSubmit={handleSubmit} className="user">
        <div >
                <TextField className="form-control form-control-user"
                    type="name"
                    name="name"
                    label="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name ? errors.name : ""}
                />
            </div>
            <div >
                <TextField className="form-control form-control-user"
                    type="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email ? errors.email : ""}
                />
            </div>
            <div >
                < TextField
                    className="form-control form-control-user"
                    type="password"
                    name="password"
                    label="Password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.password && touched.password}
                    helperText={errors.password && touched.password ? errors.password : ""}
                />
            </div>
            <div>
             < TextField
                    className="form-control form-control-user"
                    type="Password"
                    name="confirmPassword"
                    label="confirmPassword"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.confirmPassword && touched.confirmPassword}
                    helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
                />
            </div>
            <Button
                // onClick={()=>{window.location.href='/login'}}
                type="submit"
                className="btn btn-primary btn-user btn-block form-control form-control-user"
                variant="contained">Register</Button>
            <div > Have an account? <Link className="lgbtn" to="/login">Login</Link>
            </div>
            <div className="lgbtn"><Link className="lgbtn" to="/forgot-password">Forgot Password</Link></div>

        </form>
        
        </>

    )
}


