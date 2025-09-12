import { Job, JobFilters, JobsResponse, JobType, ExperienceLevel } from '@/types/job';

// Mock data generator for demonstration
const generateMockJobs = (count: number = 20): Job[] => {
  const companies = [
    { name: 'Google', logo: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?w=100&h=100&fit=crop' },
    { name: 'Microsoft', logo: 'https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?w=100&h=100&fit=crop' },
    { name: 'Meta', logo: 'https://images.pexels.com/photos/4439632/pexels-photo-4439632.jpeg?w=100&h=100&fit=crop' },
    { name: 'Amazon', logo: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?w=100&h=100&fit=crop' },
    { name: 'Apple', logo: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?w=100&h=100&fit=crop' },
    { name: 'Netflix', logo: 'https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?w=100&h=100&fit=crop' },
    { name: 'Spotify', logo: 'https://images.pexels.com/photos/4439632/pexels-photo-4439632.jpeg?w=100&h=100&fit=crop' },
    { name: 'Airbnb', logo: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?w=100&h=100&fit=crop' },
  ];

  const jobTitles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Data Scientist',
    'Mobile Developer',
    'UI/UX Designer',
    'Product Manager',
    'Software Architect',
    'Site Reliability Engineer',
  ];

  const locations = [
    { city: 'San Francisco', state: 'CA', country: 'USA' },
    { city: 'New York', state: 'NY', country: 'USA' },
    { city: 'Seattle', state: 'WA', country: 'USA' },
    { city: 'Austin', state: 'TX', country: 'USA' },
    { city: 'London', state: 'England', country: 'UK' },
    { city: 'Berlin', state: 'Berlin', country: 'Germany' },
    { city: 'Toronto', state: 'ON', country: 'Canada' },
    { city: 'Amsterdam', state: 'NH', country: 'Netherlands' },
  ];

  const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  const experienceLevels: ExperienceLevel[] = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
    'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Microservices', 'CI/CD'
  ];

  return Array.from({ length: count }, (_, index) => {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const jobType = [jobTypes[Math.floor(Math.random() * jobTypes.length)]];
    const experienceLevel = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
    const isRemote = Math.random() > 0.4;

    return {
      id: `job-${index + 1}`,
      title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      company: {
        ...company,
        website: `https://${company.name.toLowerCase()}.com`,
        linkedin: `https://linkedin.com/company/${company.name.toLowerCase()}`,
        twitter: `https://twitter.com/${company.name.toLowerCase()}`,
      },
      location,
      jobType,
      experienceLevel,
      remote: isRemote,
      publishedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      applicationUrl: `https://${company.name.toLowerCase()}.com/careers/apply/${index + 1}`,
      description: `
        <p>We are looking for a talented ${jobTitles[Math.floor(Math.random() * jobTitles.length)]} to join our growing team at ${company.name}.</p>
        
        <h3>Responsibilities:</h3>
        <ul>
          <li>Develop and maintain high-quality software solutions</li>
          <li>Collaborate with cross-functional teams to deliver features</li>
          <li>Write clean, maintainable, and efficient code</li>
          <li>Participate in code reviews and technical discussions</li>
          <li>Stay up-to-date with industry trends and best practices</li>
        </ul>

        <h3>Requirements:</h3>
        <ul>
          <li>${experienceLevel === 'Entry' ? '0-2' : experienceLevel === 'Mid' ? '2-5' : '5+'} years of professional experience</li>
          <li>Strong knowledge of modern development practices</li>
          <li>Experience with version control systems (Git)</li>
          <li>Excellent problem-solving and communication skills</li>
        </ul>

        <h3>Benefits:</h3>
        <ul>
          <li>Competitive salary and equity package</li>
          <li>Comprehensive health, dental, and vision insurance</li>
          <li>Flexible working hours and remote work options</li>
          <li>Professional development opportunities</li>
          <li>Modern office with great team culture</li>
        </ul>
      `,
      skills: skills.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 3),
      salary: Math.random() > 0.3 ? {
        min: 80000 + Math.floor(Math.random() * 100000),
        max: 120000 + Math.floor(Math.random() * 100000),
        currency: 'USD'
      } : undefined,
    };
  });
};

export const mockJobs = generateMockJobs(200);

export const jobsApi = {
  getJobs: async (filters: JobFilters, page: number = 1): Promise<JobsResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let filteredJobs = mockJobs;

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.name.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    if (filters.jobTypes.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        job.jobType.some(type => filters.jobTypes.includes(type))
      );
    }

    if (filters.experienceLevel) {
      filteredJobs = filteredJobs.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    if (filters.remote !== null) {
      filteredJobs = filteredJobs.filter(job => job.remote === filters.remote);
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.location.city.toLowerCase().includes(locationLower) ||
        job.location.state.toLowerCase().includes(locationLower) ||
        job.location.country.toLowerCase().includes(locationLower)
      );
    }

    // Pagination
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    return {
      jobs: paginatedJobs,
      total: filteredJobs.length,
      page,
      hasMore: endIndex < filteredJobs.length,
    };
  },

  getJob: async (id: string): Promise<Job | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return mockJobs.find(job => job.id === id) || null;
  },
};