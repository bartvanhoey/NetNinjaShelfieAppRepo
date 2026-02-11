import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import ThemedActivityIndicator from "../ThemedActivityIndicator";


const NotLoggedInUserOnly: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user !== null) {
          router.replace("/profile");
    } 
  }, [user, authChecked]);

  if (!authChecked || user) {
   return <ThemedActivityIndicator />;
  }

  return children;
};

export default NotLoggedInUserOnly;
