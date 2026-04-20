package com.projecthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    
    private String name;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    
    private String role; // admin, faculty, student
    
    private String department;
    
    private String employeeId; // for faculty
    
    private String rollNumber; // for students
    
    private String createdAt;
}
