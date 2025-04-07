// src/App.tsx
import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import RegisterUserForm from "./components/RegisterUserForm";

const App = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) return <div>Loading...</div>;

  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const isAdmin = roles.includes("Admin");

  return (
    <div>
      <h1>
        {keycloak.authenticated
          ? `Hi, ${keycloak.tokenParsed?.preferred_username}`
          : "Welcome!"}
      </h1>

      {keycloak.authenticated ? (
        <>
          <p>Role: {roles.join(", ")}</p>
          <button onClick={() => keycloak.logout()}>Logout</button>

          {isAdmin && (
            <div style={{ marginTop: "2rem" }}>
              <RegisterUserForm />
            </div>
          )}
        </>
      ) : (
        <>
          <button onClick={() => keycloak.login()}>Login</button>
          <button
            onClick={() =>
              keycloak.login({
                idpHint: "google",
                prompt: "select_account" as any,
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
