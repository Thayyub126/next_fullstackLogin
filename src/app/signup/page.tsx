"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast/headless";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.userName.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("Signup Success", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="d-flex justify-content-center">
      <h3>{loading ? "Processing" : "SignUp"}</h3>

      <div className="mb-3">
        <label>User Name</label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="User Name"
          id="username"
          onChange={(e: any) => setUser({ ...user, userName: e.target.value })}
          value={user.userName}
        />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter email"
          onChange={(e: any) => setUser({ ...user, email: e.target.value })}
          value={user.email}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter password"
          onChange={(e: any) => setUser({ ...user, password: e.target.value })}
          value={user.password}
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input mb-3"
            id="customCheck1"
          />
          <label className="custom-control-label mb-3" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={onSignUp}
        >
          {buttonDisabled ? "No Sign UP" : "Sign UP"}
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
      <Link href="/login"> Login</Link>
    </form>
  );
};

export default SignUp;
