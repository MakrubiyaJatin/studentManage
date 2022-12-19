import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserAction } from "../redux/actions"


const Register = (props) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(null);
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!input?.name) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }
    if (!input?.email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }
    if (!input?.password) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }
    return { formIsValid, errors }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { formIsValid, errors } = handleValidation()
    if (formIsValid) {
      props.dispatch(registerUserAction(input));
    }
    else {
      alert(`Error : ${errors?.name ? 'name : ' + errors?.name : ''}, ${errors?.email ? 'email : ' + errors?.email : ''} , ${'password : ' + errors?.password ? errors?.password : ''}`)
    }
  };
  useEffect(() => {
    console.log('props ', props)
    if (props.response['data']?.data) {
      navigate("/login");
    }
    if(props.response['error'])
    {
      alert(props.response['error'])
    }
  }, [props])

  return (
    <div className="main">
      <div className="form">
        <h2 >Register</h2>
        <form className="register-form">
          <input
            className="text-field"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter Name"
          />
          <input
            className="text-field"
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter Email Address"
          />
          <input
            className="text-field"
            type="mobile"
            name="mobile"
            onChange={handleChange}
            placeholder="Enter Mobile"
          />
          <div className="text-field">
            <div className="text-start ms-1 mb-2">
              <label className="fw-bold">Gender</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input me-2" type="radio" onChange={handleChange} name="gender" id="male" value="Male" />
              <label className="form-check-label" for="male">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input me-2" type="radio"  onChange={handleChange} name="gender" id="female" value="Female" />
              <label className="form-check-label" for="female">Female</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input me-2" type="radio"  onChange={handleChange} name="gender" id="other" value="Other" />
              <label className="form-check-label" for="other">Other</label>
            </div>
          </div>

          <input
            className="text-field"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter Password"
          />
          <input
            className="text-field"
            type="password"
            name="confirm_password"
            onChange={handleChange}
            placeholder="Enter Confirm Password"
          />
          <input

            type="button"
            name="register"
            onClick={handleSubmit}
            value="Register"
          />
          <p className="message">
            Already registered? <a href="/login">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (response) => ({
  response
});
export default connect(mapStateToProps)(Register);
