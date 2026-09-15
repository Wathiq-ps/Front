export const verificationRequests = {
  identity: [
    {
      id: 'USR-9283',
      name: {
        ar: 'أحمد محمد',
        en: 'Ahmed Mohammed',
      },
      documentType: 'nationalId',
      submittedAt: '2026-08-12T08:18:00+03:00',
      status: 'pending',
      reference: '1092837465',
      details: {
        fullName: 'أحمد محمد',
        identityNumber: '1092837465',
        birthDate: '1985-05-14',
        nationality: 'palestinian',
        documents: {
          identity: null,
          selfie: null,
        },        
      },      
    },
    {
      id: 'USR-9271',
      name: {
        ar: 'سارة خالد',
        en: 'Sarah Khalid',
      },
      documentType: 'passport',
      submittedAt: '2026-08-12T07:54:00+03:00',
      status: 'pending',
      reference: '1091827364',
      details: {
        fullName: 'سارة خالد',
        identityNumber: '1091827364',
        birthDate: '1990-08-21',
        nationality: 'saudi',
        documents: {
          identity: null,
          selfie: null,
        },        
      },
    },
    {
      id: 'USR-9258',
      name: {
        ar: 'محمد علي',
        en: 'Mohammed Ali',
      },
      documentType: 'residenceCard',
      submittedAt: '2026-08-12T07:36:00+03:00',
      status: 'pending',
      reference: '1087264519',
      details: {
        fullName: 'محمد علي',
        identityNumber: '1087264519',
        birthDate: '1988-03-11',
        nationality: 'saudi',
        documents: {
        identity: null,
        selfie: null,
      },
      },
    },
  ],

  property: [
    {
      id: 'PR-4812',
      name: 'أحمد محمد',
      propertyType: 'residential',
      area: 250,
      city: 'غزة',
      submittedAt: '2026-08-12T08:12:00+03:00',
      status: 'pending',
      reference: '41029384756',
    },
    {
      id: 'PR-4798',
      name: 'شركة واثق العقارية',
      propertyType: 'commercial',
      area: 600,
      city: 'خان يونس',
      submittedAt: '2026-08-12T07:41:00+03:00',
      status: 'pending',
      reference: '41028473615',
    },
  ],

  lawyers: [
    {
      id: 'LAW-49201',
      name: 'عبدالله الدوسري',
      licenseNumber: 'LIC-49201',
      specialty: 'realEstate',
      submittedAt: '2026-08-12T08:05:00+03:00',
      status: 'pending',
      reference: 'LIC-49201',
    },
    {
      id: 'LAW-49188',
      name: 'فهد السالم',
      licenseNumber: 'LIC-49188',
      specialty: 'contractNotary',
      submittedAt: '2026-08-12T07:36:00+03:00',
      status: 'pending',
      reference: 'LIC-49188',
    },
  ],
}