
import React from 'react';
import { Heart, BookOpen, Briefcase, Scale, AlertTriangle, DollarSign, Settings, Sprout, Fingerprint, MapPin } from 'lucide-react';
import { ServiceCategory, Scheme, Job, Hospital } from './types';

// High-Fidelity Relevant Image Assets for Hero and Service Hubs
export const HERO_IMAGES = [
  "https://picsum.photos/seed/civic1/1600/900",
  "https://picsum.photos/seed/civic2/1600/900",
  "https://picsum.photos/seed/civic3/1600/900",
  "https://picsum.photos/seed/civic4/1600/900",
  "https://picsum.photos/seed/civic5/1600/900",
  "https://picsum.photos/seed/civic6/1600/900",
  "https://picsum.photos/seed/civic7/1600/900",
  "https://picsum.photos/seed/civic8/1600/900",
  "https://picsum.photos/seed/civic9/1600/900",
  "https://picsum.photos/seed/civic10/1600/900",
  "https://picsum.photos/seed/civic11/1600/900",
  "https://picsum.photos/seed/civic12/1600/900",
  "https://picsum.photos/seed/civic13/1600/900",
  "https://picsum.photos/seed/civic14/1600/900",
  "https://picsum.photos/seed/civic15/1600/900"
];

export const SERVICE_CATEGORIES = [
  { name: ServiceCategory.DOCUMENTS, icon: <Fingerprint className="text-blue-500" />, color: "bg-blue-50", textColor: "text-blue-600", image: "https://picsum.photos/seed/docs/800/600" },
  { name: ServiceCategory.HEALTH, icon: <Heart className="text-red-500" />, color: "bg-red-50", textColor: "text-red-600", image: "https://picsum.photos/seed/health/800/600" },
  { name: ServiceCategory.JOBS, icon: <Briefcase className="text-purple-500" />, color: "bg-purple-50", textColor: "text-purple-600", image: "https://picsum.photos/seed/jobs/800/600" },
  { name: ServiceCategory.SCHEMES, icon: <Sprout className="text-orange-500" />, color: "bg-orange-50", textColor: "text-orange-600", image: "https://picsum.photos/seed/schemes/800/600" },
  { name: ServiceCategory.LEGAL, icon: <Scale className="text-indigo-500" />, color: "bg-indigo-50", textColor: "text-indigo-600", image: "https://picsum.photos/seed/legal/800/600" },
  { name: ServiceCategory.COMPLAINTS, icon: <AlertTriangle className="text-amber-500" />, color: "bg-amber-50", textColor: "text-amber-600", image: "https://picsum.photos/seed/complaints/800/600" },
  { name: ServiceCategory.PAYMENTS, icon: <DollarSign className="text-teal-500" />, color: "bg-teal-50", textColor: "text-teal-600", image: "https://picsum.photos/seed/finance/800/600" },
  { name: ServiceCategory.LOCAL, icon: <MapPin className="text-slate-500" />, color: "bg-slate-50", textColor: "text-slate-600", image: "https://picsum.photos/seed/local/800/600" },
];

export const PROBLEM_CARDS = [
  { id: 'p1', title: 'Lost Aadhaar Card', desc: 'Step-by-step recovery guide', icon: <Fingerprint /> },
  { id: 'p2', title: 'Medical Emergency', desc: 'Find nearest ICU & blood bank', icon: <Heart /> },
  { id: 'p3', title: 'Scholarship Help', desc: 'Apply for national scholarships', icon: <BookOpen /> },
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
    image: 'https://picsum.photos/seed/ayushman/800/600'
  },
  {
    id: 's2',
    name: 'PM-Kisan Samman Nidhi',
    category: ServiceCategory.SCHEMES,
    description: 'Central sector scheme providing income support of ₹6,000 per year to all farmer families across the country.',
    eligibility: ['Small and marginal farmers'],
    benefits: 'Direct income support of ₹6,000 in three equal installments every year.',
    documents: ['Land ownership documents', 'Aadhaar Card', 'Bank Passbook'],
    image: 'https://picsum.photos/seed/kisan/800/600'
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
    image: 'https://picsum.photos/seed/dev/800/600'
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
    image: 'https://picsum.photos/seed/eco/800/600'
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
    image: 'https://picsum.photos/seed/aiims/800/600'
  },
  {
    id: 'h2',
    name: 'Global Apollo Health Hub',
    location: 'OMR, Chennai',
    type: 'Private',
    specialties: ['Transplants', 'Cardiology', 'Robotic Surgery'],
    rating: 4.7,
    contact: '044-28293333',
    image: 'https://picsum.photos/seed/apollo/800/600'
  }
];
