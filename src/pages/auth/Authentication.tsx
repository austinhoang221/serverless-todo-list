import React from "react";
import { Flex, Tabs, View } from "@aws-amplify/ui-react";
import { Login } from "./Login";
import SignUp from "./SignUp";
import { useParams } from "react-router";
import "./Authentication.css";

export const Authentication = () => {
  // const { token, userName, setAuth } = useAuth();
  const params = useParams();
  const [tab, setTab] = React.useState(params?.type);
  return (
    <View display="flex" height="100vh">
      <View
        maxWidth="400px"
        margin="auto"
        padding="2rem"
        borderRadius="6px"
        border="1px solid var(--amplify-colors-primary-40)"
        className="authentication"
        boxShadow="3px 3px 5px 6px var(--amplify-colors-primary-20)"
      >
        <Flex direction="column" gap="2rem">
          <Tabs.Container
            defaultValue="login"
            value={tab}
            onValueChange={(tab) => setTab(tab)}
            isLazy
          >
            <Tabs.List spacing="equal"></Tabs.List>
            <Tabs.Panel value="login">
              <Login />
            </Tabs.Panel>
            <Tabs.Panel value="signUp">
              <SignUp />
            </Tabs.Panel>
          </Tabs.Container>
        </Flex>
      </View>
    </View>
  );
};
