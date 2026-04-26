export const environment = {
        keycloak: {
            url: "http://localhost:8080",
            realm: "sts",
            clientId: "ocs-wui",
            resourceServersClientIds: ["ocs-api"]
        },
        backendBaseUrl: "http://localhost:8082"
    };