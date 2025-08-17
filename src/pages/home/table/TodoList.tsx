import { DeleteTodo, UpdateTodo } from "../../../api/todo.service";
import { ITodo } from "../../../models/interfaces/ITodo";
import {
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import dayjs from "dayjs";
import { Star, Trash } from "lucide-react";
import { showToast } from "../../../components/toast/Toast";
import { useHomeContext } from "../../../customHooks/useHomeContext";

type TodoListType = {
  todos: ITodo[];
  onDelete: (todo: ITodo) => void;
  onUpdate: (todo: ITodo) => void;
};
export const TodoList = (props: TodoListType) => {
  const { loading } = useHomeContext();
  const deleteTodo = async (todoId: string) => {
    const response = await DeleteTodo(todoId);
    if (response?.body) {
      props.onDelete(response?.body);
      showToast("success", "Deleted");
    }
  };

  const onChangePrioritize = async (todo: ITodo, value: boolean) => {
    const response = await UpdateTodo(todo.todoId, {
      prioritized: value,
    });
    if (response?.body) {
      showToast("success", "Updated");
      props.onUpdate(response?.body);
    }
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell as="th">Title</TableCell>
          <TableCell as="th">Deadline</TableCell>
          <TableCell as="th" textAlign="center">
            Prioritize
          </TableCell>
          <TableCell as="th"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <TableRow style={{ height: "400px" }}>
            <TableCell colSpan={4} border="none" textAlign="center">
              <Loader size="large" width={40} height={40} textAlign="center" />
            </TableCell>
          </TableRow>
        ) : (
          props.todos?.map((todo) => (
            <TableRow key={todo.todoId}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>
                {todo.deadline ? dayjs(todo.deadline).format("MM/DD/YYYY") : ""}
              </TableCell>
              <TableCell textAlign="center">
                {todo.prioritized ? (
                  <Star
                    cursor="pointer"
                    fill="yellow"
                    onClick={() => onChangePrioritize(todo, false)}
                  />
                ) : (
                  <Star
                    onClick={() => onChangePrioritize(todo, true)}
                    cursor="pointer"
                  />
                )}
              </TableCell>
              <TableCell textAlign="center">
                {
                  <Trash
                    cursor="pointer"
                    size="16px"
                    onClick={() => deleteTodo(todo.todoId)}
                  />
                }
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
