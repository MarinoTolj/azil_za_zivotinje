import React, { useState } from "react";
import { ErrorMessage, SuccessMessage } from "../helpers/functions";
import Input from "../components/FormComponents/Input";
import Button from "../components/Button";
import { axiosProtected } from "../api/axios";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await axiosProtected.post(`/login`, data);
      if (response.status == 200) {
        SuccessMessage("Login successful");
        navigate("/all-animals");
      }
    } catch (error) {
      console.log({ error });
      ErrorMessage("Your email or password is incorrect.");
    }
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
