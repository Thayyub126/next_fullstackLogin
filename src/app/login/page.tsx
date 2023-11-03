"use client"

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { toast } from "react-hot-toast";
import axios from "axios";

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const onLogin = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful", response.data);
      toast.success("Login success");
      router.push("/profile"); // Navigate to the profile page
    } catch (error: any) {
      console.error(
        "Login Failed",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user.email, user.password]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form className="d-flex justify-content-center" onSubmit={onLogin}>
      <h3>{loading ? "Processing" : "Login"}</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          onChange={handleInputChange}
          value={user.email}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          onChange={handleInputChange}
          value={user.password}
        />
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={buttonDisabled || loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>

      <Link href="/signup">Dont have an account? Sign up</Link>
    </form>
  );
};

export default Login;
