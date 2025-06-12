import {
    Button,
    Flex,
    Heading,
    Link,
    TextField,
    Text,
    SearchField,
    Avatar,
  } from "@aws-amplify/ui-react";
  import React from "react";
  
  export const Nav = () => {

    return (
        <Flex gap="1rem"  alignItems="center" justifyContent="space-between" backgroundColor="var(--amplify-colors-primary)">

            <div>Logo</div>
            <SearchField
  label="Search"
  placeholder="Search here..."
/>
<Avatar />
            </Flex>
    );
  };
  