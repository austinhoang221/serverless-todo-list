import {
  Button,
  Flex,
  Heading,
  Link,
  TextField,
  Text,
} from "@aws-amplify/ui-react";
import React from "react";
import { signIn } from "../../api/auth.service";

export const Login = () => {
  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const result = await signIn(formData?.email, formData?.password);
      console.log("Login result:", result);
    } catch (err) {
      alert("Login failed: " + err);
    }
  };
  return (
    <>
      <Heading level={4}>Login</Heading>
      <Flex direction="column" gap="1rem" marginTop="1rem">
        <TextField
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <Text className="">
          Not have an account yet?
          <Button marginLeft="0.25rem" variation="link" padding="0">
            <Link href="/signUp">Sign Up</Link>
          </Button>
        </Text>
        <Button variation="primary" onClick={handleLogin}>
          Login
        </Button>
      </Flex>
    </>
  );
};
