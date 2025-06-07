import {
  Button,
  Flex,
  Heading,
  Link,
  TextField,
  Text,
} from "@aws-amplify/ui-react";
import React from "react";
import { signUp } from "../../api/auth.service";

const SignUp = () => {
  const [formData, setFormData] = React.useState({ email: "", nickName: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const result = await signUp(formData?.email, formData?.nickName);
      console.log("Login result:", result);
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  return (
    <>
      <Heading variation="primary" level={4}>
        Sign Up
      </Heading>
      <Flex direction="column" gap="1rem" marginTop="1rem">
        <TextField
          name="email"
          label="Email"
          errorMessage="123"
          hasError
          type="email"
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Nick name"
          type="text"
          onChange={handleChange}
        />
        <Text>
          Already have an account?
          <Button marginLeft="0.25rem" variation="link" padding="0">
            <Link href="/login">Login</Link>
          </Button>
        </Text>
        <Button variation="primary" onClick={handleSignup}>
          Sign Up
        </Button>
      </Flex>
    </>
  );
};

export default SignUp;
