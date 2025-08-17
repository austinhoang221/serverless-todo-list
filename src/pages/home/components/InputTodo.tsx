import { Button, Card, Flex, Input } from "@aws-amplify/ui-react";
import { CreateTodo } from "../../../api/todo.service";
import { useAuth } from "../../../customHooks/useAuth";
import React from "react";
import { DatePicker } from "../../../components/date-picker/DatePicker";
import { ITodo } from "../../../models/interfaces/ITodo";
import dayjs from "dayjs";
import { HomeContext, HomeContextType } from "../../../context/HomeContext";

type InputTodoType = {
  onSubmit: (todo: ITodo) => void;
};
export const InputTodo = (props: InputTodoType) => {
  const formInitState = {
    title: "",
    description: "",
    deadline: "",
  };
  const { user, setAuth } = useAuth();
  const [form, setForm] = React.useState(formInitState);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setLoading } = React.useContext(HomeContext) as HomeContextType;

  const resetForm = () => {
    setForm(formInitState);
  };

  const saveTodo = async () => {
    if (form?.title) {
      setIsLoading(true);
      const response = await CreateTodo({
        ...form,
        userId: user.sub,
        prioritized: false,
      });
      if (response?.body) {
        props.onSubmit(response?.body);
        resetForm();
        setIsLoading(false);
      }
    }
  };
  return (
    <Flex direction="column" gap="1rem">
      <Card variation="elevated">
        <Input
          placeholder="Add todo"
          value={form.title}
          disabled={isLoading}
          variation="quiet"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveTodo();
          }}
        />
        <Flex
          gap="1rem"
          justifyContent="space-between"
          padding="0.5rem"
          alignItems="center"
          backgroundColor="var(--amplify-colors-neutral-10)"
        >
          <DatePicker
            value={form.deadline}
            onChange={(e) =>
              setForm({ ...form, deadline: dayjs(e).format("MM/DD/YYYY") })
            }
          />
          {
            <Button
              size="small"
              onClick={saveTodo}
              disabled={!form?.title}
              isLoading={isLoading}
            >
              {"Add"}
            </Button>
            /*{editing && (
                <Button onClick={resetForm} variation="link">
                  Cancel
                </Button>
              )} */
          }
        </Flex>
      </Card>
    </Flex>
  );
};
