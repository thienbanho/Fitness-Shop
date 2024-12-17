export interface Post {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }
  
  export interface Topic {
    id: string;
    title: string;
    lastPost: string;
    posts: Post[];
  }
  
  export const forumTopics: Topic[] = [
    {
      id: '1',
      title: 'Weight Training Tips',
      lastPost: '2023-07-10T14:30:00Z',
      posts: [
        {
          id: '1',
          author: 'FitnessPro',
          content: 'What are your favorite exercises for building muscle mass?',
          timestamp: '2023-07-10T14:30:00Z',
        },
        {
          id: '2',
          author: 'GymNewbie',
          content: 'Im new to weight training. Any tips for beginners?',
          timestamp: '2023-07-10T15:45:00Z',
        },
      ],
    },
    {
      id: '2',
      title: 'Nutrition and Supplements',
      lastPost: '2023-07-09T11:20:00Z',
      posts: [
        {
          id: '1',
          author: 'HealthNut',
          content: 'Whats your go-to post-workout meal?',
          timestamp: '2023-07-09T11:20:00Z',
        },
      ],
    },
    {
      id: '3',
      title: 'Cardio Workouts',
      lastPost: '2023-07-08T09:15:00Z',
      posts: [
        {
          id: '1',
          author: 'RunnerGirl',
          content: 'Looking for recommendations on good running shoes.',
          timestamp: '2023-07-08T09:15:00Z',
        },
      ],
    },
  ];
  
  