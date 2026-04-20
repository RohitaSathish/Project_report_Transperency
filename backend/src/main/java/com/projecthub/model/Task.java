package com.projecthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    
    private String projectId;
    private String title;
    private String description;
    private String assignedTo;
    private String assignedToName;
    private String status; // pending, in-progress, completed
    private String deadline;
    private String fileUrl;
    private String comments;
    private String createdAt;
}
