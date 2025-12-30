import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Star, AlertCircle, ArrowUp } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { getTodosApi, setTodosApi } from "@/lib/db/todos";

interface Todo {
  id: number;
  text: string;
  urgent: boolean;
  important: boolean;
}

const Todo = () => {
  useEffectOnce(() => {
    const onMount = async () => {
      const res = getTodosApi();
      if (res) {
        todosState[1](JSON.parse(res));
      }
    };
    onMount();
  });
  const todosState = useState<Todo[]>([]);
  const todos = todosState[0];
  const setTodos = (todos: Todo[]) => {
    todosState[1](todos);
    setTodosApi(JSON.stringify(todos));
  };
  const [newTodo, setNewTodo] = useState<string>("");
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, urgent: false, important: false },
    ]);
    setNewTodo("");
  };

  const confirmDelete = (todo: Todo) => {
    setTodoToDelete(todo);
    setIsDialogOpen(true);
  };

  const deleteTodo = () => {
    if (todoToDelete) {
      setTodos(todos.filter((t) => t.id !== todoToDelete.id));
      setTodoToDelete(null);
      setIsDialogOpen(false);
    }
  };

  const toggleProperty = (id: number, prop: "urgent" | "important") => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, [prop]: !t[prop] } : t)));
  };

  const editTodo = (id: number) => {
    const newText = prompt("Edit todo:");
    if (newText !== null) {
      setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    }
  };

  const sortByPriority = (a: Todo, b: Todo) => {
    const priority = (t: Todo) =>
      t.urgent && t.important ? 3 : t.urgent ? 2 : t.important ? 1 : 0;
    return priority(b) - priority(a);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center"> To-Dos </h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <ul className="space-y-2">
        <AnimatePresence>
          {[...todos].sort(sortByPriority).map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2">
                <span className="break-all">{todo.text}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleProperty(todo.id, "urgent")}
                >
                  <AlertCircle
                    className={`${todo.urgent ? "text-red-500" : ""}`}
                    size={16}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleProperty(todo.id, "important")}
                >
                  <Star
                    className={`${todo.important ? "text-yellow-500" : ""}`}
                    size={16}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editTodo(todo.id)}
                >
                  <Edit2 size={16} />
                </Button>
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => confirmDelete(todo)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete:{" "}
                        <strong>{todoToDelete?.text}</strong>?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteTodo}>
                        Delete
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button onClick={scrollToTop} className="rounded-full p-3">
            <ArrowUp size={20} />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Todo;
