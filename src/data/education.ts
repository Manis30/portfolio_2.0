import { EducationItem, AchievementItem } from '../types';

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "degree",
    title: "B.E. Computer Science and Engineering",
    institution: "IFET College of Engineering",
    period: "November 2022 – 2026",
    score: "CGPA: 8.2",
    details:
      "Core focus on Data Structures & Algorithms, Database Management Systems, Operating Systems, Full Stack Web Architecture, and Software Engineering Principles.",
    isPrimary: true,
  },
  {
    id: "class-12",
    title: "Class XII (HSC)",
    institution: "Government Higher Secondary School, Athipadi, Krishnagiri",
    score: "81.4%",
    details: "PCM with Biology",
    isPrimary: false,
  },
  {
    id: "class-10",
    title: "Class X (SSLC)",
    institution: "Government High School, Ammapettai, Dharmapuri",
    score: "94%",
    details: "State Board",
    isPrimary: false,
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "logic-league",
    metric: "Rank 1",
    title: "Winner — IFET Logic League",
    subtitle: "Awarded 1st Prize for outstanding algorithmic & technical problem solving by Dept. of CSE, IFET Autonomous College of Engineering",
    certificateImage: "/images/logic-league.jpg",
    link: "/images/logic-league.jpg",
    linkLabel: "View Certificate",
  },
  {
    id: "leetcode",
    metric: "120+",
    title: "LeetCode Problems Solved",
    subtitle: "Data Structures, Algorithms & Problem Solving",
    link: "https://leetcode.com/u/ManiSaravanan/",
    linkLabel: "View LeetCode Profile",
  },
  {
    id: "hackerrank",
    metric: "Certified",
    title: "HackerRank Java Certification",
    subtitle: "Verified competency in Java programming fundamentals and logic",
    link: "https://www.hackerrank.com/profile/mani30saravanan",
    linkLabel: "Verify on HackerRank",
  },
];
