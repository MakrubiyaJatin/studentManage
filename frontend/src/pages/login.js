import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../redux/actions";

const Login = (props) => {
  const navigate = useNavigate()

  const [input, setInput] = useState();

const handleChange = (event) =>{
    const {name , value} = event.target;
    setInput({
        ...input,
        [name] : value
    })

}

useEffect(() =>{
  console.log('props ', props)
  if(props.response["data"]?.access_token){
    navigate("/home");
  }
},[props])

const handleSubmit = () =>{
  props.dispatch(loginAction(input));
}
  return (
    <div className="main">
      <div className="form">
        <form className="login-form">
          <input className="text-field" type="email"  name="email" onChange={handleChange} placeholder="email" />
          <input className="text-field" type="password" name="password" onChange={handleChange} placeholder="password" />
          <input type="button" name="Login" onClick={handleSubmit} value="Login"/>
          Don't have an Account? <Link to="/register">Register</Link>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (response) => ({
  response
});
export default connect(mapStateToProps)(Login);
