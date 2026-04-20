package com.projecthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "projects")
public class Project {
    @Id
    private String id;
    
    private String title;
    private String description;
    private String facultyId;
    private String facultyName;
    private List<String> studentIds;
    private String status; // active, completed
    private String deadline;
    private String createdAt;
}
