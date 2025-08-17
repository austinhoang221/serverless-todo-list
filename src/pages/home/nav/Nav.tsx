import {
  Flex,
  SearchField,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@aws-amplify/ui-react";
import React from "react";
import { signOut } from "../../../api/auth.service";
import { RESPONSE_STATUS_CODE } from "../../../api/models/StatusCode";
import { handleSignOut } from "../../../api/base.service";

type Props = {
  searchValue: string;
  onSearch: (value: string) => void;
};
export const Nav = (props: Props) => {
  const [search, setSearch] = React.useState(props.searchValue);

  const onClickSignOut = async () => {
    const response = await signOut();
    if (response?.statusCode === RESPONSE_STATUS_CODE.OK) {
      handleSignOut();
    }
  };
  return (
    <Flex
      gap="1rem"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="var(--amplify-colors-primary)"
    >
      <div>Logo</div>
      <SearchField
        value={search}
        label="Search"
        onClear={() => {
          setSearch("");
          props.onSearch("");
        }}
        placeholder="Search here..."
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") props.onSearch(search);
        }}
      />
      <Menu menuAlign="start" trigger={<Avatar />} size="small">
        <MenuItem onClick={() => alert("Download")}>Information</MenuItem>
        <Divider />
        <MenuItem onClick={onClickSignOut}>Sign out</MenuItem>
      </Menu>
    </Flex>
  );
};
