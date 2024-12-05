import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState({ username: "", email: "", password: "" });
  const [loading, setloading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const SignupHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({ username: "", email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={SignupHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Signup to see photos & videos from your friends
          </p>
        </div>
        <div>
          <Label htmlFor="username" className="font-medium">
            Username
          </Label>
          <Input
            type="text"
            name="username"
            value={input.username}
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label htmlFor="email" className="font-medium">
            Email
          </Label>
          <Input
            type="text"
            name="email"
            value={input.email}
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label htmlFor="password" className="font-medium">
            Password
          </Label>
          <Input
            type="password"
            value={input.password}
            name="password"
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Signup</Button>
        )}
        <span className="text-center">
          Already have an account?
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
