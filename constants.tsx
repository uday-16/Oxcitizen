
import React from 'react';
import { Heart, BookOpen, Briefcase, Scale, AlertTriangle, DollarSign, Settings, Sprout } from 'lucide-react';
import { ServiceCategory, Scheme, Job, Hospital } from './types';

// High-Fidelity 4K Relevant Image Assets for Hero and Service Hubs
export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600",
  "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1600",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1600",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=1600",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600",
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1600",
  "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1600",
  "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1600",
  "https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?q=80&w=1600",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600",
  "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=1600"
];

export const SERVICE_CATEGORIES = [
  { name: ServiceCategory.HEALTH, icon: <Heart className="text-red-500" />, color: "bg-red-50", textColor: "text-red-600", image: "https://images.unsplash.com/photo-1504813184591-01592fd03cfd?q=80&w=1600" },
  { name: ServiceCategory.EDUCATION, icon: <BookOpen className="text-blue-500" />, color: "bg-blue-50", textColor: "text-blue-600", image: "https://images.unsplash.com/photo-1523050853064-8504f2f40075?q=80&w=1600" },
  { name: ServiceCategory.JOBS, icon: <Briefcase className="text-purple-500" />, color: "bg-purple-50", textColor: "text-purple-600", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600" },
  { name: ServiceCategory.EMERGENCY, icon: <AlertTriangle className="text-red-600" />, color: "bg-red-100", textColor: "text-red-700", image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?q=80&w=1600" },
  { name: ServiceCategory.LEGAL, icon: <Scale className="text-indigo-500" />, color: "bg-indigo-50", textColor: "text-indigo-600", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600" },
  { name: ServiceCategory.SCHEMES, icon: <Sprout className="text-orange-500" />, color: "bg-orange-50", textColor: "text-orange-600", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600" },
  { name: ServiceCategory.FINANCE, icon: <DollarSign className="text-teal-500" />, color: "bg-teal-50", textColor: "text-teal-600", image: "https://images.unsplash.com/photo-1579621970795-87f967b16c8a?q=80&w=1600" },
  { name: ServiceCategory.TOOLS, icon: <Settings className="text-gray-500" />, color: "bg-gray-100", textColor: "text-gray-600", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600" },
];

export const SCHEMES: Scheme[] = [
  {
    id: 's1',
    name: 'Ayushman Bharat (PMJAY)',
    category: ServiceCategory.HEALTH,
    description: 'Providing health coverage up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.',
    eligibility: ['Low-income families', 'SECC database members'],
    benefits: 'Cashless treatment at empanelled public and private hospitals across India.',
    documents: ['Aadhaar Card', 'Ration Card', 'Income Certificate'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200'
  },
  {
    id: 's2',
    name: 'PM-Kisan Samman Nidhi',
    category: ServiceCategory.SCHEMES,
    description: 'Central sector scheme providing income support of ₹6,000 per year to all farmer families across the country.',
    eligibility: ['Small and marginal farmers'],
    benefits: 'Direct income support of ₹6,000 in three equal installments every year.',
    documents: ['Land ownership documents', 'Aadhaar Card', 'Bank Passbook'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200'
  }
];

export const JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Senior Software Architect',
    company: 'NextGen Digital',
    location: 'Cyber City, Hyderabad',
    salary: '₹25L - ₹45L',
    experience: '8+ Years',
    type: 'Full-time',
    deadline: '2024-12-30',
    description: 'Build massive scalable infrastructure for the next generation of citizen services.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200'
  },
  {
    id: 'j2',
    title: 'Sustainability Consultant',
    company: 'EcoGov India',
    location: 'Remote',
    salary: '₹12L - ₹18L',
    experience: '3-5 Years',
    type: 'Remote',
    deadline: '2024-11-20',
    description: 'Help government bodies transition to net-zero sustainable practices.',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200'
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'AIIMS - Apex Medical Centre',
    location: 'Ansari Nagar, New Delhi',
    type: 'Government',
    specialties: ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics'],
    rating: 4.9,
    contact: '011-26588500',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?q=80&w=1200'
  },
  {
    id: 'h2',
    name: 'Global Apollo Health Hub',
    location: 'OMR, Chennai',
    type: 'Private',
    specialties: ['Transplants', 'Cardiology', 'Robotic Surgery'],
    rating: 4.7,
    contact: '044-28293333',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200'
  }
];
