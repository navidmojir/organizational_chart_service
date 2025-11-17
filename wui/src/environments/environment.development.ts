export const environment = {
        keycloak: {
            url: "http://localhost:8080",
            realm: "cbi",
            clientId: "ocs-wui",
            resourceServersClientIds: ["ocs-api"]
        },
        backendBaseUrl: "http://localhost:8082"
    };