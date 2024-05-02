import React, { useState } from "react";
import { ErrorMessage, SuccessMessage } from "../helpers/functions";
import Input from "../components/FormComponents/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import Radio from "../components/FormComponents/Radio";
import { UserRole } from "../helpers/types";
import axios from "../api/axios";
import PasswordChecklist from "react-password-checklist";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [confirm_password, setConfirm_Password] = useState("");

  const [validPassword, setValidPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username,
      email,
      role,
      password,
    };

    if (validPassword) {
      try {
        const response = await axios.post(`/registration`, data);
        if (response.status === 200) {
          SuccessMessage("Registration successful");
          navigate("/login");
        } else {
          ErrorMessage("An error happened");
        }
      } catch (error) {
        ErrorMessage("User with that email already exists");
        console.log("Error: ", error);
      }
    }
  };
  return (
    <div className="text-center w-full m-auto mt-3">
      <form
        className="flex flex-col gap-5 w-fit m-auto"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="username"
          label="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
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

        <Input
          type="password"
          placeholder="password"
          label="Confirm Password"
          required
          onChange={(e) => setConfirm_Password(e.target.value)}
          minLength={10}
        />
        {password && (
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={10}
            value={password}
            valueAgain={confirm_password}
            onChange={(isValid) => {
              setValidPassword(isValid);
            }}
          />
        )}
        <div className="flex gap-3 m-auto">
          <label htmlFor="">Select Role:</label>
          <div>
            <Radio
              label="User"
              value="user"
              onChange={(e) => setRole(e.target.value as UserRole)}
              name="role"
            />
          </div>
          <div>
            <Radio
              label="Admin"
              value="admin"
              onChange={(e) => setRole(e.target.value as UserRole)}
              name="role"
            />
          </div>
        </div>
        <Button type="submit" className="mb-5 w-3/4 mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
}
