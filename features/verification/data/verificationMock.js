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
      name: {
        ar: 'أحمد محمد',
        en: 'Ahmed Mohammed',
      },
      propertyType: 'residential',
      area: 250,
      city: {
        ar: 'غزة',
        en: 'Gaza',
      },
      submittedAt: '2026-08-12T08:12:00+03:00',
      status: 'pending',
      reference: '41029384756',
      details: {
        ownerName: {
          ar: 'أحمد محمد',
          en: 'Ahmed Mohammed',
        },
        identityNumber: '1092837465',
        propertyType: 'residential',
        area: 250,
        city: {
          ar: 'غزة',
          en: 'Gaza',
        },
        documents: {
          deed: null,
        },
      },
    },
    {
      id: 'PR-4798',
      name: {
        ar: 'شركة واثق العقارية',
        en: 'Wathiq Real Estate Company',
      },
      propertyType: 'commercial',
      area: 600,
      city: {
        ar: 'خان يونس',
        en: 'Khan Younis',
      },
      submittedAt: '2026-08-12T07:41:00+03:00',
      status: 'pending',
      reference: '41028473615',
      details: {
        ownerName: {
          ar: 'شركة واثق العقارية',
          en: 'Wathiq Real Estate Company',
        },
        identityNumber: '1091827364',
        propertyType: 'commercial',
        area: 600,
        city: {
          ar: 'خان يونس',
          en: 'Khan Younis',
        },
        documents: {
          deed: null,
        },
      },
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
      details: {
        fullName: 'عبدالله الدوسري',
        licenseNumber: 'LIC-49201',
        specialty: 'realEstate',
        phone: '0590000000',
        email: 'abdullah@example.com',
        documents: {
          license: null,
        },
      },
    },
    {
      id: 'LAW-49188',
      name: 'فهد السالم',
      licenseNumber: 'LIC-49188',
      specialty: 'contractNotary',
      submittedAt: '2026-08-12T07:36:00+03:00',
      status: 'pending',
      reference: 'LIC-49188',
      details: {
        fullName: 'فهد السالم',
        licenseNumber: 'LIC-49188',
        specialty: 'contractNotary',
        phone: '0590000001',
        email: 'fahad@example.com',
        documents: {
          license: null,
        },
      },
    },
  ],
}