package ir.mojir.organizational_chart_service.dtos.user;

public class GetOrganizationsAssignedToUserResp {
    private long id;
    private String path;

    private String name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
