import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";
import { Nav } from "./nav/Nav";
import React from "react";
import { useAuth } from "../../customHooks/useAuth";
import { ITodo } from "../../models/interfaces/ITodo";
import dayjs from "dayjs";
import { GetListTodo } from "../../api/todo.service";
import { TodoList } from "./table/TodoList";
import { InputTodo } from "./components/InputTodo";

export const Home = () => {
  const { user, accessToken } = useAuth();
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await GetListTodo(searchValue);
      setTodos(response?.body);
    };

    if (accessToken) fetchData();
  }, [accessToken, searchValue]);

  const onCreate = (todo: ITodo) => {
    const newList = [...todos];
    newList.push(todo);
    setTodos(newList);
  };

  const onUpdate = (todo: ITodo) => {
    const delIndex = todos?.findIndex((item) => item.todoId === todo.todoId);
    const newList = [...todos];
    newList.splice(delIndex, 1, todo);
    setTodos(newList);
  };

  const onDelete = (todo: ITodo) => {
    const delIndex = todos?.findIndex((item) => item.todoId === todo.todoId);
    const newList = [...todos];
    newList.splice(delIndex, 1);
    setTodos(newList);
  };

  return (
    <>
      <Nav onSearch={setSearchValue} searchValue={searchValue} />
      <Flex direction="column" gap="2rem" margin="18px">
        <Heading level={4}>
          Welcome, {user?.nickname} 👋
          <Text
            variation="secondary"
            as="p"
            lineHeight="1.5em"
            fontWeight={400}
            fontSize="14px"
            fontStyle="normal"
            textDecoration="none"
          >
            {dayjs().format("dddd, MMMM D")}
          </Text>
        </Heading>
        <InputTodo onSubmit={onCreate} />

        <Flex direction="column" gap="1rem">
          <TodoList todos={todos} onDelete={onDelete} onUpdate={onUpdate} />
        </Flex>
      </Flex>
    </>
  );
};
