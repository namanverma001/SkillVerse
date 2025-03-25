"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Send, Bot, User, Clock, Lightbulb, History, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Mock data for previous questions
const previousQuestions = [
  { id: 1, question: "How do I create a responsive layout in CSS?", timestamp: "2 days ago" },
  { id: 2, question: "Explain the difference between var, let, and const in JavaScript", timestamp: "1 week ago" },
  { id: 3, question: "What is the time complexity of quicksort?", timestamp: "2 weeks ago" },
]

// Mock data for suggested questions
const suggestedQuestions = [
  "How does React's virtual DOM work?",
  "Explain machine learning in simple terms",
  "What are the best practices for database design?",
  "How do I implement authentication in a web app?",
]

// Detailed responses for common programming questions
const detailedResponses: Record<string, string> = {
  "how do i start with javascript": `# Getting Started with JavaScript

JavaScript is one of the most popular programming languages and is essential for web development. Here's how to get started:

## 1. Set Up Your Environment
You don't need much to start with JavaScript:
- A text editor (VS Code, Sublime Text, or Atom are good choices)
- A web browser (Chrome or Firefox recommended for their developer tools)

## 2. Learn the Basics
Start with these fundamental concepts:
- Variables and data types
- Operators
- Control flow (if statements, loops)
- Functions
- Objects and arrays

## 3. Practice Resources
- **MDN Web Docs**: Comprehensive documentation and tutorials
- **freeCodeCamp**: Interactive lessons with challenges
- **JavaScript.info**: Modern JavaScript tutorial
- **Codecademy**: Interactive JavaScript course

## 4. First Steps
Create a simple HTML file with a JavaScript script:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First JavaScript</title>
</head>
<body>
  <h1>Hello, JavaScript!</h1>
  
  <script>
    // Your JavaScript code here
    console.log("Hello, World!");
    alert("Welcome to JavaScript!");
  </script>
</body>
</html>
\`\`\`

## 5. Next Steps
After learning the basics:
- DOM manipulation
- Event handling
- Asynchronous JavaScript (Promises, async/await)
- ES6+ features
- Working with APIs

Remember, consistent practice is key to learning programming. Try to code something every day, even if it's small!`,

  "what is react": `# React: A JavaScript Library for Building User Interfaces

React is a popular JavaScript library developed by Facebook for building user interfaces, particularly single-page applications where you need a responsive, dynamic user experience.

## Core Concepts

### 1. Component-Based Architecture
React applications are built using components - reusable, self-contained pieces of code that return HTML via a render function. Components can be:
- **Functional Components**: JavaScript functions that return JSX
- **Class Components**: ES6 classes that extend React.Component

### 2. JSX (JavaScript XML)
JSX is a syntax extension that looks like HTML but allows you to write JavaScript within your markup:

\`\`\`jsx
function Greeting() {
  const name = "User";
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

### 3. Virtual DOM
React creates a lightweight representation of the real DOM in memory (Virtual DOM) and uses a diffing algorithm to efficiently update only what needs to change in the actual DOM.

### 4. Unidirectional Data Flow
Data flows down from parent components to children through props, making the application more predictable and easier to debug.

### 5. State Management
React components can have state - data that determines how a component renders and behaves. When state changes, React efficiently re-renders the component.

## Getting Started

1. **Create a new React app**:
   \`\`\`bash
   npx create-react-app my-app
   cd my-app
   npm start
   \`\`\`

2. **Basic Component**:
   \`\`\`jsx
   function App() {
     return (
       <div>
         <h1>My First React App</h1>
         <p>This is a paragraph in my app.</p>
       </div>
     );
   }
   
   export default App;
   \`\`\`

## Why Use React?

- **Declarative**: You describe what you want to render, not how
- **Component-Based**: Build encapsulated components that manage their own state
- **Learn Once, Write Anywhere**: React can render on the server using Node, on mobile using React Native, and more
- **Strong Community**: Large ecosystem of libraries, tools, and support
- **Developer Experience**: Hot reloading, debugging tools, and performance optimizations

React is often used with other libraries like Redux for state management, React Router for navigation, and styled-components for styling.`,

  "how to learn python": `# How to Learn Python: A Comprehensive Guide

Python is one of the most beginner-friendly programming languages with applications in web development, data science, AI, automation, and more. Here's a structured approach to learning Python:

## 1. Set Up Your Environment

- **Install Python**: Download from [python.org](https://python.org)
- **Choose an IDE/Editor**: 
  - VS Code with Python extension
  - PyCharm
  - Jupyter Notebooks (great for data science)
  - Replit (online editor, good for beginners)

## 2. Learn the Fundamentals

Start with these core concepts:

- **Basic Syntax**: Variables, data types, operators
- **Control Flow**: if/else statements, loops
- **Functions**: Defining and calling functions
- **Data Structures**: Lists, dictionaries, sets, tuples
- **File I/O**: Reading and writing files
- **Error Handling**: try/except blocks

## 3. Follow a Learning Path

### For Absolute Beginners:
1. **Python.org Official Tutorial**
2. **"Automate the Boring Stuff with Python" by Al Sweigart** (free online)
3. **Codecademy's Python Course**
4. **CS50's Introduction to Programming with Python**

### For Intermediate Learners:
1. **Object-Oriented Programming in Python**
2. **Python Standard Library**
3. **Working with APIs**
4. **Virtual Environments and Package Management**

## 4. Practice Regularly

- **Coding Challenges**: LeetCode, HackerRank, CodeWars
- **Small Projects**: Calculator, to-do app, weather app
- **Contribute to Open Source**: Find beginner-friendly issues on GitHub

## 5. Specialize Based on Your Interests

### Web Development:
- Flask or Django frameworks

### Data Science:
- NumPy, Pandas, Matplotlib
- Jupyter Notebooks
- scikit-learn for machine learning

### Automation:
- Scripting for repetitive tasks
- Selenium for web automation

### Game Development:
- Pygame library

## 6. Join the Community

- **Reddit**: r/learnpython
- **Stack Overflow**: Ask and answer questions
- **Python Discord servers**
- **Local Python meetups**

## 7. Advanced Topics

Once comfortable with the basics:
- Decorators and generators
- Context managers
- Concurrency and parallelism
- Testing and debugging
- Design patterns

Remember, consistency is key. It's better to practice for 30 minutes daily than 5 hours once a week. Build projects that interest you to stay motivated!`,

  "what is machine learning": `# Understanding Machine Learning

Machine Learning (ML) is a subset of artificial intelligence that enables computers to learn from data and make decisions or predictions without being explicitly programmed to do so.

## Core Concepts

### 1. Types of Machine Learning

#### Supervised Learning
- The algorithm learns from labeled training data
- Makes predictions based on that data
- Examples: Classification, Regression
- Applications: Spam detection, price prediction, image recognition

#### Unsupervised Learning
- Works with unlabeled data to find patterns or groupings
- Examples: Clustering, Dimensionality Reduction
- Applications: Customer segmentation, anomaly detection, feature learning

#### Reinforcement Learning
- Learns optimal actions through trial and error
- Receives rewards or penalties for actions
- Applications: Game playing, robotics, autonomous vehicles

### 2. The Machine Learning Process

1. **Data Collection**: Gathering relevant, high-quality data
2. **Data Preprocessing**: Cleaning, normalizing, and preparing data
3. **Feature Engineering**: Selecting and transforming variables
4. **Model Selection**: Choosing appropriate algorithms
5. **Training**: Feeding data to the algorithm to learn patterns
6. **Evaluation**: Testing model performance on new data
7. **Deployment**: Implementing the model in real-world applications
8. **Monitoring**: Tracking performance and retraining as needed

### 3. Common Algorithms

#### For Supervised Learning:
- Linear/Logistic Regression
- Decision Trees
- Random Forests
- Support Vector Machines
- Neural Networks

#### For Unsupervised Learning:
- K-means Clustering
- Hierarchical Clustering
- Principal Component Analysis (PCA)
- Autoencoders

## Applications in Everyday Life

- **Recommendation Systems**: Netflix, Amazon, Spotify suggestions
- **Virtual Assistants**: Siri, Alexa, Google Assistant
- **Email Filtering**: Spam detection
- **Social Media**: Face recognition, content recommendations
- **Healthcare**: Disease prediction, medical image analysis
- **Finance**: Fraud detection, algorithmic trading

## Getting Started with Machine Learning

### Prerequisites:
- Programming (Python is most common)
- Basic statistics and probability
- Linear algebra fundamentals
- Calculus (for advanced topics)

### Popular Tools and Libraries:
- **Python**: scikit-learn, TensorFlow, PyTorch, Keras
- **R**: caret, randomForest, neuralnet
- **Development Platforms**: Google Colab, Jupyter Notebooks

Machine learning continues to evolve rapidly, with new techniques and applications emerging constantly. The field offers exciting opportunities to solve complex problems across virtually every industry.`,

  "how to create a website": `# How to Create a Website: A Step-by-Step Guide

Creating a website can range from simple to complex depending on your needs. Here's a comprehensive guide to get you started:

## 1. Define Your Website's Purpose and Goals

Before writing any code or choosing platforms:
- Identify your target audience
- Determine key features needed
- Set clear objectives (e.g., portfolio, blog, e-commerce)
- Plan your content strategy

## 2. Choose Your Website Creation Method

### Option A: Website Builder (Easiest)
- **Platforms**: Wix, Squarespace, WordPress.com, Shopify
- **Pros**: No coding required, drag-and-drop interfaces, templates
- **Cons**: Less customization, potential subscription costs, platform limitations
- **Best for**: Small businesses, personal sites, beginners

### Option B: Content Management System (CMS)
- **Platforms**: WordPress.org, Joomla, Drupal
- **Pros**: Highly customizable, extensive plugins, better control
- **Cons**: Steeper learning curve, requires hosting
- **Best for**: Blogs, content-heavy sites, medium businesses

### Option C: Hand-Coding (Most Control)
- **Technologies**: HTML, CSS, JavaScript (frontend); various languages for backend
- **Pros**: Complete customization, no platform limitations
- **Cons**: Requires technical knowledge, more time-intensive
- **Best for**: Web developers, unique web applications, large businesses

## 3. Secure a Domain Name and Hosting

- **Domain Name**: Your website's address (e.g., yoursite.com)
  - Register through GoDaddy, Namecheap, Google Domains (typically $10-15/year)
  - Choose something memorable, relevant, and easy to spell

- **Web Hosting**: Where your website files live
  - Options: Bluehost, SiteGround, HostGator, AWS, Netlify
  - Consider: Speed, uptime guarantees, customer support, scalability

## 4. Design Your Website

- **Layout**: Plan navigation, content hierarchy, user flow
- **Visual Elements**: Choose colors, typography, images that reflect your brand
- **Responsive Design**: Ensure your site works on all devices (mobile, tablet, desktop)
- **Accessibility**: Make your site usable for people with disabilities

## 5. Build Your Website

### For Website Builders:
1. Select a template
2. Customize design elements
3. Add your content
4. Configure settings

### For WordPress:
1. Install WordPress
2. Choose and customize a theme
3. Add essential plugins
4. Create pages and posts

### For Hand-Coding:
1. Set up development environment
2. Create HTML structure
3. Style with CSS
4. Add interactivity with JavaScript
5. Implement backend functionality if needed

## 6. Essential Pages to Include
- Home page
- About page
- Products/Services
- Contact information
- Privacy policy

## 7. Optimize Before Launch
- **SEO**: Meta descriptions, keywords, alt tags for images
- **Performance**: Compress images, minimize HTTP requests
- **Security**: Install SSL certificate (HTTPS)
- **Analytics**: Set up Google Analytics or similar tool

## 8. Test Thoroughly
- Check all links and forms
- Test on multiple browsers and devices
- Verify loading speed
- Proofread all content

## 9. Launch and Maintain
- Publish your website
- Regularly update content
- Back up your site
- Monitor performance and security

## 10. Market Your Website
- Share on social media
- Consider email marketing
- Implement SEO strategies
- Consider paid advertising if appropriate

Remember, your website is never truly "finished" - it should evolve as your needs change and as you gather user feedback!`,
  "web development tech stack": `# Web Development Tech Stack Guide

A web development tech stack is a combination of programming languages, frameworks, libraries, and tools used to build web applications. Here's a comprehensive overview of modern web development stacks:

## Frontend Technologies

### HTML, CSS, JavaScript
These three form the foundation of any web development stack:
- **HTML**: Structure and content
- **CSS**: Styling and layout
- **JavaScript**: Interactivity and dynamic behavior

### Frontend Frameworks/Libraries
- **React**: Facebook's library for building user interfaces with reusable components
- **Angular**: Google's comprehensive framework with two-way data binding
- **Vue.js**: Progressive framework focused on the view layer
- **Svelte**: Compiler-based approach with less runtime code

### CSS Frameworks/Tools
- **Tailwind CSS**: Utility-first CSS framework
- **Bootstrap**: Component-based CSS framework
- **Sass/SCSS**: CSS preprocessor
- **CSS Modules**: Locally scoped CSS
- **Styled Components**: CSS-in-JS solution

## Backend Technologies

### Languages
- **JavaScript/Node.js**: JavaScript runtime for server-side development
- **Python**: Versatile language with frameworks like Django and Flask
- **Ruby**: Known for Ruby on Rails framework
- **PHP**: Powers WordPress and has frameworks like Laravel
- **Java**: Enterprise-grade backend with Spring Boot
- **Go**: High-performance language by Google
- **C#**: Microsoft's language with .NET framework

### Backend Frameworks
- **Express.js** (Node.js): Minimalist web framework
- **Django** (Python): Full-featured framework with admin panel
- **Flask** (Python): Lightweight, flexible framework
- **Ruby on Rails** (Ruby): Convention over configuration
- **Laravel** (PHP): Elegant syntax and tools
- **Spring Boot** (Java): Production-ready framework
- **ASP.NET Core** (C#): Cross-platform framework

## Databases

### Relational Databases
- **PostgreSQL**: Advanced open-source database
- **MySQL/MariaDB**: Popular open-source database
- **SQLite**: Lightweight file-based database
- **SQL Server**: Microsoft's enterprise database

### NoSQL Databases
- **MongoDB**: Document-oriented database
- **Redis**: In-memory key-value store
- **Cassandra**: Wide-column store
- **Firebase Firestore**: Cloud-hosted NoSQL database

## Full Stack Combinations

### MERN Stack
- MongoDB (Database)
- Express.js (Backend)
- React (Frontend)
- Node.js (Runtime)

### MEAN Stack
- MongoDB (Database)
- Express.js (Backend)
- Angular (Frontend)
- Node.js (Runtime)

### LAMP Stack
- Linux (OS)
- Apache (Server)
- MySQL (Database)
- PHP (Backend)

### JAMstack
- JavaScript (Frontend)
- APIs (Services)
- Markup (Static content)

## DevOps & Deployment

- **Git**: Version control
- **GitHub/GitLab/Bitbucket**: Repository hosting
- **Docker**: Containerization
- **Kubernetes**: Container orchestration
- **CI/CD**: Jenkins, GitHub Actions, GitLab CI
- **Cloud Platforms**: AWS, Azure, Google Cloud
- **Hosting**: Vercel, Netlify, Heroku, DigitalOcean

## Recommended Learning Path for Beginners

1. **Start with the basics**:
   - HTML, CSS, JavaScript fundamentals
   - Responsive design principles

2. **Add a frontend framework**:
   - React is recommended for beginners due to its popularity and job market demand

3. **Learn backend development**:
   - Node.js with Express is a good choice for JavaScript developers
   - Python with Django or Flask is another excellent option

4. **Database knowledge**:
   - Start with a relational database like PostgreSQL
   - Then explore NoSQL options like MongoDB

5. **Version control and deployment**:
   - Git and GitHub
   - Basic deployment on Vercel, Netlify, or Heroku

## Choosing the Right Stack

Consider these factors when choosing your tech stack:
- Project requirements and complexity
- Team expertise and learning curve
- Community support and documentation
- Performance and scalability needs
- Development speed vs. long-term maintenance
- Job market demand in your area

Remember, it's better to master a few technologies deeply than to have surface-level knowledge of many. Focus on understanding core concepts that transfer across technologies rather than specific syntax.`,
  "javascript frameworks": `# JavaScript Frameworks and Libraries Guide

JavaScript frameworks and libraries help developers build complex web applications more efficiently. Here's a comprehensive overview of the most popular options:

## React

**Type**: Library
**Created by**: Facebook
**First Released**: 2013

### Key Features
- Component-based architecture
- Virtual DOM for efficient rendering
- JSX syntax
- Unidirectional data flow
- Rich ecosystem

### When to Use
- Single-page applications
- Mobile apps (via React Native)
- When you need a flexible library rather than a full framework
- Projects that need to scale with reusable components

### Learning Curve
- Moderate
- Easier to get started, but mastering concepts like hooks and context takes time

### Popular Companion Tools
- Redux or Context API for state management
- React Router for navigation
- Next.js for server-side rendering
- Create React App for quick setup

## Angular

**Type**: Full Framework
**Created by**: Google
**First Released**: 2010 (AngularJS), 2016 (Angular 2+)

### Key Features
- Complete solution with built-in tools
- TypeScript-based
- Two-way data binding
- Dependency injection
- RxJS for reactive programming
- Component-based architecture

### When to Use
- Enterprise-level applications
- When you need a comprehensive, opinionated framework
- Teams familiar with object-oriented programming
- Complex applications with large teams

### Learning Curve
- Steep
- Requires understanding TypeScript and RxJS

### Popular Companion Tools
- Angular Material for UI components
- NgRx for state management
- Angular Universal for server-side rendering

## Vue.js

**Type**: Progressive Framework
**Created by**: Evan You
**First Released**: 2014

### Key Features
- Incrementally adoptable
- Template-based syntax
- Two-way data binding
- Virtual DOM
- Component-based architecture

### When to Use
- When you need flexibility to use as little or as much of the framework as needed
- Projects that need to integrate with other libraries
- When you want a gentler learning curve
- Both small and large-scale applications

### Learning Curve
- Gentle
- Easy to start with, progressive complexity

### Popular Companion Tools
- Vuex for state management
- Vue Router for navigation
- Nuxt.js for server-side rendering
- Vuetify for UI components

## Svelte

**Type**: Compiler
**Created by**: Rich Harris
**First Released**: 2016

### Key Features
- Compiles to vanilla JavaScript at build time
- No virtual DOM
- Less boilerplate code
- Truly reactive
- Built-in animations

### When to Use
- Performance-critical applications
- Smaller applications
- When bundle size is a concern
- Projects that need smooth animations

### Learning Curve
- Gentle
- Familiar syntax with HTML, CSS, and JavaScript

### Popular Companion Tools
- Svelte Kit for full-stack development
- Svelte Store for state management

## Ember.js

**Type**: Full Framework
**Created by**: Yehuda Katz
**First Released**: 2011

### Key Features
- Convention over configuration
- Stability without stagnation
- Built-in testing tools
- Strong CLI tools
- Two-way data binding

### When to Use
- Long-lived projects that need stability
- When productivity and conventions are valued
- Teams that prefer established patterns

### Learning Curve
- Moderate to steep
- Requires learning Ember-specific conventions

## Choosing the Right Framework

Consider these factors:
- **Project size and complexity**: Full frameworks like Angular may be better for large, complex applications
- **Team experience**: Choose something your team is familiar with or can learn quickly
- **Performance requirements**: Consider Svelte or optimized React for high-performance needs
- **Development speed**: Vue and React often allow for faster development
- **Long-term maintenance**: Angular and Ember provide stability for long-term projects
- **Community and ecosystem**: React has the largest community and ecosystem
- **Job market**: React and Angular skills are highly in demand

## Framework Comparison

### Bundle Size (approximate)
- React: ~40KB
- Vue: ~30KB
- Angular: ~150KB
- Svelte: Minimal (compiles away)

### GitHub Stars (as of 2023)
- React: 200K+
- Vue: 200K+
- Angular: 80K+
- Svelte: 65K+

### Learning Resources
All major frameworks have excellent documentation, but React and Vue tend to have more tutorials and courses available for beginners.

Remember, there's no "best" framework—only the right tool for your specific needs and context. Many developers learn multiple frameworks to be versatile in different project environments.`,
  "python vs javascript": `# Python vs JavaScript: A Comprehensive Comparison

Python and JavaScript are two of the most popular programming languages in the world, each with its own strengths, weaknesses, and ideal use cases. Here's a detailed comparison to help you understand which might be better for your needs:

## Language Characteristics

### Python
- **Syntax**: Clean, readable, uses indentation for code blocks
- **Typing**: Dynamically typed with optional type hints
- **Paradigm**: Multi-paradigm (procedural, object-oriented, functional)
- **Philosophy**: "There should be one—and preferably only one—obvious way to do it"
- **Learning Curve**: Generally considered easier for beginners

### JavaScript
- **Syntax**: C-style syntax with curly braces
- **Typing**: Dynamically typed with optional TypeScript for static typing
- **Paradigm**: Multi-paradigm (event-driven, functional, object-oriented)
- **Philosophy**: Flexibility, multiple ways to accomplish tasks
- **Learning Curve**: Easy to start, challenging to master

## Primary Use Cases

### Python Excels At:
- Data science and machine learning
- Scientific computing
- Backend web development
- Automation and scripting
- AI and natural language processing
- Education and teaching programming

### JavaScript Excels At:
- Frontend web development
- Full-stack development (with Node.js)
- Mobile app development (React Native, Ionic)
- Real-time applications
- Browser-based games
- Interactive web applications

## Ecosystem and Libraries

### Python
- **Data Science**: NumPy, Pandas, Matplotlib, SciPy
- **Machine Learning**: TensorFlow, PyTorch, scikit-learn
- **Web Frameworks**: Django, Flask, FastAPI
- **Package Manager**: pip, conda
- **Testing**: pytest, unittest

### JavaScript
- **Frontend Frameworks**: React, Angular, Vue
- **Backend**: Node.js, Express
- **Mobile**: React Native, Ionic
- **Package Manager**: npm, yarn
- **Testing**: Jest, Mocha, Cypress

## Performance

### Python
- Generally slower execution speed
- GIL (Global Interpreter Lock) can limit multi-threading
- Better for CPU-intensive tasks with libraries like NumPy (which use C under the hood)
- Not ideal for real-time applications

### JavaScript
- Faster execution with modern JS engines
- Asynchronous by design
- Event-driven architecture makes it efficient for I/O operations
- Good for real-time applications

## Job Market

Both languages have strong job markets, but with different focuses:

### Python Jobs
- Data Scientist
- Machine Learning Engineer
- Backend Developer
- DevOps Engineer
- Automation Engineer
- Research Scientist

### JavaScript Jobs
- Frontend Developer
- Full-Stack Developer
- Node.js Developer
- React/Angular/Vue Developer
- Mobile App Developer
- UI/UX Developer

## Learning Path Comparison

### Python Learning Path
1. Basic syntax and data structures
2. Functions and modules
3. Object-oriented programming
4. File handling and data processing
5. Web development (Django/Flask) OR
6. Data science (NumPy, Pandas) OR
7. Machine learning (TensorFlow, PyTorch)

### JavaScript Learning Path
1. Basic syntax and data structures
2. DOM manipulation
3. Asynchronous programming (Promises, async/await)
4. Frontend framework (React/Angular/Vue)
5. Node.js for backend
6. Full-stack development
7. Advanced concepts (closures, prototypes)

## When to Choose Which Language

### Choose Python When:
- You're a beginner learning to program
- You need to work with data, statistics, or scientific computing
- You're building machine learning models
- You need to automate tasks or create scripts
- You want a language with clear, readable syntax
- You're working in academia or research

### Choose JavaScript When:
- You want to build web applications
- You need to create interactive user interfaces
- You want to use the same language for frontend and backend
- You're building real-time applications
- You need to develop cross-platform mobile apps
- You want maximum reach (browsers everywhere run JavaScript)

## Can You Learn Both?

Absolutely! Many developers know both languages:
- Use JavaScript for frontend and interactive elements
- Use Python for data processing, machine learning, or complex backend logic
- The concepts you learn in one language transfer to the other

## Conclusion

Neither Python nor JavaScript is "better" overall—they serve different purposes and excel in different domains. Your choice should depend on your specific goals, the type of applications you want to build, and your personal preferences regarding syntax and programming style.

If you're just starting out and aren't sure which to learn first, consider what you want to build. For web interfaces, start with JavaScript. For data analysis or automation, start with Python.`,
  "data science roadmap": `# Data Science Learning Roadmap

Data science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. Here's a comprehensive roadmap to guide your journey into data science:

## Phase 1: Foundations (3-6 months)

### Mathematics & Statistics
- **Linear Algebra**: Vectors, matrices, transformations
- **Calculus**: Derivatives, integrals, partial derivatives
- **Probability**: Random variables, distributions, Bayes' theorem
- **Statistics**: Descriptive statistics, hypothesis testing, confidence intervals

### Programming
- **Python**: Syntax, data structures, functions, OOP
- **Development Environment**: Jupyter Notebooks, IDEs, Git
- **Basic Libraries**: NumPy, Pandas

### Data Manipulation
- **Data Cleaning**: Handling missing values, outliers
- **Data Transformation**: Normalization, encoding categorical variables
- **Data Exploration**: Summary statistics, basic visualizations

## Phase 2: Core Skills (3-6 months)

### Data Visualization
- **Libraries**: Matplotlib, Seaborn, Plotly
- **Visualization Types**: Scatter plots, histograms, heatmaps, etc.
- **Storytelling with Data**: Creating meaningful visualizations

### Machine Learning Fundamentals
- **Supervised Learning**: Linear regression, logistic regression, decision trees
- **Unsupervised Learning**: Clustering, dimensionality reduction
- **Model Evaluation**: Cross-validation, metrics (accuracy, precision, recall, F1)
- **Libraries**: Scikit-learn

### SQL & Databases
- **SQL Basics**: SELECT, JOIN, GROUP BY, etc.
- **Database Concepts**: Relational databases, NoSQL
- **Data Retrieval**: Querying databases from Python

## Phase 3: Advanced Topics (6-12 months)

### Advanced Machine Learning
- **Ensemble Methods**: Random forests, gradient boosting
- **Support Vector Machines**
- **Feature Engineering**: Creating and selecting features
- **Hyperparameter Tuning**: Grid search, random search

### Deep Learning
- **Neural Networks**: Fundamentals, architectures
- **Frameworks**: TensorFlow, PyTorch
- **Applications**: Computer vision, NLP, time series

### Big Data Technologies
- **Distributed Computing**: Spark, Hadoop
- **Cloud Platforms**: AWS, GCP, Azure
- **Big Data Processing**: Handling large datasets

## Phase 4: Specialization & Projects (Ongoing)

### Specialization Areas
- **Natural Language Processing**: Text analysis, sentiment analysis, language models
- **Computer Vision**: Image classification, object detection
- **Time Series Analysis**: Forecasting, ARIMA, Prophet
- **Recommender Systems**: Collaborative filtering, content-based filtering

### Projects & Portfolio
- **Personal Projects**: End-to-end data science projects
- **Kaggle Competitions**: Practical experience with real datasets
- **GitHub Portfolio**: Showcasing your work
- **Blog/Documentation**: Explaining your process and findings

### Professional Skills
- **Communication**: Presenting findings to non-technical stakeholders
- **Domain Knowledge**: Understanding business problems
- **Ethics**: Responsible AI, bias in algorithms
- **Deployment**: Model serving, APIs, MLOps

## Learning Resources

### Online Courses
- **Foundational**:
  - DataCamp's Data Scientist with Python track
  - Coursera's Data Science Specialization (Johns Hopkins)
  - edX's Data Science MicroMasters (UC San Diego)

- **Advanced**:
  - fast.ai for deep learning
  - Coursera's Deep Learning Specialization (Andrew Ng)
  - Udacity's Data Scientist Nanodegree

### Books
- **For Beginners**:
  - "Python for Data Analysis" by Wes McKinney
  - "An Introduction to Statistical Learning" by James, Witten, Hastie, and Tibshirani

- **Advanced**:
  - "Deep Learning" by Goodfellow, Bengio, and Courville
  - "The Elements of Statistical Learning" by Hastie, Tibshirani, and Friedman

### Websites & Communities
- Kaggle (competitions and datasets)
- Towards Data Science (Medium publication)
- r/datascience (Reddit community)
- Stack Overflow for specific questions

## Practical Tips for Success

1. **Learn by doing**: Work on projects from day one
2. **Start simple**: Master the basics before moving to complex techniques
3. **Use public datasets**: Practice with real-world data
4. **Join communities**: Engage with other data scientists
5. **Focus on fundamentals**: Strong math/stats understanding pays off
6. **Develop domain expertise**: Specialize in an industry you're interested in
7. **Stay current**: The field evolves rapidly, keep learning

Remember that data science is a vast field, and no one masters everything. It's better to have strong fundamentals and specialize in areas that interest you most. This roadmap provides a structured path, but feel free to adapt it based on your background, interests, and career goals.`,

  "how do i learn programming": `# How to Learn Programming: A Comprehensive Guide

Learning to program is a rewarding journey that opens doors to countless opportunities. Here's a structured approach to help you get started and progress effectively:

## 1. Choose Your First Language Wisely

For beginners, these languages are often recommended:
- **Python**: Readable syntax, versatile applications
- **JavaScript**: Essential for web development
- **HTML/CSS**: Not programming languages per se, but fundamental for web development
- **Swift**: For iOS development
- **Scratch**: Visual programming, great for young learners

The "best" first language depends on your goals:
- Web development? JavaScript
- Data science? Python
- Mobile apps? Swift (iOS) or Kotlin (Android)
- Game development? C# with Unity

## 2. Establish a Strong Foundation

Focus on these universal concepts that apply across languages:
- Variables and data types
- Control structures (if/else, loops)
- Functions and methods
- Data structures (arrays, lists, dictionaries)
- Object-oriented programming basics
- Problem-solving approaches

## 3. Choose Learning Resources

Mix and match these based on your learning style:

### Interactive Platforms:
- freeCodeCamp
- Codecademy
- LeetCode
- HackerRank

### Video Courses:
- Coursera
- Udemy
- edX
- YouTube tutorials

### Books:
- "Eloquent JavaScript" by Marijn Haverbeke
- "Python Crash Course" by Eric Matthes
- "Clean Code" by Robert C. Martin (for more advanced learners)

### Documentation:
- Official language documentation
- MDN Web Docs (for web development)

## 4. Practice Deliberately

- Start with small, achievable projects
- Gradually increase complexity
- Solve coding challenges regularly
- Implement what you learn immediately
- Type code yourself rather than copy-pasting

## 5. Build Projects

Nothing solidifies knowledge like building real projects:
- To-do list application
- Weather app
- Personal portfolio website
- Simple game (Tic-tac-toe, Hangman)
- Blog platform
- E-commerce site (more advanced)

## 6. Understand How to Debug

- Learn to read error messages
- Use debugging tools in your IDE
- Practice rubber duck debugging (explaining your code aloud)
- Develop a systematic approach to finding bugs

## 7. Learn Version Control
- Git is essential for modern development
- Learn basic commands: init, add, commit, push, pull
- Create a GitHub account to store your projects
- Practice branching and merging
- Collaborate on open-source projects

## 8. Join the Community
- Stack Overflow for questions
- GitHub for collaboration
- Reddit programming communities
- Discord/Slack channels for specific languages
- Local meetups or coding groups
- Twitter/social media tech communities

## 9. Computer Science Fundamentals
As you advance, learn about:
- Data structures and algorithms
- Time and space complexity
- Design patterns
- Basic computer architecture
- Databases and SQL

## 10. Specialize When Ready
After building a solid foundation, consider specializing:
- Frontend development
- Backend development
- Mobile development
- Data science
- Machine learning
- Game development
- DevOps

## 11. Continuous Learning
- Technology evolves rapidly
- Set aside time for regular learning
- Follow industry blogs and newsletters
- Attend webinars and conferences
- Take advanced courses

## 12. Practical Tips for Success
- Code daily, even if just for 30 minutes
- Don't try to learn everything at once
- Build a portfolio to showcase your work
- Network with other developers
- Contribute to open-source projects
- Be patient with yourself

Remember that programming is a skill that improves with practice. Everyone struggles at first, so persist through challenges and celebrate your progress along the way!`,
}

// Function to find the best matching response
const findBestResponse = (query: string): string => {
  // Convert query to lowercase for case-insensitive matching
  const normalizedQuery = query.toLowerCase().trim()

  // Common topics and their keywords for better matching
  const topicKeywords = {
    "javascript frameworks": ["javascript framework", "js framework", "react", "angular", "vue", "frontend framework"],
    "web development tech stack": [
      "tech stack",
      "web dev stack",
      "web development stack",
      "mern",
      "mean",
      "lamp",
      "web technologies",
    ],
    "python vs javascript": [
      "python vs js",
      "python or javascript",
      "js vs python",
      "compare python javascript",
      "better python or javascript",
    ],
    "data science roadmap": [
      "data science path",
      "learn data science",
      "become data scientist",
      "data science career",
      "data science learning",
    ],
    "how do i start with javascript": [
      "begin javascript",
      "javascript beginner",
      "start js",
      "learn javascript",
      "javascript tutorial",
    ],
    "what is react": ["react js", "react library", "about react", "react framework", "learn react"],
    "how to learn python": ["start python", "python beginner", "python tutorial", "learn python programming"],
    "what is machine learning": ["ml basics", "understand machine learning", "ai vs ml", "machine learning explained"],
    "how to create a website": ["build website", "make a website", "website creation", "website development"],
    "how do i learn programming": ["start programming", "coding for beginners", "learn to code", "programming basics"],
  }

  // Check for exact matches in our detailed responses
  if (detailedResponses[normalizedQuery]) {
    return detailedResponses[normalizedQuery]
  }

  // Check for keyword matches
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((keyword) => normalizedQuery.includes(keyword))) {
      return detailedResponses[topic] || detailedResponses["how do i learn programming"]
    }
  }

  // Check for partial matches with the topic itself
  for (const key in detailedResponses) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      return detailedResponses[key]
    }
  }

  // If no match found, try to provide a more specific response based on the query
  if (normalizedQuery.includes("web") || normalizedQuery.includes("frontend") || normalizedQuery.includes("backend")) {
    return detailedResponses["web development tech stack"]
  } else if (normalizedQuery.includes("python") || normalizedQuery.includes("data")) {
    return detailedResponses["data science roadmap"]
  } else if (normalizedQuery.includes("javascript") || normalizedQuery.includes("js")) {
    return detailedResponses["javascript frameworks"]
  }

  // Generic response as a last resort
  return `I don't have specific information about "${query}" yet, but I can help you find resources on this topic. 

Here are some general learning resources:
- MDN Web Docs for web development
- freeCodeCamp for interactive coding lessons
- Coursera and Udemy for structured courses
- Stack Overflow for specific programming questions
- GitHub repositories with example projects

Would you like me to help you break down this topic into more manageable learning steps?`
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function DoubtSolverPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I'm your AI Doubt Solver. Ask me any programming or learning question, and I'll do my best to help you understand the concept.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate response
      const responseContent = findBestResponse(inputValue)

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const handlePreviousQuestion = (question: string) => {
    setInputValue(question)
    handleSendMessage()
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Doubt Solver</h1>
        <p className="text-muted-foreground">Get instant answers to your programming and learning questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Suggested Questions</CardTitle>
              <CardDescription>Try asking one of these questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <Lightbulb className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                  <span className="text-sm truncate">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Previous Questions</CardTitle>
              <CardDescription>Your recent questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {previousQuestions.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => handlePreviousQuestion(item.question)}
                >
                  <History className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                  <div className="flex flex-col items-start w-full overflow-hidden">
                    <span className="text-sm truncate w-full">{item.question}</span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                      {item.timestamp}
                    </span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Learning Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Explore these resources to deepen your understanding:</p>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/learning-hub">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    MDN Web Docs
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer">
                    <BookOpen className="h-4 w-4 mr-2" />
                    freeCodeCamp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[calc(100vh-12rem)]">
            <CardHeader className="pb-3">
              <CardTitle>Chat with AI Doubt Solver</CardTitle>
              <CardDescription>Ask any programming or learning question</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex ${message.role === "user" ? "flex-row-reverse" : "flex-row"} max-w-[80%]`}>
                    <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                      {message.role === "user" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-4 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.content.startsWith("#") ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: message.content
                                .split("\n")
                                .map((line) => {
                                  if (line.startsWith("# ")) {
                                    return `<h1>${line.substring(2)}</h1>`
                                  } else if (line.startsWith("## ")) {
                                    return `<h2>${line.substring(3)}</h2>`
                                  } else if (line.startsWith("### ")) {
                                    return `<h3>${line.substring(4)}</h3>`
                                  } else if (line.startsWith("- ")) {
                                    return `<li>${line.substring(2)}</li>`
                                  } else if (line.startsWith("```")) {
                                    return line.includes("```html") ||
                                      line.includes("```jsx") ||
                                      line.includes("```bash")
                                      ? "<pre><code>"
                                      : line === "```"
                                        ? "</code></pre>"
                                        : ""
                                  } else {
                                    return `<p>${line}</p>`
                                  }
                                })
                                .join(""),
                            }}
                          />
                        ) : (
                          <p>{message.content}</p>
                        )}
                      </div>
                      <div
                        className={`text-xs mt-1 ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex flex-row max-w-[80%]">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-4 bg-muted">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="h-2 w-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex w-full space-x-2"
              >
                <Input
                  placeholder="Type your question here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="flex-grow"
                />
                <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

