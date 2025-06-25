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
import { IUser } from "../../models/interfaces/IUser";

export const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);

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
      setIsLoading(true)
      const result = await signIn(formData?.email, formData?.password);
      
      if (result) {
        const userAttr: IUser = {
             email: '',
      email_verified: false,
      userId: '',
      userName: '',
      nickname: '',
      sub: ''
        };
     
        result.attributes?.forEach(attr => {
       (userAttr[attr.Name as string as keyof IUser] as string) = attr.Value ?? '';
        })

        userAttr.userId = result.userId ?? '';

        localStorage.setItem('context', JSON.stringify({ ...result, loginResult: 'Successfully',
       user: userAttr }))
        setAuth({ ...result, loginResult: 'Successfully',
       user: userAttr });
     
        navigate('/', {replace: true})
      }
      console.log("Login result:", result);
    } catch (err) {
      alert("Login failed: " + err);
    }
    finally{
      setIsLoading(false)
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
        <Button variation="primary" onClick={handleLogin} isLoading={isLoading}>
          Login
        </Button>
      </Flex>
    </View>
  );
};
