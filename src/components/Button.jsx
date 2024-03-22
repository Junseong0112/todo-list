import { FaGoogle, FaGithub } from "react-icons/fa";

const Button = ({ children, oauth, type, onClick, className = "" }) => {
  const OAuthIcon = oauth === "google" ? <FaGoogle /> : <FaGithub />;
  const baseClass =
    " rounded-lg mx-auto border-none cursor-pointer text-base font-medium py-4";
  const ClassName = oauth
    ? `${"flex justify-center items-center gap-3"} ${baseClass} ${className}`
    : `${baseClass} ${className}`;
  return (
    <>
      <button className={ClassName} type={type} onClick={onClick}>
        {oauth && OAuthIcon}
        {children}
      </button>
    </>
  );
};

export default Button;
