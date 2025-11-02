package ir.mojir.organizational_chart_service.dtos.organization;

import ir.mojir.spring_boot_commons.annotations.PersianNormalized;
import ir.mojir.spring_boot_commons.helpers.RegexHelper;
import jakarta.validation.constraints.Pattern;

public class UpdateOrganizationReq {
    @PersianNormalized
    @Pattern(regexp = RegexHelper.persianFieldRegex, message = RegexHelper.persianFieldRegexMessageFa)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
