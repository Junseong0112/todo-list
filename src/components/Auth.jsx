function Auth() {
  return (
    <main>
      <span>Login</span>
      <label>
        <span>*</span>Email :
      </label>
      <input type="email" name="email" />
      <label>
        <span>*</span>Password :
      </label>
      <input type="password" name="password" />
      <span>비밀번호를 잃어버리셨나요?</span>
      <section>
        <button>Sign Up</button>
        <button>Sign In</button>
        <button>GitHub</button>
        <button>Google</button>
      </section>
    </main>
  );
}

export default Auth;
