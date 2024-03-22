import { useState } from "react";
import { supabase } from "../lib/api";

function Home({ user }) {
  const [todos, setTodos] = useState([]);

  const handleLogout = async () => {
    supabase.auth.signOut().catch(console.error);
  };

  return (
    <main className={"w-screen fixed flex flex-col min-h-screen bg-gray-50"}>
      <section
        className={"flex justify-between items-center px-4 h-16 bg-black"}
      >
        <h2 className={"text-2xl sm:text-4xl text-white"}>Todo List.</h2>
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
        ></div>
      </section>
      <section className={"flex m-4 mt-0 h-10"}>
        <input
          type="text"
          className={"bg-gray-200 border px-2 border-gray-300 w-full mr-4"}
        />
        <button
          className={
            "flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
          }
        >
          Add
        </button>
      </section>
    </main>
  );
}

export default Home;
