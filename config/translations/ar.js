 const ar = {
    dir: 'rtl',
    lang: 'ar',

    // Common UI
    common: {
      openMenu:       'فتح القائمة',
      navigation:     'التنقل',
      sidebarNavigation: 'القائمة الجانبية',
      signOut:        'تسجيل الخروج',
      switchToEnglish:'التبديل إلى الإنجليزية',
      switchToArabic: 'التبديل إلى العربية',
      notifications:  'الإشعارات',
      userName:       'عبد الله أحمد',
      userRole:       'مسؤول أول',
      userInitial:    'س',
      close: 'إغلاق',
      cancel: 'إلغاء',
    },

    // Auth shared
    backToLogin:    'العودة إلى تسجيل الدخول',
    email:          'البريد الإلكتروني',
    emailPh:        'name@company.com',
    loading:        'جاري التحميل...',

    // Errors
    errors: {
      emailRequired: 'البريد الإلكتروني مطلوب',
      emailInvalid: 'عنوان البريد الإلكتروني غير صالح',
      otpRequestValidation: 'البريد الإلكتروني مطلوب.',
      otpInvalid: 'رمز التحقق يجب أن يكون 6 أرقام',
      otpCodeIncorrect: 'رمز التحقق الذي أدخلته غير صحيح.',
      otpNotFound: 'لا يوجد رمز تحقق نشط لهذا البريد الإلكتروني. يرجى طلب رمز جديد.',
      otpRequestFailed: 'تعذر إرسال رمز التحقق.',
      otpVerifyFailed: 'رمز التحقق غير صحيح أو انتهت صلاحيته.',
      otpVerifyValidation: 'البريد الإلكتروني ورمز التحقق مطلوبان.',
      authApiNotConfigured: 'خدمة المصادقة غير مهيأة.',
      authTokensMissing: 'تعذر إكمال تسجيل الدخول.',
      authServiceUnavailable: 'تعذر الاتصال بخدمة المصادقة.',
      generic: 'حدث خطأ غير متوقع.',
    },

    // Login
    loginTitle:     'تسجيل الدخول إلى لوحة التحكم',
    loginSub:       'أدخل بياناتك للمتابعة',
    continueBtn:    'متابعة',
    sendingOtp:     'جاري إرسال الرمز...',
    otpTitle:       'تحقق من بريدك الإلكتروني',
    otpSub:         'أدخل رمز التحقق المرسل إلى',
    otpLabel:       'رمز التحقق',
    verifyBtn:      'تحقق ودخول',
    verifyingOtp:   'جاري التحقق...',
    resendOtp:      'إعادة إرسال الرمز',
    changeEmail:    'تغيير البريد الإلكتروني',

    // Brand panel
    dashboardTitle: 'لوحة التحكم الإدارية',
    dashboardSub:   'تحكم كامل. رؤية واضحة. إدارة احترافية.',

    // Nav sidebar
    home:           'الرئيسية',
    verification:   'المراجعة والتحقق',
    identityCheck:  'التحقق من الهوية',
    propertyCheck:  'ملكية العقار',
    lawyerApproval: 'اعتماد المحامين',
    management:     'إدارة المنصة',
    users:          'المستخدمون',
    properties:     'العقارات',
    contracts:      'العقود',
    lawyers:        'المحامون',
    financial:      'العمليات المالية',
    knowledge:      'المعرفة والتحليلات',
    auditLogs:      'سجلات التدقيق',
    activities:     'النشاطات',
    verifyCenter:   'مركز التحقق',
    system:         'النظام',
    settings:       'الإعدادات',

    // Verification Center
    verificationCenter: {
      title:             'مركز التحقق',
      breadcrumb:        'مسار الصفحة',
      types:             'أنواع التحقق',
      description:       'إدارة ومراجعة طلبات التحقق المعلقة',
      identityDetail:    'مراجعة طلب التحقق من الهوية',
      propertyDetail: 'مراجعة طلب التحقق من ملكية العقار',
      
      searchPlaceholders: {
        identity: 'بحث برقم المستخدم أو الاسم',
        property: 'بحث برقم الطلب أو اسم المالك أو المدينة',
        lawyers: 'بحث برقم الطلب أو اسم المحامي أو رقم الترخيص',
      },
      
      filter:            'تصفية',
      viewDetails:       'عرض التفاصيل',
      processing: 'جاري التنفيذ...',
      success: 'تم بنجاح',
      error: 'حدث خطأ',
      fetchError: 'تعذر تحميل طلبات التحقق من الهوية. يرجى المحاولة مرة أخرى.',
      approveSuccess: 'تم توثيق طلب التحقق من الهوية بنجاح.',
      rejectSuccess: 'تم رفض طلب التحقق من الهوية بنجاح.',
      decisionError: 'تعذر تنفيذ قرار التحقق. يرجى المحاولة مرة أخرى.',     
      approve: 'توثيق الطلب',
      reject: 'رفض الطلب',
      approveConfirmTitle: 'تأكيد توثيق الطلب',
      approveConfirmDescription: 'هل أنت متأكد من توثيق طلب التحقق هذا؟',

      rejectConfirmTitle: 'رفض طلب التحقق',
      rejectConfirmDescription: 'يرجى إدخال سبب رفض طلب التحقق قبل المتابعة.',
      rejectionReason: 'سبب الرفض',
      rejectionReasonPlaceholder: 'اكتب سبب رفض الطلب...',      
      reviewDecision: 'قرار التحقق',
      reviewDecisionDescription: 'راجع البيانات والمستندات قبل اتخاذ القرار.',
      pendingSummary: 'إجمالي الطلبات المعلقة',
      verifiedSummary:   'إجمالي الطلبات الموثقة',
      page:              'صفحة',
      of:                'من',
      previousPage:      'السابق',
      nextPage:          'التالي',
      pendingRequests:   'طلبًا بانتظار المراجعة',
      filterAll: 'الكل',
      noResults: 'لا توجد نتائج مطابقة',

      columns: {
        identity: {
          user:          'المستخدم',
          documentType:  'نوع الوثيقة',
          submittedAt:   'تاريخ التقديم',
          status:        'الحالة',
        },
        property: {
          requestOwner:  'رقم الطلب / المالك',
          propertyType:  'نوع العقار',
          area:          'المساحة م²',
          city:          'المدينة',
          submittedAt:   'تاريخ التقديم',
          status:        'الحالة',
        },
        lawyers: {
          lawyer:        'المحامي',
          licenseNumber: 'رقم الترخيص',
          submittedAt:   'تاريخ التقديم',
          specialty:     'التخصص',
          status:        'الحالة',
        },
      },

      documentTypes: {
        id:     'هوية وطنية',
        passport:       'جواز سفر',
        residenceCard:  'بطاقة إقامة',
      },

      propertyTypes: {
        residential:    'سكني',
        commercial:     'تجاري',
      },

      specialties: {
        realEstate:     'العقارات',
        contractNotary: 'توثيق العقود',
      },

      statuses: {
        pending:        'قيد المراجعة',
        approved:       'موثّق',
        rejected:       'مرفوض',
      },
      
      detail: {
        identityType: 'نوع الهوية',
        submittedAt: 'تاريخ التقديم',
        propertyOwner: 'اسم المالك',
        propertyType: 'نوع العقار',
        area: 'المساحة',
        areaUnit: 'م²',
        city: 'المدينة',
        propertyDocument: 'مستند ملكية العقار',
        propertyDeed: 'صورة الصك العقاري',

        lawyerDocument: 'مستند اعتماد المحامي',
        licenseDocument: 'صورة ترخيص المحامي',
        
        lawyerDetail: 'مراجعة طلب اعتماد المحامي',
        licenseNumber: 'رقم الترخيص',
        specialty: 'التخصص',
        phone: 'رقم الهاتف',
        email: 'البريد الإلكتروني',

        extractedData: 'البيانات المستخرجة',
        fullName: 'الاسم الكامل',
        identityNumber: 'رقم الهوية',
        birthDate: 'تاريخ الميلاد',
        nationality: 'الجنسية',

        documents: 'المستندات والصور',
        identityDocument: 'صورة مستند الهوية',
        selfie: 'صورة السيلفي',
        noImage: 'لا توجد صورة',
        imageLoadError: 'تعذر تحميل الصورة',
        
        nationalities: {
          saudi: 'سعودي',
          palestinian: 'فلسطيني',
        },

        cities: {
          gaza: 'غزة',
          khanYounis: 'خان يونس',
        },
      },
    },

    // Dashboard stats
    activeProperties: 'عقارات نشطة',
    pendingRequests:  'طلبات تحقق معلقة',
    verifiedUsers:    'مستخدمون موثّقون',
    totalUsers:       'المستخدمون',
    openIssues:       'مشاكل مفتوحة',
    aiContracts:      'عقود منشأة بالذكاء الاصطناعي',
    monthlyRevenue:   'الإيرادات الشهرية',
    saasCurrent:      'جارية',

    // Top bar
    searchPh:         'بحث: عقد، عقار، رقم مرجعي...',

    // Dashboard — Welcome
    welcomeUser:      'مرحباً، أدمن 👋',
    welcomeDate:      'الإثنين ١٢ أغسطس ٢٠٢٦',

    // Dashboard — Priority Center
    priorityCenter:   'مركز التحقق — أولوية اليوم',
    prioritySub:      'راجع طلبات التحقق قبل انتهاء المهلة الزمنية المحددة',
    avgReviewTime:    'متوسط وقت المراجعة',
    highPriority:     'أولوية عالية',
    totalPending:     'إجمالي المعلق',

    // Dashboard — Verify section
    verifyTitle:      'التحقق من الهوية',
    verifyTabProperty:'ملكية العقار',
    verifyTabLawyer:  'اعتماد المحامين',
    verifyShowAll:    'عرض جميع طلبات التحقق',
    highPriorityBadge:'أولوية عالية',
    rejectBtn:        '✕ رفض',
    approveBtn:       '✓ اعتماد سريع',

    // Dashboard — Contract pipeline
    contractLife:     'حياة العقد',
    contractSub:      'العقود النشطة عبر مراحل سير العمل',
    viewAllContracts: 'عرض جميع العقود',
    pipeline: ['مسودة','مراجعة الذكاء الاصطناعي','مراجعة المحامي','معتمد','بانتظار التوقيع','موقع','بانتظار الدفع','نشط','مكتمل','ملغى'],

    // Dashboard — Charts
    userGrowth:       'نمو المستخدمين',
    last12Months:     'آخر ١٢ شهر',
    revenueTitle:     'اتجاه الإيرادات',
    last6Months:      'آخر ٦ أشهر',
    chartVerified:    'مؤتمنون',
    chartNew:         'جدد',
    chartRevenue:     'إيرادات',

    // Dashboard — AI Monitor
    aiMonitorTitle:   'مراقبة الذكاء الاصطناعي',
    aiMonitorSub:     'حالة النظام والمعرفة القانونية (RAG)',
    aiRiskScore:      'متوسط درجة الخطورة',
    aiContractsGen:   ' عقود مُنشأة بالذكاء الاصطناعي',
    aiUptime:         'وقت تشغيل النظام',
    aiQueries:        'استفسارات هذا الشهر',
    aiKbHealth:       'سلامة قاعدة المعرفة القانونية',

    // Dashboard — Donut
    contractDist:     'توزيع حالات العقود',
    donutActive:      'نشط',
    donutLegal:       'مراجعة قانونية',
    donutPending:     'بانتظار التوقيع',
    donutDone:        'مكتمل',

    // Dashboard — Payments
    paymentsTitle:    'مدفوعات حديثة',
    paymentFee:       'دفعة عمولة',
    paymentSub:       'مكتب الراشد',
    paymentFail:      'فشل الدفع',

    // Dashboard — System alerts
    alertsTitle:      'تنبيهات النظام',
    alert1:           'ارتفاع في وقت استجابة الذكاء الاصطناعي',
    alert2:           'صيانة مجدولة للنظام — الأحد ٣٠',
    alert3:           'تم تحديث قاعدة المعرفة القانونية بنجاح',

    // Dashboard — Audit logs
    auditTitle:       'أحداث التدقيق',
    audit1Action:     'اعتمدت هوية #USR-88190',
    audit2Action:     'تعديل صلاحيات محامي — أ. فهد',
    audit3Action:     'رفض طلب ملكية عقار #PR-2201',

    // Dashboard — Users table
    usersTitle:       'المستخدمون',
    usersSubtitle:    'إدارة حسابات المستخدمين وأدوارهم',
    addUser:          ' إضافة مستخدم',
    searchUsers:      'بحث بالاسم أو البريد أو الرقم',
    filterStatus:     'الحالة',
    filterRole:       'الدور',
    filterAll:        'الكل',
    advancedFilter:   'تصفية متقدمة',
    bulkActions:      'إجراءات جماعية',
    colUser:          'المستخدم',
    colRole:          'الدور',
    colStatus:        'الحالة',
    colLastActive:    'آخر نشاط',
    showAll:          'عرض الكل',

    // User roles & statuses
    rolePropOwner:    'مالك عقار',
    roleLawyer:       'محامي',
    roleTenant:       'مستأجر',
    roleBroker:       'وسيط عقاري',
    statusVerified:   'مؤتمن',
    statusActive:     'نشط',
    statusReview:     'قيد المراجعة',
    statusRejected:   'مرفوض',

    // Dashboard — Risk contracts
    riskTitle:        'عقود ذات مخاطرة مرتفعة',
    riskSub:          'عقود تتطلب مراجعة قانونية فورية بناء على تحليل الذكاء الاصطناعي',
    colContract:      'رقم العقد',
    colLawyer:        'المحامي المسؤول',
    colRisk:          'درجة المخاطرة',
    statusLegalReview:'مراجعة قانونية',
    statusSigned:     'موقع',
    viewAll:          'عرض الكل',
  }
  export default ar