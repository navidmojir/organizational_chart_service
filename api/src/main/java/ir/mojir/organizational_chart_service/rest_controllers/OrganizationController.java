package ir.mojir.organizational_chart_service.rest_controllers;

import ir.mojir.organizational_chart_service.dtos.organization.*;
import ir.mojir.organizational_chart_service.entities.Organization;
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
    public CreateOrganizationResp create(@Valid @RequestBody CreateOrganizationReq req)
    {
        new PersianCharNormalizer().normalize(req);
        Organization organization = organizationService.create(req);
        return mapper.map(organization, CreateOrganizationResp.class);
    }

    @GetMapping("/{id}")
    public GetOrganizationResp get(@PathVariable long id)
    {
        Organization entity = organizationService.get(id);
        return mapper.map(entity, GetOrganizationResp.class);
    }

    @PutMapping("/{id}")
    public UpdateOrganizationResp update(@PathVariable long id, @Valid @RequestBody UpdateOrganizationReq req)
    {
        new PersianCharNormalizer().normalize(req);
        Organization organization = organizationService.update(id, req);
        return mapper.map(organization, UpdateOrganizationResp.class);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        organizationService.delete(id);
    }


    @PostMapping("/search")
    public ResponseEntity<List<SearchOrganizationRespRow>> search(@Valid @RequestBody SearchDto<OrganizationSearchFilter> req)
    {
        new PersianCharNormalizer().normalize(req.getFilters());
        Page<Organization> result = organizationService.search(req);
        return ResponseEntity.ok()
                .header("X-TOTAL-COUNT", String.valueOf(result.getTotalElements()))
                .body(result.getContent().stream().map((p)->mapper.map(p, SearchOrganizationRespRow.class))
                        .collect(Collectors.toList()));
    }

}
