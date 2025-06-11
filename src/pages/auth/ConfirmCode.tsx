import { Button, Heading, TextField, View } from "@aws-amplify/ui-react";
import React from "react";
import { confirmSignUpUser } from "../../api/auth.service";
import { useNavigate, useSearchParams } from "react-router";

const ConfirmCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams] = useSearchParams();
  const [isShowEmailInput, setIsShowEmailInput] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    const emailParam = searchParams.get("email");
    if (!emailParam) setIsShowEmailInput(true);
    else setEmail(emailParam);
  }, [searchParams]);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      if (email) {
        await confirmSignUpUser(email, code);
        navigate(`/login/?email=${encodeURIComponent(email)}`);
      }
    } catch {
      console.error();
    } finally {
      setIsLoading(false);
    }
  };
  const handleResend = async () => {};
  return (
    <View display="flex" height="100vh">
      <View
        maxWidth="25rem"
        margin="auto"
        padding="32px"
        borderRadius=".375rem"
        border=".0625rem solid var(--amplify-colors-primary-40)"
        className="authentication"
        boxShadow=".1875rem .1875rem .3125rem .375rem var(--amplify-colors-primary-20)"
      >
        <Heading level={4}>Confirm Your Account</Heading>
        {isShowEmailInput && (
          <TextField
            marginTop="16px"
            label="Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter code from your email"
          />
        )}
        <TextField
          marginTop="16px"
          label="Confirmation Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code from your email"
        />

        <Button
          onClick={handleConfirm}
          variation="primary"
          isFullWidth
          marginTop="16px"
          isLoading={isLoading}
        >
          Confirm
        </Button>

        <Button
          onClick={handleResend}
          variation="link"
          isFullWidth
          marginTop="8px"
        >
          Resend Code
        </Button>
      </View>
    </View>
  );
};

export default ConfirmCode;
