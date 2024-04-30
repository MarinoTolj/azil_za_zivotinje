import React, { useState } from "react";
import { SuccessMessage } from "../helpers/functions";
import Input from "../components/FormComponents/Input";
import Button from "../components/Button";
import axios, { axiosProtected } from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    axios
      .post(`/login`, data)
      .then((res) => {
        console.log({res});
        sessionStorage.setItem("accessToken", res.data);
        SuccessMessage("Login successful");

        //navigate("/all-animals");
      });
  };
  return (
    <div className="text-center w-full m-auto mt-3">
      <form
        className="flex flex-col gap-5 w-fit m-auto"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="email"
          label="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>testtest12</p>
        <Input
          type="password"
          placeholder="password"
          label="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          minLength={10}
        />
        <Button type="submit" className="mb-5 w-3/4 mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
}
