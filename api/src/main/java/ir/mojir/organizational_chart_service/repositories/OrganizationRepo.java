package ir.mojir.organizational_chart_service.repositories;

import ir.mojir.organizational_chart_service.entities.Organization;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface OrganizationRepo extends CrudRepository<Organization, Long>,
        JpaSpecificationExecutor<Organization> {
}