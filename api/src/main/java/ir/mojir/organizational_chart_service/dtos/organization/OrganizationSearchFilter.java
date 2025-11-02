package ir.mojir.organizational_chart_service.dtos.organization;

import ir.mojir.spring_boot_commons.annotations.PersianNormalized;
import ir.mojir.spring_boot_commons.helpers.RegexHelper;
import jakarta.validation.constraints.Pattern;

public class OrganizationSearchFilter {
    private long id;
    @PersianNormalized
    @Pattern(regexp = RegexHelper.persianFieldRegex, message = RegexHelper.persianFieldRegexMessageFa)
    private String name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
