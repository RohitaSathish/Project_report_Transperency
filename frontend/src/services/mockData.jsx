// Initialize mock data if not exists
export const initializeMockData = (user) => {
  // Initialize mock projects
  if (!localStorage.getItem('mockProjects')) {
    const mockProjects = [
      {
        id: '1',
        title: 'Web Development Project',
        description: 'Build a full-stack web application',
        subject: 'Software Engineering',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        facultyId: user?.role === 'faculty' ? user.id : 'faculty1',
        teams: [
          {
            name: 'Team Alpha',
            members: [user?.id || 'student1', 'student2']
          }
        ],
        gradesPublished: false
      }
    ];
    localStorage.setItem('mockProjects', JSON.stringify(mockProjects));
  }

  // Initialize mock tasks
  if (!localStorage.getItem('mockTasks')) {
    const mockTasks = [
      {
        id: '1',
        projectId: '1',
        title: 'Design Database Schema',
        description: 'Create ER diagram and database schema',
        assignedTo: user?.id || 'student1',
        status: 'in-progress',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        comments: [],
        files: []
      },
      {
        id: '2',
        projectId: '1',
        title: 'Implement Frontend',
        description: 'Build React components',
        assignedTo: user?.id || 'student1',
        status: 'pending',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        comments: [],
        files: []
      }
    ];
    localStorage.setItem('mockTasks', JSON.stringify(mockTasks));
  }

  // Initialize mock evaluations
  if (!localStorage.getItem('mockEvaluations')) {
    localStorage.setItem('mockEvaluations', JSON.stringify([]));
  }
};
