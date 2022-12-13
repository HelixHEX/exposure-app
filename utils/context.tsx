import { createContext, PropsWithChildren, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useCurrentUserQuery } from "../graphql/generated";

type User = {
  id: number;
  email: string;
  profile: {
    id: number;
    name: string;
    bio: string;
    username: string;
    private: boolean;
  };
};
type UserContextProps = {
  user: User | null;
  setUser: (user: any) => void;
};

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

const UserProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<any>(null);
  const { data, isLoading, isError } = useCurrentUserQuery();

  useEffect(() => {
    if (data?.currentUser) {
      setUser(data.currentUser);
    }
  }, [data]);

  //check for errors
  useEffect(() => {
    if (isError) {
      setUser(null);
    }
  }, [isError]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {isLoading ? <Loading /> : props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
