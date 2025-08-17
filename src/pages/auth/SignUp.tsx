import {
  Button,
  Flex,
  Heading,
  Link,
  TextField,
  Text,
  View,
} from "@aws-amplify/ui-react";
import React from "react";
import { signUp } from "../../api/auth.service";
import { useNavigate } from "react-router";
import { useAuth } from "../../customHooks/useAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [formData, setFormData] = React.useState({
    email: "",
    nickName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      const result = await signUp(
        formData?.email,
        formData?.nickName,
        formData?.password
      );
      if (result) {
        setAuth({ userName: formData?.email });
        navigate(`/confirmCode/?email=${encodeURIComponent(formData?.email)}`);
      }
    } catch (err) {
      alert("Login failed: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      maxWidth="400px"
      margin="auto"
      padding="2rem"
      borderRadius="6px"
      border="1px solid var(--amplify-colors-primary-40)"
      className="authentication"
      boxShadow="3px 3px 5px 6px var(--amplify-colors-primary-20)"
    >
      <Heading variation="primary" level={4}>
        Sign Up
      </Heading>
      <Flex direction="column" gap="1rem" marginTop="1rem">
        <TextField
          name="email"
          label="Email"
          hasError
          type="email"
          onChange={handleChange}
        />
        <TextField
          name="nickName"
          label="Nick name"
          type="text"
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <Text>
          Already have an account?
          <Button marginLeft="0.25rem" variation="link" padding="0">
            <Link href="/login">Login</Link>
          </Button>
        </Text>
        <Button
          variation="primary"
          isLoading={isLoading}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </Flex>
    </View>
  );
};

export default SignUp;
