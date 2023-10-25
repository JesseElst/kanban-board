import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import "./header.scss";
export const Header = ({ email }: { email?: string }) => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };
  return (
    <header>
      <h4>Hello {email || "please log in"}</h4>
      {email && (
        <button className="logout" onClick={logout}>
          Logout
        </button>
      )}
    </header>
  );
};
