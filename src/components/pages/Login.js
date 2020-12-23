// react
import { React, Component } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, toast} from 'react-toastify'; 
// layouts, customs
import Button from '../layouts/Button';
import loginImage from './pages-images/login-img.png';
import { TextInput } from '../layouts/FormInput';
import { loginSchema } from '../Validation/Schema';
import { HomeButton } from '../layouts/HomeButton';

const invalidDetailsLogger = () => toast.warning("Invalid Login details")
const isUserAuthenticatedLogger = () => toast.success("Logging in")

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: {
                workSpaceEmail: 'unclebay@gmail.com',
                workSpacePassword: 'samueliscoming'
            },
            isUserAuthenticated: false
        }
    }

    componentDidMount(){
        document.title = 'Login | Pace'
    }


   
    
    
    render(){
        return(
            <div className="container">
                <main className="container d-flex justify-content-center align-items-center mt-5">
                    <div className="row">
                        <div className="form-con col-lg-5 mb-5">
                            <ToastContainer 
                                position="bottom-right"
                            />
                            <style>
                                {
                                    `
                                        .Toastify__toast{
                                            background: rgb(255,112,150);
                                            color: #FFFFFF;
                                        }
                                    `
                                }
                            </style>

                            <HomeButton />
                            <div className="form-heading mt-5">
                            <h3 className="mb-3">Login working</h3>
                            <h4 className="mb-5">Welcome back!</h4>
                            </div>
                            <div className="mt-5" name="form">
                                <div className="form-group mt-b">
                                    <Formik
                                        initialValues={{
                                            email: '',
                                            password: ''
                                        }}
                                        validationSchema = {loginSchema}
                                        onSubmit={(values, setSubmitting)=>{
                                                if(values.email === this.state.user.workSpaceEmail && values.password === this.state.user.workSpacePassword){
                                                    isUserAuthenticatedLogger();
                                                    setTimeout(() => {
                                                        this.props.history.push('/dashboard');
                                                    }, 2000);
                                                }else{
                                                    setSubmitting=(false)
                                                    invalidDetailsLogger()
                                                }
                                            }}
                                        
                                    >{({values, touched, errors, isSubmitting, handleSubmit, handleChange}) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="email-wrapper pb-3">
                                                <TextInput 
                                                    label="Enter your workspace address"
                                                    name="email"
                                                    type="email"
                                                    className={`form-control p-2 ${
                                                        touched.email && errors.email ? "is-invalid" : ""
                                                    }`}
                                                    id="email"
                                                    placeholder="example@company.com"
                                                    onBlur = {this.handleChange}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="email"
                                                    className="invalid-feedback p-0"
                                                />
                                            </div>
                                            <div className="password-wrapper">
                                                <TextInput 
                                                    name="password"
                                                    type="password"
                                                    label="Password"
                                                    labelClassName="mt-3"
                                                    className={`form-control p-2 ${
                                                        touched.password && errors.password ? "is-invalid" : ""
                                                    }`}
                                                    id="passwords"
                                                    placeholder="Password"
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="password"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                            <div className="mt-3">
                                            {/* <Link to="/dashboard"> */}

                                                <Button 
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    disabled={isSubmitting}
                                                    label={isSubmitting ? (<span><i className="fa fa-spinner fa-spin"></i> Loading...</span>) : "Login"}
                                                    />
                                            {/* </Link> */}
                                                <p>Create your workspace register <Link to="/signup">Here</Link></p>
                                                <span><Link to="/forgot">Forgot Passwords</Link></span>
                                            </div>
                                        </Form>
                                        
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                    
                    <div className="img-con col-lg-7 d-none d-lg-block">
                        <div className="login-intro-img mt-3">
                        <img src={loginImage} alt="office timing" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
        )
    }
}

Login.propTypes = {
    workSpaceEmail: PropTypes.string.isRequired,
    password: PropTypes.any.isRequired
};


export default withRouter(Login);