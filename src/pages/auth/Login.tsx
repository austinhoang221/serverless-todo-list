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
import { signIn } from "../../api/auth.service";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../../customHooks/useAuth";

export const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam)
      setFormData((prev) => {
        return { ...prev, email: emailParam };
      });
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const result = await signIn(formData?.email, formData?.password);
      if (result) {
        const userAttr = [];
        for (const [key, value] of Object.entries(result.attributes ?? {})) {
          userAttr.push({ [key]: value });
        }
        setAuth({  ...result, loginResult: 'Successfully',
       user: userAttr });
        navigate('/')
      }
      console.log("Login result:", result);
    } catch (err) {
      alert("Login failed: " + err);
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
      <Heading level={4}>Login</Heading>
      <Flex direction="column" gap="1rem" marginTop="1rem">
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formData?.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData?.password}
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
    </View>
  );
};
