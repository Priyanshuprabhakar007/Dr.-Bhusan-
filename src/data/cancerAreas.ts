import React from 'react';
import {
  Wind,
  HeartPulse,
  Layers,
  Activity,
  Droplet,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export interface BodyCancerArea {
  id: string;
  label: string;
  title: string;
  description: string;
  conditions: string[];
  treatments: string[];
  icon: React.ComponentType<{ className?: string }>;
  hotspot: { x: number; y: number }; // percentage from top-left of anatomy (0-100)
  labelPosition: { x: number; y: number }; // percentage coordinate for floating label
  pageSlug: string;
}

export const CANCER_AREAS: BodyCancerArea[] = [
  {
    id: 'chest-lung',
    label: 'Chest & Lung',
    title: 'Chest & Lung Cancer Care',
    description:
      'Explore medical oncology care for lung and thoracic cancers, including systemic treatment options selected according to cancer type, stage and biomarkers.',
    conditions: [
      'Non-Small Cell Lung Cancer (NSCLC)',
      'Small Cell Lung Cancer (SCLC)',
      'Advanced & Metastatic Lung Malignancies',
      'Pleural & Thoracic Tumors'
    ],
    treatments: [
      'Targeted Therapy (EGFR/ALK/ROS1)',
      'Immunotherapy (Checkpoint Inhibitors)',
      'Systemic Chemotherapy',
      'Precision Biomarker Profiling'
    ],
    icon: Wind,
    hotspot: { x: 50, y: 26 },
    labelPosition: { x: 80, y: 23 },
    pageSlug: 'chest-lung'
  },
  {
    id: 'head-neck',
    label: 'Head & Neck',
    title: 'Head & Neck Cancer Care',
    description:
      'Explore evidence-based systemic oncology protocols for tumors of the oral cavity, throat, and larynx, coordinated closely with surgical and radiation oncology.',
    conditions: [
      'Oral Cavity & Tongue Malignancies',
      'Laryngeal & Pharyngeal Cancers',
      'Nasopharyngeal Tumors',
      'Salivary Gland Malignancies'
    ],
    treatments: [
      'Concurrent Chemo-Radiotherapy',
      'Targeted Monoclonal Antibodies',
      'Immunotherapy Protocols',
      'Organ-Preserving Regimens'
    ],
    icon: Activity,
    hotspot: { x: 50, y: 15 },
    labelPosition: { x: 80, y: 13 },
    pageSlug: 'head-neck'
  },
  {
    id: 'breast',
    label: 'Breast',
    title: 'Breast Cancer Care',
    description:
      'Personalized cancer care calibrated to specific receptor status (HR+, HER2+, and Triple-Negative), utilizing modern targeted and endocrine therapies.',
    conditions: [
      'Hormone Receptor Positive (HR+) Breast Cancer',
      'HER2-Enriched Breast Cancer',
      'Triple-Negative Breast Cancer (TNBC)',
      'Locally Advanced & Metastatic Breast Cancer'
    ],
    treatments: [
      'Targeted HER2 Monoclonal Therapy',
      'CDK4/6 Inhibitor Regimens',
      'Endocrine & Hormonal Therapies',
      'Neoadjuvant Systemic Chemotherapy'
    ],
    icon: HeartPulse,
    hotspot: { x: 56, y: 31 },
    labelPosition: { x: 80, y: 33 },
    pageSlug: 'breast'
  },
  {
    id: 'gastrointestinal',
    label: 'Gastrointestinal',
    title: 'Gastrointestinal Cancer Care',
    description:
      'Multidisciplinary systemic oncology for digestive tract tumors, leveraging molecular profiling, microsatellite instability (MSI) testing, and targeted agents.',
    conditions: [
      'Colorectal & Rectal Cancers',
      'Stomach (Gastric) & Esophageal Cancers',
      'Pancreatic Adenocarcinoma',
      'Hepatocellular (Liver) & Bile Duct Cancers'
    ],
    treatments: [
      'MSI-H / dMMR Immunotherapy',
      'VEGF & EGFR Targeted Antibodies',
      'Perioperative Combination Chemotherapy',
      'Maintenance Regimens'
    ],
    icon: Layers,
    hotspot: { x: 50, y: 41 },
    labelPosition: { x: 80, y: 43 },
    pageSlug: 'gastrointestinal'
  },
  {
    id: 'genitourinary',
    label: 'Genitourinary',
    title: 'Genitourinary Cancer Care',
    description:
      'Systemic care pathways for cancers of the urinary tract and male reproductive organs, including advanced hormonal therapies and novel immunotherapy combinations.',
    conditions: [
      'Prostate Cancer (Castration-Sensitive & Resistant)',
      'Renal Cell Carcinoma (Kidney Cancer)',
      'Urothelial & Bladder Carcinoma',
      'Testicular Germ Cell Tumors'
    ],
    treatments: [
      'Next-Gen Androgen Receptor Blockers',
      'Tyrosine Kinase Inhibitors (TKIs)',
      'Immune Checkpoint Combinations',
      'Platinum-Based Chemotherapy'
    ],
    icon: ShieldCheck,
    hotspot: { x: 50, y: 49 },
    labelPosition: { x: 80, y: 51 },
    pageSlug: 'genitourinary'
  },
  {
    id: 'gynecological',
    label: 'Gynecological',
    title: 'Gynecological Cancer Care',
    description:
      'Comprehensive medical oncology for female reproductive cancers, integrating genetic testing (BRCA1/2, HRD) to identify patients who benefit from maintenance therapies.',
    conditions: [
      'Ovarian & Fallopian Tube Cancers',
      'Cervical Cancer',
      'Endometrial & Uterine Cancers',
      'Peritoneal Malignancies'
    ],
    treatments: [
      'PARP Inhibitor Maintenance',
      'Targeted Anti-Angiogenic Agents',
      'Immunotherapy for MMRd Cancers',
      'Taxane-Platinum Chemotherapy'
    ],
    icon: Sparkles,
    hotspot: { x: 50, y: 56 },
    labelPosition: { x: 80, y: 59 },
    pageSlug: 'gynecological'
  },
  {
    id: 'blood-cancers',
    label: 'Blood Cancers',
    title: 'Hematological & Blood Cancer Care',
    description:
      'Systemic management of hematological malignancies, deploying targeted small-molecule inhibitors, monoclonal antibodies, and tailored chemo-immunotherapy.',
    conditions: [
      'Hodgkin & Non-Hodgkin Lymphomas (NHL)',
      'Multiple Myeloma',
      'Chronic Lymphocytic & Myeloid Leukemias',
      'Myelodysplastic Syndromes'
    ],
    treatments: [
      'Monoclonal Antibody Infusions (CD20/CD38)',
      'Proteasome Inhibitors & Immunomodulators',
      'Targeted BTK & BCL-2 Inhibitors',
      'Systemic Chemo-Immunotherapy'
    ],
    icon: Droplet,
    hotspot: { x: 50, y: 36 },
    labelPosition: { x: 80, y: 38 },
    pageSlug: 'blood-cancers'
  }
];
