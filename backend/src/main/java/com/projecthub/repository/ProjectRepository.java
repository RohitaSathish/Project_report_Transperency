package com.projecthub.repository;

import com.projecthub.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByFacultyId(String facultyId);
    List<Project> findByStudentIdsContaining(String studentId);
}
