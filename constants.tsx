
import React from 'react';
import { Heart, BookOpen, Briefcase, Scale, AlertTriangle, DollarSign, Settings, Sprout, Building2 } from 'lucide-react';
import { ServiceCategory, Scheme, Job, Hospital } from './types';

export const SERVICE_CATEGORIES = [
  { name: ServiceCategory.HEALTH, icon: <Heart className="text-red-500" />, color: "bg-red-50", textColor: "text-red-600", image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136" },
  { name: ServiceCategory.EDUCATION, icon: <BookOpen className="text-blue-500" />, color: "bg-blue-50", textColor: "text-blue-600", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b" },
  { name: ServiceCategory.JOBS, icon: <Briefcase className="text-purple-500" />, color: "bg-purple-50", textColor: "text-purple-600", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984" },
  { name: ServiceCategory.EMERGENCY, icon: <AlertTriangle className="text-red-600" />, color: "bg-red-100", textColor: "text-red-700", image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f" },
  { name: ServiceCategory.LEGAL, icon: <Scale className="text-indigo-500" />, color: "bg-indigo-50", textColor: "text-indigo-600", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f" },
  { name: ServiceCategory.SCHEMES, icon: <Sprout className="text-orange-500" />, color: "bg-orange-50", textColor: "text-orange-600", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a" },
  { name: ServiceCategory.FINANCE, icon: <DollarSign className="text-teal-500" />, color: "bg-teal-50", textColor: "text-teal-600", image: "https://images.unsplash.com/photo-1579621970795-87f967b16c8a" },
  { name: ServiceCategory.TOOLS, icon: <Settings className="text-gray-500" />, color: "bg-gray-100", textColor: "text-gray-600", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837" },
];

export const SCHEMES: Scheme[] = [
  {
    id: 's1',
    name: 'Ayushman Bharat (PMJAY)',
    category: ServiceCategory.HEALTH,
    description: 'Providing health coverage up to ₹5 lakh per family per year.',
    eligibility: ['Low-income families', 'SECC database members'],
    benefits: 'Cashless treatment at empanelled public and private hospitals.',
    documents: ['Aadhaar Card', 'Ration Card', 'Income Certificate'],
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144'
  },
  {
    id: 's2',
    name: 'PM-Kisan Samman Nidhi',
    category: ServiceCategory.SCHEMES,
    description: 'Financial benefit of ₹6,000 per year for farmer families.',
    eligibility: ['Small and marginal farmers'],
    benefits: 'Direct income support of ₹6,000 in three equal installments.',
    documents: ['Land ownership documents', 'Aadhaar Card', 'Bank Passbook'],
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2'
  }
];

export const JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Senior Software Engineer',
    company: 'Tech Mahindra',
    location: 'Bangalore, India',
    salary: '₹15L - ₹25L',
    experience: '5+ Years',
    type: 'Full-time',
    deadline: '2024-12-30',
    description: 'Looking for a passionate engineer to build world-class applications.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
  },
  {
    id: 'j2',
    title: 'Content Strategist',
    company: 'Unacademy',
    location: 'Remote',
    salary: '₹8L - ₹12L',
    experience: '2-4 Years',
    type: 'Remote',
    deadline: '2024-11-15',
    description: 'Help us shape the future of online education in India.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978'
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'AIIMS Delhi',
    location: 'Ansari Nagar, New Delhi',
    type: 'Government',
    specialties: ['Cardiology', 'Oncology', 'Neurology'],
    rating: 4.8,
    contact: '011-26588500',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d'
  },
  {
    id: 'h2',
    name: 'Apollo Hospital',
    location: 'Greams Road, Chennai',
    type: 'Private',
    specialties: ['Transplants', 'Cardiology', 'Orthopedics'],
    rating: 4.5,
    contact: '044-28293333',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2'
  }
];
