import { FaGoogle, FaGithub } from "react-icons/fa";

const Button = ({ children, oauth, type, className = "" }) => {
  const OAuthIcon = oauth === "google" ? <FaGoogle /> : <FaGithub />;
  const baseClass =
    "h-12 rounded-lg mx-auto border-none cursor-pointer text-base font-medium";
  const ClassName = oauth
    ? `${"flex justify-center items-center gap-3"} ${baseClass} ${className}`
    : `${baseClass} ${className}`;
  return (
    <>
      <button className={ClassName} type={type}>
        {oauth && OAuthIcon}
        {children}
      </button>
    </>
  );
};

export default Button;
