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
  
  type Props = {
    searchValue: string,
    onSearch: (value: string) => void;
  }
  export const Nav = (props: Props) => {
    const [search, setSearch] = React.useState(props.searchValue)
    return (
        <Flex gap="1rem"  alignItems="center" justifyContent="space-between" backgroundColor="var(--amplify-colors-primary)">

            <div>Logo</div>
            <SearchField
            value={search}
  label="Search"
  onClear={() => setSearch("")}
  placeholder="Search here..."
  onChange={(e) => setSearch(e.target.value)}
     onKeyDown={(e) => {
                if(e.key === 'Enter') props.onSearch(search)
              }}
/>
<Avatar />
            </Flex>
    );
  };
  