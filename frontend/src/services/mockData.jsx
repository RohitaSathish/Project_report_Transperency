// Initialize mock data if not exists
export const initializeMockData = (user) => {
  // Only initialize empty arrays if they don't exist
  if (!localStorage.getItem('mockProjects')) {
    localStorage.setItem('mockProjects', JSON.stringify([]));
  }

  if (!localStorage.getItem('mockTasks')) {
    localStorage.setItem('mockTasks', JSON.stringify([]));
  }

  if (!localStorage.getItem('mockEvaluations')) {
    localStorage.setItem('mockEvaluations', JSON.stringify([]));
  }
};
