import FormInput from "./FormInput";
import Button from "./Button";
import { useRef, useState } from "react";
import { supabase } from "../lib/api";

function Auth() {
  const [helperText, setHelperText] = useState({ error: null, text: null });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (type) => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email);
    console.log(password);

    const { user, error } =
      type === "LOGIN"
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      setHelperText({ error: true, text: error.message });
    } else if (!user && !error) {
      setHelperText({
        error: false,
        text: "확인을 위해 이메일이 발송되었습니다!",
      });
    }
  };

  const handleOAuthLogin = async (provider) => {
    const { error } =
      provider === "google"
        ? await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
              queryParams: {
                access_type: "offline",
                prompt: "consent",
              },
            },
          })
        : await supabase.auth.signInWithOAuth({ provider: provider });
    if (error) console.log("Error: ", error.message);
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    const email = prompt("가입하신 이메일을 입력해주세요");
    console.log(email);
    if (email === null || email === "") {
      setHelperText({ error: true, text: "이메일을 올바르게 입력하세요." });
    } else {
      let { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) {
        console.error("Error", error.message);
      } else {
        setHelperText({
          error: false,
          text: "암호 복구 이메일이 발송되었습니다",
        });
      }
    }
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-col justify-center max-w-2xl mx-auto">
        <h1 className="mb-10 text-5xl font-bold tracking-tight text-center text-ex-red">
          Login
        </h1>
        <section className="p-6 border border-gray-500 rounded-2xl">
          <form>
            <FormInput name={"email"} ref={emailRef}>
              Email
            </FormInput>
            <FormInput name={"password"} ref={passwordRef}>
              Password
            </FormInput>
            <button
              onClick={forgotPassword}
              className="w-full text-sm text-right text-ex-red"
            >
              비밀번호를 잃어버리셨나요?
            </button>
          </form>
          {!!helperText.text && (
            <div
              className={`border px-1 py-2 my-2 text-center text-sm ${
                helperText.error
                  ? "bg-red-100 border-red-300 text-red-400"
                  : "bg-green-100 border-green-300 text-green-500"
              }`}
            >
              {helperText.text}
            </div>
          )}
          <article className="flex justify-between gap-3 mt-5">
            <Button
              className="w-3/6 text-white bg-ex-red"
              type={"submit"}
              onClick={() => handleLogin("REGISTER").catch(console.error)}
            >
              Sign Up
            </Button>
            <Button
              className="w-3/6 border border-gray-500 border-solid"
              type={"submit"}
              onclick={() => handleLogin("LOGIN")}
            >
              Sign In
            </Button>
          </article>
          <p className="relative mx-auto my-10 text-xs text-center bg-transparent text-opacity-40">
            <span className="absolute w-2/5 top-2 left-0 bg-opacity-20 bg-blue-900 h-px w-45%"></span>
            OR
            <span className="absolute w-2/5 top-2 right-0 bg-opacity-20 bg-blue-900 h-px w-45%"></span>
          </p>
          <article className="flex flex-col gap-6">
            <Button
              className="w-full border border-gray-900 border-solid"
              type={"button"}
              oauth={"google"}
              onClick={() => handleOAuthLogin("google")}
            >
              Sign in Google
            </Button>
            <Button
              className="w-full text-white bg-gray-900 border-solid"
              type={"button"}
              oauth={"github"}
              onClick={() => handleOAuthLogin("github")}
            >
              Sign in GitHub
            </Button>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Auth;
