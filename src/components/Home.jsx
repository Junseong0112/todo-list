import { supabase } from "../lib/api";

function Home() {
  const handleLogout = async () => {
    supabase.auth.signOut().catch(console.error);
  };
  return (
    <>
      <h1>홈 컴포넌트</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}

export default Home;
