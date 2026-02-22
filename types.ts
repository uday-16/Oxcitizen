
export enum ServiceCategory {
  DOCUMENTS = 'Documents',
  HEALTH = 'Health',
  JOBS = 'Jobs',
  SCHEMES = 'Schemes',
  LEGAL = 'Legal',
  COMPLAINTS = 'Complaints',
  PAYMENTS = 'Payments',
  LOCAL = 'Local'
}

export interface Scheme {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  eligibility: string[];
  benefits: string;
  documents: string[];
  image: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  deadline: string;
  description: string;
  image: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  type: 'Government' | 'Private' | 'Charitable';
  specialties: string[];
  rating: number;
  contact: string;
  image: string;
}

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  type: 'page' | 'scheme' | 'job' | 'hospital';
  link: string;
}

export type Language = 'EN' | 'HI' | 'TE';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  grounding?: any[];
}
