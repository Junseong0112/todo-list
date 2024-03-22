import { useState, useEffect } from "react";
import { supabase } from "./lib/api";
import Auth from "./components/Auth";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <>{!user ? <Auth /> : <Home user={user} />}</>;
}

export default App;
