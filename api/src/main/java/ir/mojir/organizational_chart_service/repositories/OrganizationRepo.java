package ir.mojir.organizational_chart_service.repositories;

import ir.mojir.organizational_chart_service.entities.Organization;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrganizationRepo extends CrudRepository<Organization, Long>,
        JpaSpecificationExecutor<Organization> {
    List<Organization> findAllByParentId(long parentId);
}