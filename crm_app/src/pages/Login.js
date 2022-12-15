import { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userSignin, userSignup } from "../api/auth";
import './login.css'
// signup : userid, username, email, password
// login: userid, password
/*
POST API 
1. Grab the data 
2. Store the data 
3. Call the api */

/*
POST API SIGNUP
1. Grab the data : userid, username, email, usertype, password
2. Store the data : username, email
3. Call the api */
function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const [message, setMessage] = useState("");

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("CUSTOMER");
  const navigate = useNavigate();

  const signupFn = (e) => {
    const data = {
      name: userName,
      userId: userId,
      email: userEmail,
      userType: userType,
      password: password,
    };
    e.preventDefault();

    userSignup(data)
      .then(function (response) {
        if (response.status === 201) {
          setShowSignup(false);
          setMessage("User Signed Up Successfully...");
        }
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  const updateSignupData = (e) => {
    if (e.target.id === "userId") setUserId(e.target.value);
    else if (e.target.id === "password") setPassword(e.target.value);
    else if (e.target.id === "username") setUserName(e.target.value);
    else setUserEmail(e.target.value);
  };

  const loginFn = (e) => {
    e.preventDefault();
    const data = {
      userId: userId,
      password: password,
    };
    userSignin(data)
      .then((response) => {
        // setItem(name, value)
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userTypes", response.data.userTypes);
        localStorage.setItem("userStatus", response.data.userStatus);
        localStorage.setItem("token", response.data.accessToken);
        if (response.data.userTypes === "CUSTOMER") navigate("/customer");
        else if (response.data.userTypes === "ENGINEER") navigate("/engineer");
        else if (response.data.userTypes === "ADMIN") navigate("/admin");
        else navigate("/");
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const handleSelect = (e) => {
    setUserType(e);
  };
  return (
    <div>
      <div className="bg-dark d-flex justify-content-center align-items-center vh-100">
        <div id="loginbox"
          className={
            !showSignup
              ? "card m-5 p-5 text-light shadow-lg bg-dark d-flex justify-content-center align-items-center backg"
              : "card m-5 p-5 text-light shadow-lg bg-dark d-flex justify-content-center align-items-center backg"
          }
        >
          <div className="row m-2 ">
            <div>
              <h4 className="text-center ">
                {showSignup ? "Sign up" : "Login"}
              </h4>
              <form onSubmit={showSignup ? signupFn : loginFn}>
                <div className="input-group m-1">
                  <input
                    type="text"
                    className="form-group m-1 rounded-2"
                    placeholder="User Id"
                    id="userId"
                    value={userId}
                    onChange={updateSignupData}
                    autoFocus
                    required
                  />
                </div>
                <div className="input-group m-1">
                <input
                  type="password"
                  className="form-group m-1 rounded-2"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={updateSignupData}
                  required
                />
                </div>
                {showSignup && (
                  <>
                    <div className="input-group m-1">
                      <input
                        type="text"
                        className="form-group m-1 rounded-2"
                        placeholder="User Name"
                        id="username"
                        value={userName}
                        onChange={updateSignupData}
                        required
                      />
                    </div>
                    <div className="input-group m-1">
                      <input
                        type="text"
                        className="form-group m-1 rounded-2"
                        placeholder="Email"
                        id="email"
                        value={userEmail}
                        onChange={updateSignupData}
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col py-2 ">
                        <span className="mx-1 my-1"> User Type</span>
                      </div>
                      <div className="col">
                        <DropdownButton
                          align="end"
                          title={userType}
                          id="userType"
                          onSelect={handleSelect}
                          variant="light"
                        >
                          <Dropdown.Item eventKey="CUSTOMER">
                            CUSTOMER
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="ENGINEER">
                            ENGINEER
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </div>
                  </>
                )}
                <div className="input-group mt-3">
                  <input
                    type="submit"
                    className="form-control btn btn-danger"
                    value={showSignup ? "Sign Up" : "Log In"}
                  />
                </div>
                <div
                  className="signup-btn text-center mt-3"
                  onClick={toggleSignup}
                >
                  {showSignup
                    ? "Already have an Account ? Login"
                    : "Don't have an Account? Signup"}
                </div>
                <div className="text-success text-center">{message}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
