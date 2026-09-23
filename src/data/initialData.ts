import {
  DoctorProfile,
  PracticeLocation,
  Treatment,
  CancerType,
  BloodCancerDetail,
  BlogPost,
  FAQItem,
  Testimonial,
  LocalSeoPageData
} from '../types';

export const initialDoctorProfile: DoctorProfile = {
  name: 'Dr. Bhushan Parmar',
  speciality: 'Medical Oncology / Onco Sciences',
  positioning: 'Senior Consultant – Medical Oncology',
  experienceYears: '10+',
  tagline: 'Personalized Cancer Care. Evidence-Based Treatment. Compassion at Every Step.',
  heroHeadline: 'Personalized Cancer Care.\nEvidence-Based Treatment.\nCompassion at Every Step.',
  heroSubheadline:
    'Advanced medical oncology care for solid tumors and blood cancers with personalized treatment planning using modern systemic therapies, targeted drugs, and immunotherapy.',
  bioSummary:
    'Dr. Bhushan Parmar is a distinguished Senior Consultant in Medical Oncology with over a decade of dedicated clinical experience in diagnosing and treating solid tumors and hematological malignancies. With advanced sub-specialty training from premier oncology institutes including PGIMER Chandigarh and Rajiv Gandhi Cancer Institute & Research Centre, Delhi, he integrates genomic profiling, precision systemic therapies, and empathetic patient counseling.',
  fullBio: [
    'Dr. Bhushan Parmar completed his MBBS from Indira Gandhi Government Medical College, Shimla, followed by his MD in Clinical Oncology & Radiation Therapy from the Regional Cancer Centre, IGMC Shimla. He subsequently pursued an intensive Senior Residency in Oncology at the prestigious Postgraduate Institute of Medical Education and Research (PGIMER), Chandigarh, gaining vast expertise in high-volume tertiary cancer care.',
    'To achieve the highest tier of super-specialization, Dr. Parmar attained his DrNB in Medical Oncology from the acclaimed Rajiv Gandhi Cancer Institute & Research Centre, Delhi. Throughout his clinical journey spanning 10+ years, he has led multidisciplinary tumor boards and formulated individualized systemic chemotherapy, targeted therapy, and immunotherapy protocols.',
    'His clinical philosophy centers on the conviction that no two cancers—and no two patients—are identical. Rather than applying a one-size-fits-all regimen, Dr. Parmar combines rigorous clinical diagnostics with tumor molecular profiling to recommend therapies tailored to disease biology, functional status, and personal values.',
    'A steadfast proponent of responsible oncological communication, he takes the time to thoroughly explain diagnosis, realistic therapeutic goals, potential treatment toxicities, and supportive measures with patients and their families.'
  ],
  photoUrl: '', // Can be uploaded or replaced in Admin Panel
  qualifications: [
    {
      degree: 'MBBS',
      institution: 'Indira Gandhi Government Medical College, Shimla',
      period: 'Graduation',
      description: 'Foundational clinical training and comprehensive medical education with distinction.'
    },
    {
      degree: 'MD – Clinical Oncology & Radiation Therapy',
      institution: 'Regional Cancer Centre, IGMC Shimla',
      period: 'Postgraduate',
      description: 'Specialized clinical training in oncology principles, tumor biology, systemic therapeutics, and radiobiology.'
    },
    {
      degree: 'Senior Residency in Oncology',
      institution: 'PGIMER Chandigarh',
      period: 'Super-Specialty Residency',
      description: 'Extensive clinical tenure at one of Northern India’s premier tertiary medical research centers, managing complex solid tumors and oncological emergencies.'
    },
    {
      degree: 'DrNB – Medical Oncology',
      institution: 'Rajiv Gandhi Cancer Institute & Research Centre, Delhi',
      period: 'Super-Specialty Doctorate',
      description: 'Advanced fellowship and super-speciality accreditation focusing on precision oncology, targeted inhibitors, immunotherapy, and blood malignancies.'
    }
  ],
  coreExpertise: [
    'Medical Oncology & Systemic Protocols',
    'Chemotherapy & Neoadjuvant / Adjuvant Therapy',
    'Targeted Therapy & Kinase Inhibitors',
    'Immunotherapy & Checkpoint Inhibitors',
    'Precision Oncology & Molecular Diagnostics',
    'Solid Tumor Comprehensive Care',
    'Lymphomas (Hodgkin & Non-Hodgkin)',
    'Multiple Myeloma & Plasma Cell Disorders',
    'Blood Malignancies (Leukemias, MDS)',
    'Evidence-Based Cancer Screening',
    'Management of Oncological Emergencies'
  ],
  memberships: [
    'European Society for Medical Oncology (ESMO)',
    'American Society of Clinical Oncology (ASCO)',
    'Indian Society of Medical & Paediatric Oncology (ISMPO)',
    'Association of Physicians of India (API)'
  ]
};

export const initialPracticeLocation: PracticeLocation = {
  hospitalName: 'Max Super Speciality Hospital / Fortis Cancer Institute',
  department: 'Department of Medical Oncology & Onco Sciences',
  addressLine1: 'Phase 6, Sector 56 (Near Civil Hospital)',
  addressLine2: 'SAS Nagar (Mohali), Punjab',
  city: 'Mohali',
  state: 'Punjab',
  pincode: '160055',
  consultationTimings: 'Monday to Saturday: 10:00 AM – 4:00 PM (By Prior Appointment)',
  daysAvailable: 'Monday – Saturday',
  phonePrimary: '+91 98765 43210',
  phoneSecondary: '+91 172 555 0199',
  whatsappNumber: '+91 98765 43210',
  emailContact: 'oncology.drbhushan@gmail.com',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109741.02092147314!2d76.67137812975253!3d30.735062635905103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fe451d8be8d05%3A0x6a2c262c58a69d12!2sMohali%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Mohali+Punjab'
};

export const initialTreatments: Treatment[] = [
  {
    id: 'chemotherapy-systemic',
    title: 'Chemotherapy & Systemic Therapy',
    shortDesc:
      'Evidence-based systemic medications designed to destroy rapidly dividing cancer cells or halt their proliferation across curative, neoadjuvant, and palliative settings.',
    iconName: 'FlaskConical',
    category: 'Systemic',
    overview:
      'Systemic chemotherapy utilizes pharmacological agents distributed via the bloodstream to reach cancer cells throughout the body. Depending on disease stage, it may be delivered prior to surgery (neoadjuvant) to shrink tumors, after local therapy (adjuvant) to lower recurrence risk, or as primary disease management.',
    indications: [
      'Early-stage solid tumors with high recurrence risk (Breast, Colon, Lung)',
      'Locally advanced tumors requiring downstaging prior to surgery',
      'Systemic blood cancers including acute/chronic leukemias and lymphomas',
      'Metastatic cancers to control progression and alleviate cancer-related symptoms'
    ],
    howItWorks:
      'Chemotherapeutic agents interfere with cellular division mechanisms, disrupting DNA replication and inducing apoptosis in malignant cells while sparing healthy tissues to the maximum extent through planned recovery cycles.',
    keyBenefits: [
      'Addresses micro-metastatic disease that cannot be reached by surgery alone',
      'Synergizes with radiation or targeted therapies',
      'Standardized international dosing protocols with premedication for nausea and fatigue'
    ],
    whatToExpect:
      'Administered in a dedicated outpatient daycare facility with close hemodynamic and laboratory monitoring. Pre-medications are given to minimize side effects.'
  },
  {
    id: 'immunotherapy',
    title: 'Immunotherapy',
    shortDesc:
      'Innovative biological therapies that empower the patient’s own immune system to recognize, target, and eliminate cancer cells.',
    iconName: 'ShieldCheck',
    category: 'Cellular',
    overview:
      'Cancer cells often evade detection by activating immune checkpoint pathways (such as PD-1/PD-L1 or CTLA-4) that put the brakes on T-cells. Immunotherapy releases these brakes, enabling immune cells to mount an effective anti-tumor response.',
    indications: [
      'Advanced Non-Small Cell Lung Cancer (NSCLC)',
      'Triple-Negative Breast Cancer (in specific biomarker-positive settings)',
      'Renal Cell Carcinoma and Bladder Cancers',
      'Melanoma, Head & Neck Squamous Cancers, and Microsatellite Instability-High (MSI-H) tumors'
    ],
    howItWorks:
      'Monoclonal antibodies block inhibitory receptors on immune cells or tumor cells, restoring normal immunosurveillance and facilitating durable anti-cancer responses.',
    keyBenefits: [
      'Potential for long-term durable responses in responsive tumors',
      'Generally lacks standard chemotherapy side effects like hair loss',
      'Can be used as monotherapy or combined with systemic therapy'
    ],
    whatToExpect:
      'Delivered via intravenous infusion on an outpatient schedule (e.g. every 2 to 4 weeks). Regular monitoring for immune-related adverse events is essential.'
  },
  {
    id: 'targeted-therapy',
    title: 'Targeted Therapy',
    shortDesc:
      'Precision drugs that selectively inhibit specific genetic mutations, proteins, or blood vessel pathways essential for cancer survival.',
    iconName: 'Crosshair',
    category: 'Targeted',
    overview:
      'Targeted therapies focus on specific molecular vulnerabilities unique to cancer cells. Unlike traditional chemotherapy, they are guided by molecular diagnostics identifying specific gene alterations such as EGFR, ALK, ROS1, HER2, BRAF, or KRAS.',
    indications: [
      'EGFR, ALK, or ROS1 positive Lung Adenocarcinoma',
      'HER2-positive Breast and Gastric Cancers',
      'BRAF V600-mutated tumors and GIST',
      'Chronic Myeloid Leukemia (CML) and specific lymphomas'
    ],
    howItWorks:
      'Small molecule kinase inhibitors (often oral pills) or targeted monoclonal antibodies bind to mutated receptor tyrosine kinases, blocking intracellular growth signals.',
    keyBenefits: [
      'High specificity for cancer cells harboring the targeted aberration',
      'Often available in convenient oral formulation',
      'Can provide meaningful clinical benefit with manageable toxicity'
    ],
    whatToExpect:
      'Regular outpatient clinic visits and blood tests to verify disease response and manage specific side effects like rash, diarrhea, or liver enzyme changes.'
  },
  {
    id: 'precision-oncology',
    title: 'Precision Oncology',
    shortDesc:
      'Next-Generation Sequencing (NGS) and genomic biomarker profiling to tailor therapeutic choices to the exact genomic signature of your tumor.',
    iconName: 'Dna',
    category: 'Targeted',
    overview:
      'Precision oncology represents a paradigm shift from organ-based treatment to biology-based treatment. By sequencing tumor tissue or circulating tumor DNA (liquid biopsy), we identify actionable mutations and match patients with targeted agents or clinical options.',
    indications: [
      'Comprehensive tumor profiling for advanced or refractory cancers',
      'Rare tumors where standard treatment guidelines are limited',
      'Liquid biopsy monitoring when tissue biopsy is not clinically feasible',
      'Determining eligibility for basket therapies and targeted drugs'
    ],
    howItWorks:
      'High-throughput genomic sequencing analyzes hundreds of cancer-associated genes simultaneously to uncover mutations, amplifications, and fusions.',
    keyBenefits: [
      'Avoids therapies unlikely to benefit based on negative molecular markers',
      'Unlocks tailored systemic options guided by current international oncology evidence',
      'Facilitates molecular tumor board consensus'
    ],
    whatToExpect:
      'A biopsy specimen or blood sample is dispatched to accredited molecular pathology laboratories. Dr. Bhushan Parmar synthesizes the genomic report with clinical context.'
  },
  {
    id: 'cancer-screening',
    title: 'Cancer Screening & Early Detection',
    shortDesc:
      'Evidence-based screening protocols and risk assessments to detect premalignant lesions or early-stage cancers when therapeutic outcomes are optimal.',
    iconName: 'Search',
    category: 'Preventive',
    overview:
      'Detecting cancer before symptoms manifest significantly increases curative potential. Dr. Parmar evaluates individual risk factors, family history, and lifestyle factors to advise tailored screening regimens based on internationally validated guidelines.',
    indications: [
      'Breast cancer screening (Mammography & clinical examination)',
      'Cervical cancer screening (HPV DNA testing & Pap smear)',
      'Colorectal screening (Colonoscopy & stool tests)',
      'High-risk lung screening (Low-dose CT scan for eligible individuals)',
      'Prostate health evaluation & hereditary cancer risk assessment'
    ],
    howItWorks:
      'Standardized clinical evaluations and non-invasive or minimally invasive diagnostic tests identify dysplastic changes or early localized lesions.',
    keyBenefits: [
      'Identifies pre-cancerous conditions before invasive transformation occurs',
      'Allows for less aggressive, organ-sparing treatment modalities when found early',
      'Provides peace of mind with evidence-backed guidance'
    ],
    whatToExpect:
      'A comprehensive consultation reviewing personal medical background, family tree history, and recommended screening intervals.'
  },
  {
    id: 'supportive-care',
    title: 'Supportive & Palliative Oncology Care',
    shortDesc:
      'Holistic symptom control, pain management, nutritional support, and emergency oncology management to preserve dignity and quality of life.',
    iconName: 'HeartPulse',
    category: 'Supportive',
    overview:
      'Comprehensive oncology care extends beyond tumor reduction to safeguarding the patient’s overall well-being. Supportive care is integrated alongside active cancer therapy to prevent and manage pain, nausea, neutropenia, metabolic disturbances, and psychological distress.',
    indications: [
      'Cancer-related pain management utilizing WHO analgesic step-ladder',
      'Management of treatment-related toxicities (mucositis, fatigue, neuropathy)',
      'Nutritional optimization in gastrointestinal and head & neck cancers',
      'Rapid intervention for oncological emergencies (hypercalcemia, febrile neutropenia, cord compression)'
    ],
    howItWorks:
      'Multidisciplinary intervention combining pharmacological symptom relief, dietary guidance, bone-modifying agents, and supportive hematologic care.',
    keyBenefits: [
      'Minimizes treatment interruptions and dose reductions',
      'Improves patient tolerance, daily functioning, and quality of life',
      'Offers emotional and psychological reassurance for families'
    ],
    whatToExpect:
      'Compassionate, respectful evaluation at every visit with dedicated symptom assessment tools and 24/7 emergency response protocols.'
  }
];

export const initialCancers: CancerType[] = [
  {
    id: 'breast-cancer',
    name: 'Breast Cancer',
    category: 'Solid Tumor',
    slug: 'breast-cancer',
    shortOverview:
      'Personalized systemic therapy protocols based on ER, PR, HER2, Ki-67 status, and genomic risk recurrence profiling.',
    symptoms: [
      'Painless lump or thickening in the breast or axilla',
      'Change in breast shape, size, or skin dimpling',
      'Nipple inversion, discharge, or localized redness'
    ],
    diagnosticEvaluation: [
      'Digital mammogram and high-resolution breast ultrasound',
      'Core needle biopsy with immunohistochemistry (ER, PR, HER2, Ki-67)',
      'Genomic risk profiling (Oncotype DX / MammaPrint) when appropriate'
    ],
    medicalOncologyTreatment: [
      'Neoadjuvant chemotherapy to downstage tumors before breast-conserving surgery',
      'Adjuvant endocrine therapy (Tamoxifen, Aromatase Inhibitors) for hormone-positive tumors',
      'Anti-HER2 targeted therapy (Trastuzumab, Pertuzumab, antibody-drug conjugates)',
      'Immunotherapy for eligible triple-negative breast cancer (TNBC)'
    ],
    personalizedApproach:
      'Treatment is customized strictly according to molecular subtype and individual cardiovascular and metabolic health, avoiding over-treatment or under-treatment.'
  },
  {
    id: 'lung-cancer',
    name: 'Lung Cancer (NSCLC & SCLC)',
    category: 'Solid Tumor',
    slug: 'lung-cancer',
    shortOverview:
      'Comprehensive molecular testing for actionable mutations (EGFR, ALK, ROS1, PD-L1) and personalized targeted/immuno-chemotherapy.',
    symptoms: [
      'Persistent or worsening cough',
      'Hemoptysis (coughing up blood)',
      'Unexplained shortness of breath and chest discomfort',
      'Unintended weight loss and hoarseness'
    ],
    diagnosticEvaluation: [
      'Contrast-enhanced chest CT scan and whole-body PET-CT',
      'Tissue biopsy via bronchoscopy or CT-guided fine needle/core',
      'Next-Generation Sequencing (NGS) for EGFR, ALK, ROS1, KRAS, BRAF, RET, MET, and PD-L1'
    ],
    medicalOncologyTreatment: [
      'Oral targeted tyrosine kinase inhibitors (TKIs) for mutation-positive NSCLC',
      'Immune checkpoint inhibitors alone or combined with chemotherapy',
      'Adjuvant or neoadjuvant chemo-immunotherapy protocols for resectable stages',
      'Platinum-doublet chemotherapy and supportive thoracic oncology care'
    ],
    personalizedApproach:
      'No systemic therapy for advanced lung adenocarcinoma is initiated without assessing the molecular profile, ensuring targeted therapy is prioritized when indicated.'
  },
  {
    id: 'colorectal-cancer',
    name: 'Colorectal Cancer',
    category: 'Solid Tumor',
    slug: 'colorectal-cancer',
    shortOverview:
      'Staging-directed systemic protocols combining fluoropyrimidine-based regimens with biologic agents and MSI-H screening.',
    symptoms: [
      'Persistent change in bowel habits (diarrhea or constipation)',
      'Rectal bleeding or blood in the stool',
      'Abdominal cramps, fullness, or iron-deficiency anemia'
    ],
    diagnosticEvaluation: [
      'Colonoscopy with tissue biopsy of suspected lesions',
      'Contrast-enhanced abdominal CT / pelvic MRI and whole-body PET-CT',
      'Molecular testing for KRAS, NRAS, BRAF mutations and MSI/MMR status'
    ],
    medicalOncologyTreatment: [
      'Adjuvant chemotherapy (FOLFOX / CAPOX) for high-risk stage II and stage III disease',
      'Biologic targeted therapies (anti-VEGF or anti-EGFR antibodies) for RAS wild-type tumors',
      'Immunotherapy (anti-PD-1) for MSI-High / dMMR tumors'
    ],
    personalizedApproach:
      'Careful evaluation of tumor sidedness (left vs right colon) and RAS/BRAF mutations to select the most effective biologic combination.'
  },
  {
    id: 'stomach-cancer',
    name: 'Stomach (Gastric) Cancer',
    category: 'Solid Tumor',
    slug: 'stomach-cancer',
    shortOverview:
      'Multidisciplinary systemic strategies including perioperative chemotherapy (FLOT) and HER2/PD-L1 directed therapies.',
    symptoms: [
      'Persistent indigestion, heartburn, or early satiety',
      'Vague upper abdominal pain',
      'Unexplained weight loss and fatigue'
    ],
    diagnosticEvaluation: [
      'Upper GI endoscopy with targeted biopsies',
      'Staging CT abdomen/chest and diagnostic laparoscopy when indicated',
      'Testing for HER2 neu expression, MSI status, and PD-L1 CPS score'
    ],
    medicalOncologyTreatment: [
      'Perioperative chemotherapy (FLOT regimen) before and after radical surgery',
      'Trastuzumab combined with chemotherapy for HER2-positive gastric cancers',
      'Immuno-chemotherapy for advanced PD-L1 expressing tumors'
    ],
    personalizedApproach:
      'Nutritional support and close monitoring of gastrointestinal tolerance during intensive systemic therapy.'
  },
  {
    id: 'liver-cancer',
    name: 'Liver Cancer (Hepatocellular Carcinoma)',
    category: 'Solid Tumor',
    slug: 'liver-cancer',
    shortOverview:
      'Modern systemic management balancing tumor eradication with preservation of underlying liver function.',
    symptoms: [
      'Right upper quadrant abdominal pain or fullness',
      'Jaundice (yellowing of skin or eyes)',
      'Abdominal swelling (ascites) and unexplained weight loss'
    ],
    diagnosticEvaluation: [
      'Triple-phase liver CT or dynamic contrast MRI',
      'Serum Alpha-Fetoprotein (AFP) biomarker levels',
      'Child-Pugh and ALBI scoring to evaluate underlying liver cirrhosis'
    ],
    medicalOncologyTreatment: [
      'First-line immunotherapy + anti-VEGF combinations (e.g. Atezolizumab + Bevacizumab)',
      'Oral multikinase inhibitors (Sorafenib, Lenvatinib) for eligible patients',
      'Integration with local hepatic therapies like TACE/TARE in multidisciplinary boards'
    ],
    personalizedApproach:
      'Careful tailoring according to liver functional reserve to prevent hepatic decompensation.'
  },
  {
    id: 'pancreatic-cancer',
    name: 'Pancreatic Cancer',
    category: 'Solid Tumor',
    slug: 'pancreatic-cancer',
    shortOverview:
      'Aggressive systemic chemotherapy combinations, BRCA gene testing, and comprehensive symptom management.',
    symptoms: [
      'Painless jaundice and dark urine',
      'Upper abdominal pain radiating to the mid-back',
      'Recent-onset diabetes in older adults and significant weight loss'
    ],
    diagnosticEvaluation: [
      'Pancreatic protocol triphasic CT and EUS (Endoscopic Ultrasound) with biopsy',
      'Serum CA 19-9 biomarker',
      'Germline testing for BRCA1/2 mutations'
    ],
    medicalOncologyTreatment: [
      'Modified FOLFIRINOX or Gemcitabine + Nab-Paclitaxel chemotherapy regimens',
      'Neoadjuvant systemic therapy to achieve R0 surgical margins in borderline resectable tumors',
      'PARP inhibitor maintenance for platinum-sensitive BRCA-mutated pancreatic cancers'
    ],
    personalizedApproach:
      'Proactive management of exocrine pancreatic insufficiency, biliary stenting coordination, and specialized pain management.'
  },
  {
    id: 'head-and-neck-cancer',
    name: 'Head & Neck Cancers',
    category: 'Solid Tumor',
    slug: 'head-and-neck-cancer',
    shortOverview:
      'Systemic management of oral cavity, laryngeal, and pharyngeal cancers, emphasizing organ preservation and functional speech/swallowing.',
    symptoms: [
      'Non-healing ulcer in the mouth or tongue lasting over 2 weeks',
      'Difficulty or pain during swallowing (dysphagia)',
      'Persistent sore throat, ear pain, or neck lump'
    ],
    diagnosticEvaluation: [
      'Clinical head & neck examination with flexible nasopharyngolaryngoscopy',
      'Incisional or core biopsy of the primary lesion or neck node',
      'Contrast MRI/CT and HPV (p16) immunohistochemistry for oropharyngeal tumors'
    ],
    medicalOncologyTreatment: [
      'Concurrent chemoradiotherapy with Cisplatin for locally advanced disease',
      'Induction chemotherapy (TPF regimen) for select organ preservation candidates',
      'Immunotherapy (Pembrolizumab / Nivolumab) and targeted therapy for recurrent disease'
    ],
    personalizedApproach:
      'Integrated swallowing rehabilitation, dental clearance, and nutritional optimization to ensure smooth completion of therapy.'
  },
  {
    id: 'prostate-cancer',
    name: 'Prostate Cancer',
    category: 'Solid Tumor',
    slug: 'prostate-cancer',
    shortOverview:
      'Comprehensive endocrine therapy, next-generation androgen receptor axis inhibitors, and precision chemotherapy.',
    symptoms: [
      'Frequent nighttime urination (nocturia) and weak urinary stream',
      'Hematuria or hematospermia',
      'Bone pain in back or hips in advanced disease'
    ],
    diagnosticEvaluation: [
      'Serum Total PSA and Free PSA ratios',
      'Multi-parametric MRI (mpMRI) of the prostate',
      'PSMA PET-CT scan for high-risk staging'
    ],
    medicalOncologyTreatment: [
      'Androgen Deprivation Therapy (LHRH agonists / antagonists)',
      'Next-generation hormonal agents (Enzalutamide, Abiraterone, Apalutamide)',
      'Chemotherapy (Docetaxel, Cabazitaxel) for castrate-resistant prostate cancer (CRPC)',
      'PARP inhibitors for homologous recombination repair (HRR) gene alterations'
    ],
    personalizedApproach:
      'Risk-stratified approach balancing oncological control against cardiovascular and bone health.'
  },
  {
    id: 'kidney-and-bladder-cancer',
    name: 'Kidney & Bladder Cancer',
    category: 'Solid Tumor',
    slug: 'kidney-and-bladder-cancer',
    shortOverview:
      'Systemic protocols using immune checkpoint doublets, tyrosine kinase inhibitors, and FGFR-targeted agents.',
    symptoms: [
      'Painless gross hematuria (blood in urine)',
      'Flank pain or palpable abdominal mass',
      'Pelvic pain or persistent urinary urgency'
    ],
    diagnosticEvaluation: [
      'Multiphasic renal CT, cystoscopy with transurethral resection (TURBT)',
      'Whole-body staging CT or PET-CT',
      'Histological subtype verification (clear cell vs non-clear cell; urothelial carcinoma)'
    ],
    medicalOncologyTreatment: [
      'Combination immunotherapy (e.g. Nivolumab + Ipilimumab) or IO + TKI for kidney cancer',
      'Neoadjuvant platinum-based chemotherapy for muscle-invasive bladder cancer',
      'Antibody-drug conjugates and FGFR inhibitors for refractory urothelial tumors'
    ],
    personalizedApproach:
      'Renal function monitoring and nephrology coordination to ensure safe dosing in solitary or impaired kidney states.'
  },
  {
    id: 'ovarian-cancer',
    name: 'Ovarian Cancer',
    category: 'Solid Tumor',
    slug: 'ovarian-cancer',
    shortOverview:
      'Platinum-based systemic therapy, interval debulking coordination, and maintenance PARP inhibitor protocols.',
    symptoms: [
      'Persistent abdominal bloating and early satiety',
      'Pelvic discomfort or back pain',
      'Change in bowel or urinary habits'
    ],
    diagnosticEvaluation: [
      'Pelvic ultrasound, contrast CT abdomen-pelvis, and PET-CT',
      'Serum CA-125 and HE4 biomarker levels',
      'Germline and somatic BRCA1/2 and HRD testing'
    ],
    medicalOncologyTreatment: [
      'Carboplatin + Paclitaxel systemic therapy (neoadjuvant or adjuvant)',
      'PARP inhibitor maintenance (Olaparib, Niraparib) for BRCA/HRD-positive patients',
      'Anti-angiogenic therapy (Bevacizumab) integration in advanced stages'
    ],
    personalizedApproach:
      'Close collaboration with gynecologic oncology surgeons to time chemotherapy cycles with optimal surgical debulking.'
  },
  {
    id: 'cervical-cancer',
    name: 'Cervical Cancer',
    category: 'Solid Tumor',
    slug: 'cervical-cancer',
    shortOverview:
      'Concurrent chemoradiation protocols, anti-angiogenic combinations, and immunotherapy for persistent disease.',
    symptoms: [
      'Abnormal vaginal bleeding between periods or after intercourse',
      'Persistent foul-smelling vaginal discharge',
      'Pelvic or back pain in advanced stages'
    ],
    diagnosticEvaluation: [
      'Cervical examination with colposcopy and directed punch biopsy',
      'Pelvic MRI and whole-body PET-CT for nodal and distant staging',
      'Evaluation of PD-L1 CPS score in recurrent disease'
    ],
    medicalOncologyTreatment: [
      'Weekly Cisplatin administered concurrently with definitive radiotherapy',
      'Chemotherapy plus Bevacizumab for recurrent or metastatic disease',
      'Immunotherapy integration for PD-L1 positive advanced cervical cancers'
    ],
    personalizedApproach:
      'Emphasis on comprehensive treatment completion without unplanned interruptions to optimize pelvic disease control.'
  },
  {
    id: 'lymphoma',
    name: 'Lymphoma (Hodgkin & Non-Hodgkin)',
    category: 'Blood Cancer',
    slug: 'lymphoma',
    shortOverview:
      'Subtype-specific systemic immunotherapy and chemotherapy protocols guided by detailed immunohistochemistry and PET response.',
    symptoms: [
      'Painless swelling of lymph nodes in neck, armpits, or groin',
      'Unexplained fever, night sweats, and significant weight loss (B-symptoms)',
      'Persistent fatigue and generalized itching'
    ],
    diagnosticEvaluation: [
      'Excisional lymph node biopsy (fine needle aspiration is strictly insufficient for subtyping)',
      'Comprehensive immunohistochemistry (IHC) panel and molecular testing',
      'Baseline baseline PET-CT scan for Ann Arbor / Lugano staging'
    ],
    medicalOncologyTreatment: [
      'ABVD or escalated BEACOPP regimens for Classical Hodgkin Lymphoma',
      'R-CHOP chemo-immunotherapy for Diffuse Large B-Cell Lymphoma (DLBCL)',
      'Targeted BTK inhibitors and CD30-directed antibody-drug conjugates (Brentuximab Vedotin)'
    ],
    personalizedApproach:
      'Interim PET-CT assessment to gauge metabolic response and tailor treatment intensity, minimizing long-term cardiovascular and secondary toxicity.'
  },
  {
    id: 'multiple-myeloma',
    name: 'Multiple Myeloma',
    category: 'Blood Cancer',
    slug: 'multiple-myeloma',
    shortOverview:
      'Modern novel quadruplet and triplet regimens combining proteasome inhibitors, immunomodulators, and monoclonal antibodies.',
    symptoms: [
      'Bone pain, particularly in the spine, ribs, or hips',
      'Fatigue and weakness secondary to anemia',
      'Recurrent infections and elevated serum creatinine / kidney impairment'
    ],
    diagnosticEvaluation: [
      'Serum and urine protein electrophoresis with immunofixation (SPEP/UPEP)',
      'Serum Free Light Chain (sFLC) assay',
      'Bone marrow aspiration and biopsy with FISH cytogenetics (17p deletion, t(4;14), etc.)',
      'Whole-body low-dose CT or PET-CT for osteolytic lesions'
    ],
    medicalOncologyTreatment: [
      'Triplet/Quadruplet induction (e.g. Daratumumab, Bortezomib, Lenalidomide, Dexamethasone)',
      'Evaluation for Autologous Stem Cell Transplantation (ASCT) eligibility',
      'Continuous maintenance therapy to sustain deep hematological remission',
      'Bone-strengthening therapy (Zoledronic acid / Denosumab)'
    ],
    personalizedApproach:
      'Risk-adapted strategy based on cytogenetic risk stratification with vigilant monitoring of renal function and blood counts.'
  },
  {
    id: 'other-blood-malignancies',
    name: 'Other Blood Malignancies (Leukemia & MDS)',
    category: 'Blood Cancer',
    slug: 'blood-malignancies',
    shortOverview:
      'Precision systemic therapy for Acute and Chronic Leukemias (AML, ALL, CML, CLL) and Myelodysplastic Syndromes.',
    symptoms: [
      'Severe fatigue, pale skin, and shortness of breath',
      'Easy bruising, petechiae, or unusual bleeding from gums',
      'Frequent fevers, bone aches, and enlarged spleen or liver'
    ],
    diagnosticEvaluation: [
      'Complete blood count with peripheral smear morphology',
      'Bone marrow aspirate with multi-color flow cytometry',
      'Molecular genetics (FLT3, NPM1, BCR-ABL, IDH1/2, TP53)'
    ],
    medicalOncologyTreatment: [
      'Targeted BCR-ABL tyrosine kinase inhibitors (Imatinib, Dasatinib) for CML',
      'Targeted Venetoclax + Hypomethylating agent regimens for AML',
      'Targeted BTK inhibitors and BCL-2 inhibitors for Chronic Lymphocytic Leukemia (CLL)',
      'Transfusion support, antibiotic prophylaxis, and bone marrow evaluation'
    ],
    personalizedApproach:
      'Rapid diagnostic triage and initiation of subtype-appropriate therapy to avoid metabolic emergencies.'
  },
  {
    id: 'rare-advanced-cancers',
    name: 'Rare and Advanced Cancers',
    category: 'Rare & Advanced',
    slug: 'rare-advanced-cancers',
    shortOverview:
      'Comprehensive genomic profiling and tumor-agnostic therapies for sarcomas, neuroendocrine tumors, and carcinoma of unknown primary.',
    symptoms: [
      'Deep-seated soft tissue masses or lumps',
      'Flushing, wheezing, or diarrhea (carcinoid syndrome)',
      'Widespread metastatic symptoms without clear primary tumor origin'
    ],
    diagnosticEvaluation: [
      'Comprehensive Next-Generation Sequencing (tissue and liquid biopsy)',
      '68Ga-DOTATATE PET-CT for neuroendocrine tumors',
      'Multidisciplinary rare tumor review'
    ],
    medicalOncologyTreatment: [
      'Histology-specific multi-agent chemotherapy regimens for sarcomas',
      'Somatostatin analogues and PRRT coordination for neuroendocrine tumors',
      'Tumor-agnostic targeted therapies (NTRK inhibitors, BRAF inhibitors, RET inhibitors)'
    ],
    personalizedApproach:
      'Leveraging global oncological trial data and biomarker-driven therapy where standard organ guidelines do not exist.'
  }
];

export const bloodCancerDetails: BloodCancerDetail[] = [
  {
    id: 'lymphoma-detail',
    name: 'Lymphoma Care',
    subtitle: 'Hodgkin & Non-Hodgkin Lymphomas',
    description:
      'Lymphomas originate in the lymphatic system—part of the body’s germ-fighting immune network. Because there are over 70 distinct lymphoma subtypes, establishing an accurate pathological and molecular diagnosis via excisional biopsy is critical before determining therapy.',
    diagnosticWorkup: [
      'Excisional lymph node biopsy with extensive immunohistochemical analysis',
      'Whole-body baseline 18F-FDG PET-CT scan',
      'Bone marrow biopsy and aspirate when indicated',
      'Echocardiogram and pulmonary function tests prior to specific systemic agents'
    ],
    systemicTherapies: [
      'Anti-CD20 monoclonal antibody immunotherapy (Rituximab, Obinutuzumab)',
      'Combination multi-agent chemotherapy tailored to risk score (ABVD, R-CHOP, Pola-R-CHP)',
      'Targeted oral BTK inhibitors and antibody-drug conjugates (ADCs)'
    ],
    monitoringProtocols: [
      'Mid-treatment interim PET-CT scans to assess early metabolic clearing',
      'Careful monitoring for febrile neutropenia and prompt administration of G-CSF support',
      'Long-term survivorship surveillance to protect cardiovascular health'
    ]
  },
  {
    id: 'myeloma-detail',
    name: 'Multiple Myeloma',
    subtitle: 'Plasma Cell Disorders & MGUS',
    description:
      'Multiple Myeloma is a clonal disorder of plasma cells in the bone marrow that produce abnormal monoclonal proteins. Modern oncology has transformed myeloma management into a chronic, controllable condition through novel targeted classes.',
    diagnosticWorkup: [
      'Serum Free Light Chain (sFLC) ratio and Serum Protein Electrophoresis with Immunofixation',
      'Bone marrow aspirate with FISH cytogenetics to assess high-risk chromosomal changes',
      'Whole-body low-dose CT or MRI to screen for osteolytic bone lesions'
    ],
    systemicTherapies: [
      'Proteasome inhibitors (Bortezomib, Carfilzomib)',
      'Immunomodulatory drugs (Lenalidomide, Pomalidomide)',
      'Anti-CD38 monoclonal antibodies (Daratumumab, Isatuximab)',
      'Bone protection with intravenous bisphosphonates or RANKL inhibitors'
    ],
    monitoringProtocols: [
      'Monthly paraprotein tracking to verify ongoing response depth',
      'Kidney function monitoring and supportive hydration strategies',
      'Thromboprophylaxis and infection prevention with antiviral / antibacterial coverage'
    ]
  },
  {
    id: 'leukemia-detail',
    name: 'Blood Malignancies',
    subtitle: 'Acute & Chronic Leukemias & MDS',
    description:
      'Encompasses acute myeloid leukemia (AML), acute lymphoblastic leukemia (ALL), chronic myeloid leukemia (CML), chronic lymphocytic leukemia (CLL), and myelodysplastic syndromes (MDS). Timely specialized oncological assessment is essential.',
    diagnosticWorkup: [
      'High-parameter flow cytometry on peripheral blood or bone marrow',
      'Cytogenetic karyotyping and RT-PCR for BCR-ABL transcript levels',
      'Next-generation molecular panel for AML (FLT3-ITD, NPM1, CEBPA, IDH1/2)'
    ],
    systemicTherapies: [
      'Targeted Tyrosine Kinase Inhibitors (TKIs) achieving molecular remissions in CML',
      'Low-intensity targeted combinations (Venetoclax + Azacitidine) for elderly or frail AML patients',
      'Targeted CD20 and BCL-2 inhibitors for chronic lymphocytic leukemia'
    ],
    monitoringProtocols: [
      'Regular complete blood count surveillance',
      'Serial quantitative PCR for molecular minimal residual disease (MRD)',
      'Dedicated transfusion support and proactive infectious disease precautions'
    ]
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'What is Chemotherapy?',
    slug: 'what-is-chemotherapy',
    category: 'Systemic Therapy',
    publishedDate: 'September 2026',
    readTime: '6 min read',
    author: 'Dr. Bhushan Parmar',
    seoTitle: 'What is Chemotherapy? Principles & Modern Protocols | Dr. Bhushan Parmar',
    metaDescription:
      'Understand how modern chemotherapy works, why it is used, and how advances in supportive medicine have made treatment safer and more tolerable.',
    summary:
      'Chemotherapy uses systemic medications to destroy rapidly multiplying cancer cells throughout the body. Learn about modern regimens, outpatient daycare administration, and preventative supportive care.',
    content: [
      'Chemotherapy remains one of the foundational pillars of systemic cancer treatment. It involves the use of specialized anti-cancer medications that circulate throughout the bloodstream to eliminate malignant cells. Because cancer cells proliferate and divide at an abnormally rapid rate, chemotherapy drugs are engineered to disrupt critical phases of cellular division.',
      'Depending on the patient’s clinical stage and goals of care, chemotherapy may be prescribed in different clinical contexts: Neoadjuvant chemotherapy is administered before definitive surgery or radiation to downsize large tumors; Adjuvant chemotherapy is given following surgery to eradicate microscopic residual cancer cells and prevent recurrence; and Palliative chemotherapy is deployed to alleviate tumor-related symptoms, preserve organ function, and prolong quality of life in advanced disease.',
      'A major evolution in oncology is how chemotherapy is delivered today. Modern chemotherapy is predominantly administered in comfortable outpatient daycare units without requiring overnight hospitalization. Intravenous access ports (Chemo-ports) prevent repeated needle pricks and protect delicate peripheral veins.',
      'Furthermore, modern supportive oncology has dramatically transformed tolerability. Routine administration of multi-drug antiemetic regimens (such as NK1 receptor antagonists and 5-HT3 antagonists) successfully prevents acute and delayed nausea in the vast majority of patients. Growth factor support (G-CSF) safeguards white blood cell counts, minimizing infection risks.'
    ],
    keyTakeaways: [
      'Chemotherapy circulates systemically to eliminate rapidly dividing cancer cells.',
      'It can be used before surgery (neoadjuvant), after surgery (adjuvant), or for symptom control.',
      'Modern supportive medications have made severe vomiting largely preventable in modern daycare clinics.'
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-2',
    title: 'How Does Immunotherapy Work?',
    slug: 'how-does-immunotherapy-work',
    category: 'Immunotherapy',
    publishedDate: 'August 2026',
    readTime: '5 min read',
    author: 'Dr. Bhushan Parmar',
    seoTitle: 'How Does Cancer Immunotherapy Work? | Dr. Bhushan Parmar',
    metaDescription:
      'Discover how immune checkpoint inhibitors empower your immune system to detect and attack cancer cells without classic chemotherapy toxicity.',
    summary:
      'Immunotherapy operates by releasing the natural brakes that cancer cells place on the human immune system, allowing T-cells to identify and eliminate tumors.',
    content: [
      'The human immune system has remarkable innate surveillance mechanisms designed to identify and eliminate abnormal cells before they develop into tumors. However, malignant cells evolve clever biological strategies to escape detection—often by producing specific checkpoint proteins (such as PD-L1) that bind to receptor molecules (such as PD-1) on cytotoxic T-lymphocytes.',
      'This interaction acts like a molecular brake or a fake "do not attack" signal, essentially blinding the patient’s immune defenses. Immune checkpoint inhibitors are laboratory-engineered monoclonal antibodies that physically disrupt this binding. By removing the brake, the immune system is re-activated to recognize the tumor as foreign and launch a coordinated immunological assault.',
      'Unlike cytotoxic chemotherapy, immunotherapy does not directly poison cells and does not cause hair loss or severe suppression of blood counts. When a patient’s tumor responds to immunotherapy, the therapeutic benefit can be remarkably durable, creating long-term immunological memory against cancer recurrence.',
      'Not every cancer is susceptible to immunotherapy. Dr. Bhushan Parmar evaluates predictive biomarkers—such as PD-L1 immunohistochemistry expression, Microsatellite Instability (MSI-High / dMMR), and Tumor Mutational Burden (TMB)—to determine if immunotherapy offers a clinical advantage for each individual patient.'
    ],
    keyTakeaways: [
      'Cancer cells evade the immune system by engaging molecular checkpoints like PD-1 / PD-L1.',
      'Checkpoint inhibitors remove this camouflage, enabling T-cells to destroy cancer cells.',
      'Biomarker analysis (PD-L1, MSI-H) identifies which patients are most likely to achieve lasting remissions.'
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-3',
    title: 'What is Targeted Therapy?',
    slug: 'what-is-targeted-therapy',
    category: 'Targeted Therapy',
    publishedDate: 'August 2026',
    readTime: '5 min read',
    author: 'Dr. Bhushan Parmar',
    seoTitle: 'What is Targeted Cancer Therapy? Molecular Inhibitors | Dr. Bhushan Parmar',
    metaDescription:
      'Learn about targeted cancer therapy, oral tyrosine kinase inhibitors, monoclonal antibodies, and how genomic testing matches treatments to tumor mutations.',
    summary:
      'Targeted therapies act as precision-guided missiles that zero in on specific genetic alterations and abnormal proteins driving cancer growth.',
    content: [
      'In traditional cancer medicine, treatments were selected primarily based on the organ in which the tumor first formed—such as lung, breast, or colon. Today, precision oncology recognizes that the genetic driver behind a cancer cell’s uncontrolled multiplication is equally, if not more, important.',
      'Targeted cancer therapies are medications designed to interfere with specific molecular pathways, faulty enzymes, or abnormal proteins that malignant cells rely on to survive. These drugs include small-molecule oral tablets (such as Tyrosine Kinase Inhibitors, or TKIs) and large laboratory-created monoclonal antibodies.',
      'For example, in non-small cell lung cancer, tumors harboring activating EGFR mutations or ALK rearrangements can be managed with oral targeted tablets that selectively block those aberrant signaling circuits, often achieving rapid tumor regression while sparing normal tissues.',
      'To prescribe targeted therapy safely and effectively, Dr. Bhushan Parmar orders comprehensive Next-Generation Sequencing (NGS) panel testing. This molecular audit maps actionable genetic mutations in the patient’s biopsy or circulating tumor DNA, matching each finding to clinically proven targeted therapies.'
    ],
    keyTakeaways: [
      'Targeted therapies selectively block abnormal molecular pathways without harming most healthy cells.',
      'Many targeted therapies are available as convenient daily oral capsules or tablets.',
      'Comprehensive genomic sequencing (NGS) is essential to discover actionable mutations like EGFR, ALK, HER2, or BRAF.'
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-4',
    title: 'Do All Cancer Patients Need Chemotherapy?',
    slug: 'do-all-cancer-patients-need-chemotherapy',
    category: 'Clinical Guidance',
    publishedDate: 'July 2026',
    readTime: '4 min read',
    author: 'Dr. Bhushan Parmar',
    seoTitle: 'Do All Cancer Patients Need Chemotherapy? | Dr. Bhushan Parmar',
    metaDescription:
      'An oncologist explains why chemotherapy is not necessary for every cancer patient today and how hormone therapy, targeted drugs, and surgery fit in.',
    summary:
      'One of the most frequent misconceptions is that every cancer diagnosis requires chemotherapy. Discover modern criteria for chemotherapy-free treatment protocols.',
    content: [
      'When patients and families hear the word "cancer," their immediate fear is often the assumption that grueling cycles of chemotherapy are inevitable. However, one of the greatest achievements of 21st-century medical oncology is our ability to safely avoid chemotherapy in a growing proportion of patients.',
      'Cancer is a spectrum of biologically diverse diseases. In many early-stage solid tumors, curative surgical resection followed by targeted hormonal therapy or observation is entirely sufficient. For example, in postmenopausal women with early-stage, hormone-receptor-positive breast cancer, multigene genomic assays (such as Oncotype DX) can confirm when the risk of recurrence is so low that chemotherapy provides zero meaningful benefit.',
      'Similarly, in specific molecular subsets of lung cancer, kidney cancer, chronic leukemias, and gastrointestinal stromal tumors (GIST), targeted oral medications or immunotherapy are frequently used as the primary treatment without traditional cytotoxic chemotherapy.',
      'The decision to recommend or omit chemotherapy is never arbitrary. Dr. Bhushan Parmar carefully synthesizes cancer histology, staging, genomic biomarkers, and the patient’s overall health to ensure that chemotherapy is only utilized when scientific evidence demonstrates a clear curative or life-extending advantage.'
    ],
    keyTakeaways: [
      'Chemotherapy is no longer mandatory for every cancer patient or every stage of disease.',
      'Genomic multigene assays help identify patients who can safely avoid chemotherapy.',
      'Oral targeted therapies and hormone treatments frequently replace chemotherapy in suitable tumor biology.'
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-5',
    title: 'What Happens During Your First Oncology Visit?',
    slug: 'what-happens-during-your-first-oncology-visit',
    category: 'Patient Preparation',
    publishedDate: 'July 2026',
    readTime: '5 min read',
    author: 'Dr. Bhushan Parmar',
    seoTitle: 'What to Expect at Your First Oncology Consultation | Dr. Bhushan Parmar',
    metaDescription:
      'Step-by-step walkthrough of what occurs during your initial medical oncology consultation, reports to bring, and questions to ask.',
    summary:
      'Knowing what to expect during your first consultation with Dr. Bhushan Parmar helps reduce anxiety and ensures a productive, reassuring conversation.',
    content: [
      'Walking into a cancer consultation for the first time is understandably an emotional and stressful experience. Knowing the structure of the visit can alleviate uncertainty and help you feel empowered during your discussions.',
      'During your first visit, Dr. Bhushan Parmar does not begin by rushing into treatment. The appointment begins with an in-depth conversation covering your complete medical history, when your symptoms began, previous surgeries, and any family history of cancer. A gentle physical examination follows.',
      'Next is a systematic review of all available medical records. Dr. Parmar inspects your biopsy pathology reports, immunohistochemistry (IHC) slides, PET-CT or MRI scans, and blood counts. If additional molecular profiling or confirmatory tests are needed to ensure the safest treatment path, this will be explained clearly.',
      'Finally, Dr. Parmar outlines the clinical situation, clarifies the goals of therapy (curative intent vs. disease control), discusses suitable systemic treatment modalities, and answers every question you and your loved ones have. You will receive clear written guidance on next steps without being rushed into hasty decisions.'
    ],
    keyTakeaways: [
      'The first visit is an exploratory, educational dialogue—treatment is not started without full consensus.',
      'Bring all biopsy slides, tissue blocks, radiological CD discs, and prior surgical summaries.',
      'Bring a family member or trusted advocate to take notes and ask questions.'
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-6',
    title: 'When Should You Get a Second Opinion?',
    slug: 'when-should-you-get-a-second-opinion',
    category: 'Second Opinion',
    publishedDate: 'June 2026',
    readTime: '5 min read',
    author: 'Dr. Bhushan Parmar',
    seoTitle: 'When to Seek a Cancer Second Opinion | Dr. Bhushan Parmar',
    metaDescription:
      'Learn the crucial clinical moments to seek an expert oncology second opinion, from unconfirmed biopsies to complex treatment decisions.',
    summary:
      'Seeking a second opinion is a standard, respected practice in modern oncology that provides diagnostic certainty, verifies staging, and explores modern therapeutic options.',
    content: [
      'In medicine, few diagnoses carry as much life impact as cancer. Experiencing doubt or wanting another expert perspective is completely natural, rational, and expected. Experienced oncologists globally encourage second opinions because cancer management is complex and highly nuanced.',
      'Key scenarios when seeking a second opinion is strongly advisable include: (1) When you are newly diagnosed and want confirmation of the biopsy findings and staging; (2) When the recommended treatment involves high-risk surgery or intensive chemotherapy and you wish to explore whether less toxic targeted or immunotherapy options exist; (3) When your cancer is rare, atypical, or has recurred after initial therapy; and (4) When you feel uncomfortable or unclear about your proposed treatment plan.',
      'A second opinion can confirm that your current plan is indeed the gold standard—giving you tremendous peace of mind—or it may uncover alternative biomarker-driven approaches that had not yet been considered.',
      'Dr. Bhushan Parmar provides comprehensive, confidential second opinions with rigorous examination of all pathology, molecular, and imaging data.'
    ],
    keyTakeaways: [
      'Second opinions are a widely endorsed standard in international cancer care.',
      'They provide validation of pathology, verify staging, and evaluate precision therapy options.',
      'A second opinion never delays urgent care and gives patients confidence in their journey.'
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What should I bring to my first oncology consultation?',
    answer:
      'Please bring all relevant medical records to ensure an exhaustive evaluation: (1) All histopathology slides, tissue blocks, and biopsy reports with immunohistochemistry (IHC) markers; (2) Cross-sectional radiological imaging reports and original digital CD discs (PET-CT, CT, or MRI); (3) Complete blood counts (CBC), liver and kidney function tests; (4) Detailed surgical or prior chemotherapy discharge summaries; and (5) A list of all current medications.',
    category: 'Preparation'
  },
  {
    id: 'faq-2',
    question: 'When should a cancer patient seek a second opinion?',
    answer:
      'Seeking a second opinion is standard medical practice and advisable: (1) Following a newly confirmed cancer diagnosis before beginning invasive treatment; (2) When high-risk surgery or intensive chemotherapy is recommended, to evaluate if targeted or immunotherapy alternatives exist; (3) When the tumor is rare, aggressive, or has recurred; or (4) If you wish to verify that the staging and diagnostic tests meet current international guidelines.',
    category: 'Second Opinion'
  },
  {
    id: 'faq-3',
    question: 'What is the difference between chemotherapy, immunotherapy, and targeted therapy?',
    answer:
      'Chemotherapy uses systemic medications to destroy rapidly dividing cells throughout the body. Targeted therapy uses precision molecules or oral kinase inhibitors designed to block specific genetic alterations and abnormal proteins driving the tumor. Immunotherapy activates the patient’s own immune system (releasing immune checkpoints like PD-1/PD-L1) to recognize, attack, and eliminate cancer cells with long-term memory.',
    category: 'Treatments'
  },
  {
    id: 'faq-4',
    question: 'How is the cancer treatment plan decided?',
    answer:
      'Dr. Bhushan Parmar designs every treatment plan through an individualized, evidence-based approach integrating: (1) Anatomic cancer type and TNM clinical staging; (2) Histopathology and molecular biomarker status (e.g., EGFR, ALK, HER2, PD-L1, BRCA); (3) Overall patient health, age, and organ function performance scores; and (4) International NCCN and ESMO consensus guidelines.',
    category: 'Treatment Planning'
  },
  {
    id: 'faq-5',
    question: 'What are the side effects of chemotherapy, and how are they managed?',
    answer:
      'Common side effects include fatigue, temporary hair thinning, nausea, mild appetite reduction, and temporary dips in white blood cells. Modern oncology has revolutionized supportive care: Dr. Parmar uses advanced antiemetics (neurokinin-1 inhibitors, 5-HT3 antagonists), proactive hydration, protective premedications, and G-CSF growth factors to prevent and manage these side effects so most patients undergo therapy with minimal disruption to daily life.',
    category: 'Side Effects'
  },
  {
    id: 'faq-6',
    question: 'Is precision oncology suitable for all cancer types?',
    answer:
      'Precision oncology is suitable for any cancer where actionable genomic or molecular alterations can be detected. It is most commonly applied in non-small cell lung cancer, colorectal cancer, breast cancer, ovarian cancer, prostate cancer, melanoma, gastrointestinal stromal tumors (GIST), and hematologic malignancies. Next-Generation Sequencing (NGS) is performed to identify whether an actionable mutation exists.',
    category: 'Precision Oncology'
  },
  {
    id: 'faq-7',
    question: 'Can I consult Dr. Bhushan Parmar online?',
    answer:
      'Yes. Remote virtual consultations and tele-second-opinions are available for patients residing outside Mohali, outstation patients across North India, and international families. You can upload digital biopsy reports and scan reports securely through the second opinion portal to receive an expert medical oncology assessment.',
    category: 'Consultation'
  },
  {
    id: 'faq-8',
    question: 'Where does Dr. Bhushan Parmar practice, and how can I book an appointment?',
    answer:
      'Dr. Bhushan Parmar consults in Mohali (SAS Nagar), Punjab. In-person outpatient consultations take place Monday through Saturday between 10:00 AM and 4:00 PM. You can easily schedule an appointment via our online booking form on this website, call the OPD desk directly at +91 98765 43210, or message our oncology clinical coordination desk via WhatsApp.',
    category: 'Appointment'
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'review-1',
    patientName: 'Gurpreet Singh',
    source: 'Google Review',
    rating: 5,
    date: '3 months ago',
    condition: 'Lung Cancer Care',
    reviewText:
      'Dr. Bhushan Parmar was a beacon of clarity and compassion for our family when my father was diagnosed with advanced lung cancer. He conducted thorough molecular testing and explained targeted therapy options clearly without making false promises. My father has tolerated treatment remarkably well under his care.',
    verified: true
  },
  {
    id: 'review-2',
    patientName: 'Meenakshi Sharma',
    source: 'Google Review',
    rating: 5,
    date: '5 months ago',
    condition: 'Breast Cancer Systemic Therapy',
    reviewText:
      'Finding a doctor who listens patiently to all your fears is rare. Dr. Parmar took the time to explain the rationale for neoadjuvant chemotherapy and supported me at every step. His calm demeanor and scientific approach gave me immense courage throughout.',
    verified: true
  },
  {
    id: 'review-3',
    patientName: 'Col. R. K. Verma (Retd.)',
    source: 'Google Review',
    rating: 5,
    date: '7 months ago',
    condition: 'Multiple Myeloma Management',
    reviewText:
      'I sought a second opinion with Dr. Bhushan Parmar for my brother’s multiple myeloma. His depth of knowledge in hematologic malignancies and novel triplet regimens was immediately apparent. He reviewed every bone marrow report with meticulous attention.',
    verified: true
  },
  {
    id: 'review-4',
    patientName: 'Sunita Aggarwal',
    source: 'Google Review',
    rating: 5,
    date: '1 year ago',
    condition: 'Lymphoma Treatment',
    reviewText:
      'Dr. Parmar’s prompt response and meticulous handling of my lymphoma treatment in Mohali ensured zero delays. He managed chemotherapy side effects with proactive supportive medicines so I experienced minimal nausea. Truly a dedicated medical oncologist.',
    verified: true
  }
];

export const localSeoPages: LocalSeoPageData[] = [
  {
    slug: 'medical-oncologist-in-mohali',
    title: 'Medical Oncologist in Mohali | Dr. Bhushan Parmar',
    h1: 'Senior Consultant Medical Oncologist in Mohali',
    metaDescription:
      'Consult Dr. Bhushan Parmar, experienced Senior Medical Oncologist in Mohali. 10+ years expertise in systemic chemotherapy, immunotherapy, targeted therapy & solid tumors.',
    intro:
      'Patients and families seeking trusted, evidence-based cancer consultation in Mohali and the greater Tricity region can consult Dr. Bhushan Parmar. With advanced training from PGIMER Chandigarh and RGCI Delhi, Dr. Parmar provides world-class systemic cancer care.',
    whyChooseDrBhushan: [
      '10+ years dedicated clinical experience in medical and hematologic oncology',
      'Super-specialist training at premier national cancer institutes (DrNB Medical Oncology, PGIMER Senior Residency)',
      'Direct focus on precision medicine and genomic biomarker-guided therapy',
      'Compassionate, patient-centered communication with zero false promises'
    ],
    servicesOffered: [
      'Comprehensive Medical Oncology Consultations',
      'Daycare Chemotherapy Protocols with Modern Antiemetic Support',
      'Immunotherapy Administration & Immune Adverse Event Management',
      'Oral Targeted Therapy & Molecular TKI Monitoring',
      'Cancer Second Opinions with Thorough Report Audit'
    ],
    clinicalFocus:
      'Dedicated to elevating oncology standards in Mohali through personalized systemic protocols tailored to each patient’s unique disease biology.'
  },
  {
    slug: 'cancer-specialist-in-mohali',
    title: 'Cancer Specialist in Mohali | Dr. Bhushan Parmar',
    h1: 'Comprehensive Cancer Care Specialist in Mohali',
    metaDescription:
      'Looking for a compassionate cancer specialist in Mohali? Dr. Bhushan Parmar offers expert diagnosis, staging evaluation, and personalized systemic cancer therapy.',
    intro:
      'Navigating a cancer diagnosis requires both clinical precision and humane support. In Mohali, Dr. Bhushan Parmar brings extensive experience in guiding patients through diagnosis, second opinions, staging, and systemic treatments.',
    whyChooseDrBhushan: [
      'Rigorous multidisciplinary evaluation for solid tumors and blood malignancies',
      'Transparent treatment counseling explaining goals, benefits, and expected toxicities',
      'Coordination with surgical and radiation oncology colleagues for unified care',
      'Convenient consultation timings in Mohali with prompt appointment booking'
    ],
    servicesOffered: [
      'Solid Tumor Systemic Staging & Treatment',
      'Hematologic Oncology (Lymphoma, Myeloma, Leukemias)',
      'Supportive & Symptom Control Management',
      'Hereditary Cancer Risk & Screening Advisory'
    ],
    clinicalFocus:
      'Providing an accessible, reassuring haven for cancer patients across Punjab, Haryana, Himachal Pradesh, and Chandigarh.'
  },
  {
    slug: 'chemotherapy-in-mohali',
    title: 'Chemotherapy in Mohali | Safe & Modern Daycare Protocols',
    h1: 'Chemotherapy & Systemic Therapy in Mohali',
    metaDescription:
      'Modern, safe chemotherapy administration in Mohali under Dr. Bhushan Parmar. Advanced supportive care, minimal side effects, and evidence-based protocols.',
    intro:
      'Chemotherapy administration has advanced significantly with modern premedications, outpatient daycare units, and standardized safety protocols. Dr. Bhushan Parmar oversees chemotherapy regimens in Mohali with continuous monitoring and proactive supportive care.',
    whyChooseDrBhushan: [
      'Strict adherence to international NCCN and ESMO chemotherapy guidelines',
      'Advanced antiemetic regimens to prevent nausea and vomiting',
      'Routine pre-chemo laboratory verification to ensure safe blood counts and organ safety',
      'Outpatient daycare setup designed for comfort and rapid return home'
    ],
    servicesOffered: [
      'Neoadjuvant Chemotherapy (pre-surgical tumor downsizing)',
      'Adjuvant Chemotherapy (post-surgical recurrence reduction)',
      'Palliative Systemic Chemotherapy for advanced disease symptom control',
      'Port-a-cath maintenance and peripheral vascular access care'
    ],
    clinicalFocus:
      'Ensuring patients complete their recommended chemotherapy courses with minimal disruption to their daily lives and energy.'
  },
  {
    slug: 'immunotherapy-in-mohali',
    title: 'Immunotherapy in Mohali | Advanced Cancer Immune Treatment',
    h1: 'Cancer Immunotherapy in Mohali',
    metaDescription:
      'Consult Dr. Bhushan Parmar for advanced cancer immunotherapy in Mohali. Checkpoint inhibitors for lung, kidney, bladder, and melanoma.',
    intro:
      'Immunotherapy has revolutionized cancer treatment by reactivating the patient’s own immune defense mechanisms against cancer. Dr. Bhushan Parmar evaluates eligibility for checkpoint inhibitors and manages immunotherapy in Mohali with vigilant safety monitoring.',
    whyChooseDrBhushan: [
      'Biomarker assessment (PD-L1 expression, MSI-H/dMMR, TMB) before starting',
      'Experience in managing complex immune-related adverse events (irAEs)',
      'Combination therapy regimens (Immunotherapy + Chemotherapy or Targeted Therapy)',
      'Outpatient infusion monitoring by trained oncology nursing staff'
    ],
    servicesOffered: [
      'Anti-PD-1 / Anti-PD-L1 Checkpoint Inhibitor Infusions',
      'Combined Immuno-Chemotherapy Protocols for Advanced Lung Cancer',
      'Maintenance Immunotherapy Protocols',
      'Comprehensive Immune Toxicity Management'
    ],
    clinicalFocus:
      'Delivering durable biological cancer control while prioritizing patient safety and organ preservation.'
  },
  {
    slug: 'targeted-therapy-in-mohali',
    title: 'Targeted Therapy in Mohali | Molecular Cancer Care',
    h1: 'Targeted Cancer Therapy in Mohali',
    metaDescription:
      'Precision targeted therapy for cancer in Mohali by Dr. Bhushan Parmar. Genomic mutation profiling (EGFR, ALK, HER2, BRAF) with targeted oral and IV drugs.',
    intro:
      'Unlike broad systemic chemotherapy, targeted therapy zeroes in on specific genetic alterations fueling cancer cell growth. Dr. Bhushan Parmar specializes in testing for and managing targeted therapies for patients in Mohali.',
    whyChooseDrBhushan: [
      'Routine Next-Generation Sequencing (NGS) to detect actionable mutations',
      'Expertise in oral Tyrosine Kinase Inhibitors (TKIs) and monoclonal antibodies',
      'Proactive dermatologic and gastrointestinal side-effect management',
      'Serial biomarker tracking to detect secondary resistance mechanisms'
    ],
    servicesOffered: [
      'EGFR, ALK, and ROS1 Inhibitors for Non-Small Cell Lung Cancer',
      'Anti-HER2 Targeted Therapy for Breast and Gastric Cancers',
      'VEGF and mTOR Inhibitors for Renal and Neuroendocrine Tumors',
      'PARP Inhibitors for BRCA-mutated Ovarian and Pancreatic Cancers'
    ],
    clinicalFocus:
      'Matching the right drug to the right tumor alteration to maximize clinical response while preserving quality of life.'
  },
  {
    slug: 'breast-cancer-treatment-in-mohali',
    title: 'Breast Cancer Treatment in Mohali | Dr. Bhushan Parmar',
    h1: 'Comprehensive Breast Cancer Treatment in Mohali',
    metaDescription:
      'Expert medical oncology care for breast cancer in Mohali by Dr. Bhushan Parmar. Chemotherapy, hormone therapy, targeted therapy, and immunotherapy.',
    intro:
      'Breast cancer treatment requires an accurate molecular classification—identifying whether a tumor is ER/PR positive, HER2 positive, or Triple-Negative. Dr. Bhushan Parmar provides specialized systemic treatment planning in Mohali.',
    whyChooseDrBhushan: [
      'Biomarker-tailored protocols based on ER, PR, HER2, and Ki-67 scoring',
      'Neoadjuvant therapy protocols that facilitate breast-conserving surgery',
      'Cardiac-safe administration of Trastuzumab and Pertuzumab',
      'Endocrine therapy with bone-protective support for hormone-receptor-positive disease'
    ],
    servicesOffered: [
      'Pre-operative (Neoadjuvant) and Post-operative (Adjuvant) Chemotherapy',
      'Anti-HER2 Targeted Biologic Regimens & Antibody-Drug Conjugates',
      'CDK4/6 Inhibitors (Palbociclib, Ribociclib, Abemaciclib) for Advanced ER+ Disease',
      'Immunotherapy for Advanced Triple-Negative Breast Cancer'
    ],
    clinicalFocus:
      'Empowering women with clear, compassionate guidance and evidence-backed therapy from diagnosis to survivorship.'
  },
  {
    slug: 'lung-cancer-treatment-in-mohali',
    title: 'Lung Cancer Treatment in Mohali | Dr. Bhushan Parmar',
    h1: 'Advanced Lung Cancer Medical Oncology in Mohali',
    metaDescription:
      'Specialized systemic treatment for lung cancer in Mohali. Dr. Bhushan Parmar offers molecular mutation profiling, targeted TKIs, and immunotherapy.',
    intro:
      'With the advent of targeted therapies and immunotherapy, the landscape of lung cancer care has dramatically improved. Dr. Bhushan Parmar provides comprehensive medical oncology care for Non-Small Cell and Small Cell Lung Cancers in Mohali.',
    whyChooseDrBhushan: [
      'Comprehensive NGS panel testing for actionable driver mutations prior to systemic therapy',
      'Expert administration of 3rd generation EGFR inhibitors, ALK inhibitors, and immunotherapy',
      'Coordination of thoracic radiotherapy and minimally invasive diagnostic biopsies',
      'Pulmonary symptom management and palliative thoracic support'
    ],
    servicesOffered: [
      'Targeted Oral Therapy for EGFR, ALK, ROS1, BRAF, and MET alterations',
      'First-line and Maintenance Immunotherapy for Advanced NSCLC',
      'Chemo-radiation protocols for locally advanced disease',
      'Pleural effusion management and respiratory supportive care'
    ],
    clinicalFocus:
      'Providing prompt, biomarker-guided systemic interventions to prolong survival and maintain patient independence.'
  },
  {
    slug: 'blood-cancer-treatment-in-mohali',
    title: 'Blood Cancer Treatment in Mohali | Hematologic Oncology',
    h1: 'Blood Cancer & Hematologic Malignancies in Mohali',
    metaDescription:
      'Consult Senior Medical Oncologist Dr. Bhushan Parmar in Mohali for Lymphomas, Multiple Myeloma, Leukemias, and Myelodysplastic Syndromes.',
    intro:
      'Hematologic cancers arise in the bone marrow and lymphatic tissues, requiring prompt specialized diagnostic workup and tailored systemic therapy. Dr. Bhushan Parmar provides dedicated blood cancer care in Mohali.',
    whyChooseDrBhushan: [
      'Comprehensive experience managing hematologic malignancies from PGIMER & RGCI',
      'Close collaboration with hematopathology and flow cytometry laboratories',
      'Protocols designed to prevent tumor lysis syndrome and severe neutropenic sepsis',
      'Careful staging using modern PET-CT and bone marrow cytogenetics'
    ],
    servicesOffered: [
      'Diagnosis & Staging of Hodgkin and Non-Hodgkin Lymphomas',
      'Multi-drug Induction Regimens for Multiple Myeloma',
      'Targeted BCR-ABL and BTK Inhibitor Therapy for Leukemias',
      'Transfusion Support and Hematopoietic Growth Factor Therapy'
    ],
    clinicalFocus:
      'Offering rapid, scientifically rigorous evaluation for unexplained cytopenias, lymphadenopathy, and suspected hematologic malignancies.'
  },
  {
    slug: 'lymphoma-treatment-in-mohali',
    title: 'Lymphoma Treatment in Mohali | Dr. Bhushan Parmar',
    h1: 'Lymphoma Treatment & Chemotherapy in Mohali',
    metaDescription:
      'Experienced lymphoma care in Mohali. Dr. Bhushan Parmar treats Hodgkin & Non-Hodgkin Lymphoma with subtype-specific chemo-immunotherapy.',
    intro:
      'Lymphoma encompasses a diverse group of over 70 lymphatic malignancies. An accurate subtype diagnosis and PET-CT response evaluation are central to successful outcomes. In Mohali, Dr. Bhushan Parmar provides tailored lymphoma care.',
    whyChooseDrBhushan: [
      'Insistence on excisional lymph node biopsy for definitive immunohistochemistry',
      'Interim PET-CT guided response-adapted therapy to minimize long-term organ toxicity',
      'Experience in administering anti-CD20 monoclonal antibody immunotherapy',
      'Proactive monitoring for secondary infections and organ tolerance'
    ],
    servicesOffered: [
      'R-CHOP and intensified regimens for Diffuse Large B-Cell Lymphoma',
      'ABVD and escalated BEACOPP regimens for Hodgkin Lymphoma',
      'Targeted ADCs and oral kinase inhibitors for relapsed lymphoma',
      'Long-term survivorship and cardiovascular surveillance'
    ],
    clinicalFocus:
      'Guiding lymphoma patients through individualized therapy to achieve durable remission while safeguarding future health.'
  },
  {
    slug: 'multiple-myeloma-treatment-in-mohali',
    title: 'Multiple Myeloma Treatment in Mohali | Dr. Bhushan Parmar',
    h1: 'Multiple Myeloma & Plasma Cell Disorder Care in Mohali',
    metaDescription:
      'Consult Dr. Bhushan Parmar for modern multiple myeloma management in Mohali. Novel quadruplet regimens, bone protection, and kidney health monitoring.',
    intro:
      'Multiple Myeloma requires a multi-faceted approach addressing the clonal plasma cells while protecting the kidneys, bones, and blood counts. Dr. Bhushan Parmar provides advanced medical oncology care for myeloma patients in Mohali.',
    whyChooseDrBhushan: [
      'Use of novel triplet and quadruplet regimens (Daratumumab, Bortezomib, Lenalidomide)',
      'Bone marrow cytogenetics (FISH) to identify high-risk genomic features',
      'Dedicated nephrology collaboration for myeloma kidney protection',
      'Bone-modifying agents and fracture prevention protocols'
    ],
    servicesOffered: [
      'Induction Systemic Therapy for Newly Diagnosed Myeloma',
      'Maintenance Therapy for Sustained Remission',
      'Management of Relapsed / Refractory Disease',
      'Intravenous Bisphosphonates & Comprehensive Supportive Oncology'
    ],
    clinicalFocus:
      'Transforming myeloma into a manageable condition through modern, low-toxicity targeted regimens.'
  },
  {
    slug: 'precision-oncology',
    title: 'Precision Oncology | Genomic & Molecular Cancer Treatment',
    h1: 'Precision Oncology & Next-Generation Sequencing (NGS)',
    metaDescription:
      'Consult Dr. Bhushan Parmar for Precision Oncology. NGS genomic profiling, tumor mutational mapping, and personalized targeted therapies for solid tumors.',
    intro:
      'Precision oncology moves beyond anatomical cancer definitions to analyze the precise molecular DNA, RNA, and protein mutations driving a patient’s specific malignancy. Dr. Bhushan Parmar matches genomic alterations with FDA/NCCN-approved targeted therapies.',
    whyChooseDrBhushan: [
      'Comprehensive Next-Generation Sequencing (NGS) panels covering 500+ cancer genes',
      'Liquid biopsy capability when tissue biopsy is inaccessible or exhausted',
      'Expert interpretation of actionable mutations vs. variants of uncertain significance',
      'Personalized access to targeted kinase inhibitors and molecular basket protocols'
    ],
    servicesOffered: [
      'Comprehensive Genomic Tumor Tissue Profiling (DNA + RNA)',
      'Circulating Tumor DNA (ctDNA) Liquid Biopsy',
      'Microsatellite Instability (MSI) & Tumor Mutational Burden (TMB) Testing',
      'Targeted Molecular Inhibitor Selection & Longitudinal Response Monitoring'
    ],
    clinicalFocus:
      'Designing individualized therapies based on each tumor’s distinct molecular fingerprint to maximize efficacy and minimize off-target side effects.'
  },
  {
    slug: 'second-opinion-for-cancer',
    title: 'Second Opinion for Cancer | Expert Oncology Review in Mohali',
    h1: 'Expert Cancer Second Opinion & Pathology/Scan Audit',
    metaDescription:
      'Request an expert cancer second opinion from Senior Medical Oncologist Dr. Bhushan Parmar. Rigorous review of pathology, PET-CT scans, and systemic plans.',
    intro:
      'A second opinion in oncology can provide life-changing clarity. Whether confirming an initial diagnosis, re-evaluating staging scans, or discovering newly approved targeted treatments, Dr. Bhushan Parmar offers confidential, thorough second opinion reviews.',
    whyChooseDrBhushan: [
      'Independent, evidence-based audit of histopathology, IHC markers, and staging scans',
      'Guidance on avoiding unnecessary chemotherapy when targeted or observation protocols apply',
      'Compassionate, unhurried consultations with detailed explanation of all clinical options',
      'Virtual/remote review available for patients outside Mohali and international seekers'
    ],
    servicesOffered: [
      'Complete Histopathology & IHC Biopsy Report Re-evaluation',
      'PET-CT and Radiological Scan Review with Multidisciplinary Perspective',
      'Confirmation or Adjustment of Proposed Systemic Chemotherapy/Immunotherapy',
      'Written Second Opinion Assessment & Clear Recommendation Roadmap'
    ],
    clinicalFocus:
      'Providing peace of mind, verifying diagnostic accuracy, and ensuring patients receive the most advanced standard of care before initiating therapy.'
  }
];
