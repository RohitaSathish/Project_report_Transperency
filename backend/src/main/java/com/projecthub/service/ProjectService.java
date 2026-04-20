package com.projecthub.service;

import com.projecthub.model.Project;
import com.projecthub.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    public Project createProject(Project project) {
        project.setCreatedAt(LocalDateTime.now().toString());
        return projectRepository.save(project);
    }
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public Optional<Project> getProjectById(String id) {
        return projectRepository.findById(id);
    }
    
    public List<Project> getProjectsByFaculty(String facultyId) {
        return projectRepository.findByFacultyId(facultyId);
    }
    
    public List<Project> getProjectsByStudent(String studentId) {
        return projectRepository.findByStudentIdsContaining(studentId);
    }
    
    public Project updateProject(String id, Project project) {
        project.setId(id);
        return projectRepository.save(project);
    }
    
    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }
}
