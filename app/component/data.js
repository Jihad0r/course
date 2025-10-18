
  export const courseTopics = [
    {
      week: 'Week 1-4',
      description: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
      lessons: [
        { title: 'Introduction', locked: true },
        { title: 'Course Overview', locked: true },
        { title: 'Course Overview', questions: '0 QUESTION', duration: '10 MINUTES' },
        { title: 'Course Exercise / Reference Files', locked: true },
        { title: 'Code Editor Installation (Optional if you have one)', locked: true },
        { title: 'Embedding PHP in HTML', locked: true }
      ]
    },
    {
      week: 'Week 5-8',
      description: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
      lessons: [
        { title: 'Defining Functions', locked: true },
        { title: 'Function Parameters', locked: true },
        { title: 'Return Values From Functions', questions: '2 QUESTION', duration: '15 MINUTES' },
        { title: 'Global Variable and Scope', locked: true },
        { title: 'Newer Way of creating a Constant', locked: true },
        { title: 'Constants', locked: true }
      ]
    },
    {
      week: 'Week 5-8',
      description: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
      lessons: [
        { title: 'Defining Functions', locked: true },
        { title: 'Function Parameters', locked: true },
        { title: 'Return Values From Functions', questions: '2 QUESTION', duration: '15 MINUTES' },
        { title: 'Global Variable and Scope', locked: true },
        { title: 'Newer Way of creating a Constant', locked: true },
        { title: 'Constants', locked: true }
      ]
    }
  ];
export const questionsData = [
    {
      id: 1,
      question: "What is the primary purpose of React hooks?",
      answers: [
        { id: "a", text: "To add state and lifecycle features to functional components", isCorrect: true },
        { id: "b", text: "To replace all class components", isCorrect: false },
        { id: "c", text: "To improve website performance only", isCorrect: false },
        { id: "d", text: "To create animations", isCorrect: false },
      ],
    },
    {
      id: 2,
      question: "Which CSS property is used to create flexbox layouts?",
      answers: [
        { id: "a", text: "display: block", isCorrect: false },
        { id: "b", text: "display: flex", isCorrect: true },
        { id: "c", text: "position: relative", isCorrect: false },
        { id: "d", text: "float: left", isCorrect: false },
      ],
    },
    {
      id: 3,
      question: "What does API stand for?",
      answers: [
        { id: "a", text: "Advanced Programming Interface", isCorrect: false },
        { id: "b", text: "Application Programming Interface", isCorrect: true },
        { id: "c", text: "Automated Program Interaction", isCorrect: false },
        { id: "d", text: "Application Process Integration", isCorrect: false },
      ],
    },
    {
      id: 4,
      question: "Which JavaScript method is used to add an element to the end of an array?",
      answers: [
        { id: "a", text: "shift()", isCorrect: false },
        { id: "b", text: "unshift()", isCorrect: false },
        { id: "c", text: "push()", isCorrect: true },
        { id: "d", text: "pop()", isCorrect: false },
      ],
    },
    {
      id: 5,
      question: "What is the purpose of the 'useState' hook in React?",
      answers: [
        { id: "a", text: "To fetch data from APIs", isCorrect: false },
        { id: "b", text: "To manage component state", isCorrect: true },
        { id: "c", text: "To handle routing", isCorrect: false },
        { id: "d", text: "To create side effects", isCorrect: false },
      ],
    },
  ];

  export const comments = [
    {
      name: 'Jack',
      date: 'Oct 10, 2021',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      name: 'Julia',
      date: 'Oct 15, 2021',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      name: 'Nolen',
      date: 'Oct 18, 2021',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    }
  ];

  export const students = [
    {
      name: "Amina Hassan",
      progress: 92,
      text: "Built a dashboard using React and Zustand.",
      avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    },
    {
      name: "Layla Mostafa",
      progress: 89,
      text: "Completed project deployment with Netlify and Vercel.",
      avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    },
    {
      name: "Sarah Ahmed",
      progress: 82,
      text: "Completed the React module and started working on state management.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Omar Ali",
      progress: 74,
      text: "Learning authentication and CRUD with Node.js.",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
      name: "Mohamed Youssef",
      progress: 67,
      text: "Improving CSS and responsive layouts.",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    },
  ];
export const messages = {
  high: `🔥 رائع جدًا يا بطل! أداؤك في هذا الكورس أفضل من ٨٥٪ من باقي الطلبة 👏
استمر بنفس الحماس، وعايز أشوفك في المركز الأول على الليدربورد قريب`,

  medium: `💪 عظيم يا صديقي! أداؤك في هذا الكورس أفضل من ٦٠٪ من باقي الطلبة.
كمل بنفس الإصرار، وعايز أشوف اسمك طالع أكتر في الليدربورد المرة الجاية `,

  low: `👀 لا تقلق يا صديقي! أداؤك الحالي أفضل من ٣٥٪ من باقي الطلبة، والبداية دايمًا صعبة.
شد حيلك شوية، ومع شوية تدريب هتشوف اسمك بيطلع في الليدربورد قريب جدًا `,
};