import { useKeycloak } from "@react-keycloak/web";

const App = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) return <div>Loading...</div>;

  return (
    <div>
      <h1>
        {keycloak.authenticated
          ? `Hi, ${keycloak.tokenParsed?.preferred_username}`
          : "Welcome!"}
      </h1>
      {keycloak.authenticated ? (
        <button onClick={() => keycloak.logout()}>Logout</button>
      ) : (
        <button onClick={() => keycloak.login()}>Login</button>
      )}
    </div>
  );
};

export default App;
