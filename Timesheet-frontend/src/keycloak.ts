import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'timesheet',
  clientId: 'Timesheet-frontend', 
});

export default keycloak;
