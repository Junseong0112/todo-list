import FormInput from "./FormInput";
import Button from "./Button";

function Auth() {
  return (
    <main className="w-full h-full">
      <div className="flex flex-col justify-center max-w-2xl mx-auto">
        <h1 className="mb-10 text-5xl font-bold tracking-tight text-center text-ex-red">
          Login
        </h1>
        <section className="p-6 border border-gray-500 rounded-2xl">
          <form>
            <FormInput name={"email"}>Email</FormInput>
            <FormInput name={"password"}>Password</FormInput>
            <button className="w-full text-sm text-right text-ex-red">
              비밀번호를 잃어버리셨나요?
            </button>
          </form>
          <article className="flex justify-between gap-3 mt-5">
            <Button className="w-3/6 text-white bg-ex-red" type={"submit"}>
              Sign Up
            </Button>
            <Button
              className="w-3/6 border border-gray-500 border-solid"
              type={"submit"}
            >
              Sign In
            </Button>
          </article>
          <p className="relative mx-auto my-12 text-xs text-center bg-transparent text-opacity-40">
            <span className="absolute w-2/5 top-2 left-0 bg-opacity-20 bg-blue-900 h-px w-45%"></span>
            OR
            <span className="absolute w-2/5 top-2 right-0 bg-opacity-20 bg-blue-900 h-px w-45%"></span>
          </p>
          <article className="flex flex-col gap-6">
            <Button
              className="w-full border border-gray-900 border-solid"
              type={"button"}
              oauth={"google"}
            >
              Sign in Google
            </Button>
            <Button
              className="w-full text-white bg-gray-900 border-solid"
              type={"button"}
              oauth={"github"}
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
