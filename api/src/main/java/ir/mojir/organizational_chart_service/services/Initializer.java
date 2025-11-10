package ir.mojir.organizational_chart_service.services;

import ir.mojir.my_kc_auth_client.logic.KeycloakResourceManager;
import ir.mojir.my_kc_auth_client.utils.KcInitializer;
import ir.mojir.organizational_chart_service.enums.UserRole;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class Initializer {

    @Autowired
    private KcInitializer kcInitializer;

    @PostConstruct
    public void init() {
        String[] allRoles = Arrays.stream(UserRole.values()).map(Enum::name).toArray(String[]::new);
        kcInitializer.setAllRoles(allRoles);
        kcInitializer.setDefaultAdminRoles(new String[] {UserRole.ADMIN_ROLE});
        kcInitializer.init();
    }
}
