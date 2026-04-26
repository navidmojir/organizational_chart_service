package ir.mojir.organizational_chart_service.rest_controllers;

import ir.mojir.my_kc_auth_client.annotations.AllowedRoles;
import ir.mojir.my_kc_auth_client.config.KeycloakConfiguration;
import ir.mojir.my_kc_auth_client.dtos.KcSearchUserRespRow;
import ir.mojir.my_kc_auth_client.external.KeycloakClient;
import ir.mojir.organizational_chart_service.dtos.user.SearchUserRespRow;
import ir.mojir.organizational_chart_service.enums.UserRole;
import ir.mojir.organizational_chart_service.services.OrganizationService;
import jakarta.websocket.server.PathParam;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private KeycloakClient keycloakClient;

    @Autowired
    private KeycloakConfiguration kcConfig;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private OrganizationService organizationService;

    @GetMapping
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public SearchUserRespRow[] searchUsers(@PathParam("search") String search) {
        String accessToken = keycloakClient.getAccessTokenForClient();
        KcSearchUserRespRow[] result = keycloakClient.searchUsers(search, kcConfig.getKcRealm(), accessToken);
        return mapper.map(result, SearchUserRespRow[].class);
    }

    @GetMapping("/{id}/organizations")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public List<String> getOrganizationsAssignedToUser(@PathVariable String id) {
        return organizationService.getOrganizationsAssignedToUser(id);
    }
}
