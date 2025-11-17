package ir.mojir.organizational_chart_service.dtos.organization;

import ir.mojir.spring_boot_commons.annotations.PersianNormalized;
import ir.mojir.spring_boot_commons.helpers.RegexHelper;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class UpdateOrganizationReq {
    @PersianNormalized
    @Pattern(regexp = RegexHelper.persianFieldRegex, message = RegexHelper.persianFieldRegexMessageFa)
    private String name;

    @PersianNormalized
    @Pattern(regexp = RegexHelper.persianLongTextRegex, message = RegexHelper.persianLongTextRegexMessageFa)
    private String description;

    @PositiveOrZero
    private long parentId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getParentId() {
        return parentId;
    }

    public void setParentId(long parentId) {
        this.parentId = parentId;
    }
}
