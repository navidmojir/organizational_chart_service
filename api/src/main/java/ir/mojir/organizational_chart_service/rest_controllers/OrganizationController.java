package ir.mojir.organizational_chart_service.rest_controllers;

import ir.mojir.my_kc_auth_client.annotations.AllowedRoles;
import ir.mojir.organizational_chart_service.dtos.organization.*;
import ir.mojir.organizational_chart_service.entities.Organization;
import ir.mojir.organizational_chart_service.enums.UserRole;
import ir.mojir.organizational_chart_service.services.OrganizationService;
import ir.mojir.spring_boot_commons.dtos.SearchDto;
import ir.mojir.spring_boot_commons.helpers.PersianCharNormalizer;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/organizations")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public CreateOrganizationResp create(@Valid @RequestBody CreateOrganizationReq req)
    {
        new PersianCharNormalizer().normalize(req);
        Organization organization = organizationService.create(req);
        return mapper.map(organization, CreateOrganizationResp.class);
    }

    @GetMapping("/{id}")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public GetOrganizationResp get(@PathVariable long id)
    {
        Organization entity = organizationService.get(id);
        return mapper.map(entity, GetOrganizationResp.class);
    }

    @PutMapping("/{id}")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public UpdateOrganizationResp update(@PathVariable long id, @Valid @RequestBody UpdateOrganizationReq req)
    {
        new PersianCharNormalizer().normalize(req);
        Organization organization = organizationService.update(id, req);
        return mapper.map(organization, UpdateOrganizationResp.class);
    }

    @DeleteMapping("/{id}")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public void delete(@PathVariable long id) {
        organizationService.delete(id);
    }


    @PostMapping("/search")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public ResponseEntity<List<SearchOrganizationRespRow>> search(@Valid @RequestBody SearchDto<OrganizationSearchFilter> req)
    {
        new PersianCharNormalizer().normalize(req.getFilters());
        Page<Organization> result = organizationService.search(req);
        return ResponseEntity.ok()
                .header("X-TOTAL-COUNT", String.valueOf(result.getTotalElements()))
                .body(result.getContent().stream().map((p)->mapper.map(p, SearchOrganizationRespRow.class))
                        .collect(Collectors.toList()));
    }

    @GetMapping("/{id}/children")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public List<GetOrganizationChildrenRespRow> getChildren(@PathVariable long id) {
        List<Organization> children = organizationService.getChildren(id);
        return children.stream().map((org) -> {
            GetOrganizationChildrenRespRow row = mapper.map(org, GetOrganizationChildrenRespRow.class);
            row.setHasChildren(organizationService.hasChildren(org.getId()));
            return row;
        }).collect(Collectors.toList());

    }

    @GetMapping("/{id}/ancestors")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public List<GetOrganizationAncestorsRespRow> getAncestors(@PathVariable long id) {
        List<Organization> ancestors = organizationService.getAncestors(id);
        return ancestors.stream().map((org ->  mapper.map(org, GetOrganizationAncestorsRespRow.class)))
                .collect(Collectors.toList());
    }

    @PostMapping("/{id}/assignedUser/{userId}")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public void setOrganizationAssignedUser(@PathVariable long id, @PathVariable String userId)
    {
        organizationService.setOrganizationAssignedUser(id, userId);
    }

    @PostMapping("/{id}/assignedUser/{userId}/unassign")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public void unassignOrganizationAssignedUser(@PathVariable long id, @PathVariable String userId)
    {
        organizationService.unassignOrganizationAssignedUser(id, userId);
    }

    @GetMapping("/{id}/assignedUser")
    @AllowedRoles(roles = {UserRole.ADMIN_ROLE})
    public GetAssignedUserResp getOrganizationAssignedUser(@PathVariable long id)
    {
        return organizationService.getOrganizationAssignedUser(id);
    }



}
