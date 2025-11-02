package ir.mojir.organizational_chart_service.services;

import ir.mojir.my_kc_auth_client.logic.KeycloakResourceManager;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class KcInitializer {

    @Autowired
    private KeycloakResourceManager keycloakResourceManager;

    @PostConstruct
    public void init() {
        keycloakResourceManager.createResourcesInKeycloak();
    }
}
