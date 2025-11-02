package ir.mojir.organizational_chart_service.repositories;

import ir.mojir.organizational_chart_service.entities.Organization;
import ir.mojir.organizational_chart_service.dtos.organization.OrganizationSearchFilter;
import ir.mojir.spring_boot_commons.dtos.SearchDto;
import ir.mojir.spring_boot_commons.helpers.RepositoryHelper;
import ir.mojir.spring_boot_commons.helpers.Validations;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrganizationRepoCustom {
    @Autowired
    private OrganizationRepo organizationRepo;

    public Page<Organization> search(SearchDto<OrganizationSearchFilter> req)
    {
        Pageable pageable = RepositoryHelper.generatePageRequestWithSort(
                req.getPaging(), req.getSorting());

        return organizationRepo.findAll(new Specification<Organization>() {

            @Override
            public Predicate toPredicate(Root<Organization> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = makePredicates(req, criteriaBuilder, root);

                return criteriaBuilder.and(
                        predicates.toArray(new Predicate[predicates.size()]));
            }


        }, pageable);
    }

    private List<Predicate> makePredicates(SearchDto<OrganizationSearchFilter> req, CriteriaBuilder cb,
                                           Root<Organization> root) {
        List<Predicate> predicates = new ArrayList<>();
        OrganizationSearchFilter filters = req.getFilters();
        if(filters != null)
        {
            if(filters.getId() != 0)
                predicates.add(cb.equal(root.get("id"), filters.getId()));

            if(!Validations.isBlank(filters.getName()))
                predicates.add(cb.like(root.get("name"), "%" + filters.getName().trim() + "%"));
        }
        return predicates;
    }


}