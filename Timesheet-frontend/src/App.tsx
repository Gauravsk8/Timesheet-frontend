import { useKeycloak } from "@react-keycloak/web";

const App = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) return <div>Loading...</div>;

  // Extract roles from token (from realm_access.roles)
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const userRole = roles.length > 0 ? roles.join(", ") : "No Role Assigned";

  return (
    <div>
      <h1>
        {keycloak.authenticated
          ? `Hi, ${keycloak.tokenParsed?.preferred_username}`
          : "Welcome!"}
      </h1>

      {keycloak.authenticated ? (
        <>
          <p>Role: {userRole}</p>
          <button onClick={() => keycloak.logout()}>Logout</button>
        </>
      ) : (
        <>
          {/* Default Keycloak Login */}
          <button onClick={() => keycloak.login()}>Login</button>

          {/* Google Login */}
          <button
            onClick={() =>
              keycloak.login({
                idpHint: "google",
                prompt: "select_account" as any, // Allows account selection
              })
            }
          >
            Login with Google
          </button>
        </>
      )}
    </div>
  );
};

export default App;
