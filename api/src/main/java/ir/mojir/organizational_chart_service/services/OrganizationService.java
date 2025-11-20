package ir.mojir.organizational_chart_service.services;

import ir.mojir.organizational_chart_service.dtos.organization.CreateOrganizationReq;
import ir.mojir.organizational_chart_service.dtos.organization.UpdateOrganizationReq;
import ir.mojir.organizational_chart_service.entities.Organization;
import ir.mojir.organizational_chart_service.repositories.OrganizationRepo;
import ir.mojir.organizational_chart_service.repositories.OrganizationRepoCustom;
import ir.mojir.organizational_chart_service.dtos.organization.OrganizationSearchFilter;
import ir.mojir.spring_boot_commons.dtos.SearchDto;
import ir.mojir.spring_boot_commons.exceptions.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {

    private static Logger logger = LoggerFactory.getLogger(OrganizationService.class);

    @Autowired
    private OrganizationRepo organizationRepo;

    @Autowired
    private OrganizationRepoCustom organizationRepoCustom;


    @Transactional
    public Organization create(CreateOrganizationReq req)
    {
        validateParentId(req.getParentId());
        Organization entity = new Organization();
        entity.setName(req.getName());
        entity.setDescription(req.getDescription());
        entity.setParentId(req.getParentId());

        Organization savedEntity = organizationRepo.save(entity);

        logger.info("A organization with id {} was created.", savedEntity.getId());

        return savedEntity;
    }

    private void validateParentId(long parentId) {
        if(parentId == 0)
            return;
        findById(parentId);
    }

    public Organization get(long id) {
        Organization organization = findById(id);
        logger.info("Organization with id {} was retrieved", id);
        return organization;
    }

    public Organization findById(long id) {
        Optional<Organization> optOrganization = organizationRepo.findById(id);
        if(optOrganization.isEmpty())
            throw new EntityNotFoundException(id, null);
        return optOrganization.get();
    }

    public Organization update(long id, UpdateOrganizationReq req) {
        Organization organization = findById(id);
        organization.setName(req.getName());
        Organization savedEntity = organizationRepo.save(organization);
        logger.info("Organization with id {} was updated", id);
        return savedEntity;
    }

    public void delete(long id) {
        List<Organization> childNodes = organizationRepo.findAllByParentId(id);
        for(Organization childNode: childNodes) {
            delete(childNode.getId());
        }
        Organization organization = findById(id);
        organizationRepo.delete(organization);
        logger.info("Organization with id {} was deleted", id);
    }



    public Page<Organization> search(SearchDto<OrganizationSearchFilter> req) {
        logger.info(("Searching for organization"));
        return organizationRepoCustom.search(req);
    }

    public List<Organization> getOrganizations(long parentId) {
        logger.info("Getting root organizations");
        return organizationRepo.findAllByParentId(parentId);
    }

    public List<Organization> getChildren(long id) {
        return organizationRepo.findAllByParentId(id);
    }

    public boolean hasChildren(long id) {
        List<Organization> children = getChildren(id);
        if(children != null && children.size() > 0)
            return true;
        return false;
    }
}
