import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/api";
import RecoverPassword from "./RecoverPassword";
import TodoItem from "./TodoItem";

function Home({ user }) {
  const [recoveryToken, setRecoveryToken] = useState(null);
  const [todos, setTodos] = useState([]);
  const newTaskTextRef = useRef();
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    let url = window.location.hash;
    let query = url.slice(1);
    let result = {};

    query.split("&").forEach((part) => {
      const item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });

    if (result.type === "recovery") {
      setRecoveryToken(result.access_token);
    }

    fetchTodos().catch(console.error);
  }, []);

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setTodos(todos);
    console.log(todos);
  };

  const deleteTodo = async (id) => {
    try {
      await supabase.from("todos").delete().eq("id", id);
      setTodos(todos.filter((x) => x.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };
  const addTodo = async () => {
    let taskText = newTaskTextRef.current.value;
    let task = taskText.trim();
    console.log(task.length);
    if (task.length <= 3) {
      setErrorText("길이는 3글자 이상이여야합니다.");
    } else {
      let { data: todo, error } = await supabase
        .from("todos")
        .insert({ task, user_id: user.id })
        .select()
        .single();

      if (error) setErrorText(error.message);
      else {
        setTodos([todo, ...todos]);
        setErrorText(null);
        newTaskTextRef.current.value = "";
      }
    }
  };

  const handleLogout = async () => {
    supabase.auth.signOut().catch(console.error);
  };

  return recoveryToken ? (
    <RecoverPassword
      token={recoveryToken}
      setRecoveryToken={setRecoveryToken}
    />
  ) : (
    <main className={"w-screen fixed flex flex-col min-h-screen bg-gray-50"}>
      <section
        className={"flex justify-between items-center px-4 h-16 bg-black"}
      >
        <h2 className={"text-2xl sm:text-4xl text-white"}>Todo List</h2>
        <button
          onClick={handleLogout}
          className={
            "flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
          }
        >
          Logout
        </button>
      </section>
      <section
        className={"flex flex-col flex-grow p-4"}
        style={{ height: "calc(100vh - 11.5rem)" }}
      >
        <div
          className={`p-2 border flex-grow grid gap-2 ${
            todos.length ? "auto-rows-min" : ""
          } grid-cols-1 h-2/3 overflow-y-scroll first:mt-8`}
        >
          {todos.length ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={() => deleteTodo(todo?.id)}
              />
            ))
          ) : (
            <span className={"h-full flex justify-center items-center"}>
              할일을 추가해주세요
            </span>
          )}
        </div>
        {!!errorText && (
          <div
            className={
              "border max-w-m self-center px-4 py-2 mt-4 text-center text-sm bg-red-100 border-red-300 text-red-400"
            }
          >
            {errorText}
          </div>
        )}
      </section>
      <section className={"flex m-4 mt-0 h-10"}>
        <input
          ref={newTaskTextRef}
          type="text"
          className={"bg-gray-200 border px-2 border-gray-300 w-full mr-4"}
          onKeyUp={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          className={
            "flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
          }
          onClick={addTodo}
        >
          Add
        </button>
      </section>
    </main>
  );
}

export default Home;
