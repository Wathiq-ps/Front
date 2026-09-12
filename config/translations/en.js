  const en = {
    dir: 'ltr',
    lang: 'en',

    // Common UI
    common: {
      openMenu:       'Open menu',
      navigation:     'Navigation',
      sidebarNavigation: 'Sidebar navigation',
      signOut:        'Sign out',
      switchToEnglish:'Switch to English',
      switchToArabic: 'Switch to Arabic',
      notifications:  'Notifications',
      userName:       'Abdullah Ahmed',
      userRole:       'Senior Admin',
      userInitial:    'S',
    },

    // Auth shared
    backToLogin:    'Back to Login',
    email:          'Email',
    emailPh:        'name@company.com',
    loading:        'Loading...',

    // Errors
    errors: {
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email address',
      otpCodeIncorrect: 'The code you entered is incorrect.',
      otpRequestValidation: 'Email is required.',
      otpInvalid: 'Verification code must be 6 digits',
      otpNotFound: 'No active verification code was found. Please request a new one.',
      otpRequestFailed: 'Unable to send the verification code.',
      otpVerifyFailed: 'The verification code is invalid or has expired.',
      otpVerifyValidation: 'Email and verification code are required.',
      authApiNotConfigured: 'Authentication service is not configured.',
      authTokensMissing: 'Unable to complete authentication.',
      authServiceUnavailable: 'Unable to connect to the authentication service.',
      generic: 'Something went wrong.',
    },

    // Login
    loginTitle:     'Sign in to Dashboard',
    loginSub:       'Enter your credentials to continue',
    continueBtn:    'Continue',
    sendingOtp:     'Sending code...',
    otpTitle:       'Verify your email',
    otpSub:         'Enter the verification code sent to',
    otpLabel:       'Verification code',
    verifyBtn:      'Verify & Sign In',
    verifyingOtp:   'Verifying...',
    resendOtp:      'Resend code',
    changeEmail:    'Change email',

    // Brand panel
    dashboardTitle: 'Admin Dashboard',
    dashboardSub:   'Full control. Clear vision. Professional management.',

    // Nav sidebar
    home:           'Home',
    verification:   'Review & Verification',
    identityCheck:  'Identity Check',
    propertyCheck:  'Property Ownership',
    lawyerApproval: 'Lawyer Approval',
    management:     'Platform Management',
    users:          'Users',
    properties:     'Properties',
    contracts:      'Contracts',
    lawyers:        'Lawyers',
    financial:      'Financial Ops',
    knowledge:      'Knowledge & Analytics',
    auditLogs:      'Audit Logs',
    activities:     'Activities',
    verifyCenter:   'Verify Center',
    system:         'System',
    settings:       'Settings',

    // Verification Center
    verificationCenter: {
      title:             'Verification Center',
      breadcrumb:        'Breadcrumb',
      types:             'Verification types',
      description:       'Manage and review pending verification requests',
      searchPlaceholder: 'Search by request ID or name',
      filter:            'Filter',
      viewDetails:       'View details',
      pendingRequests:   'requests pending review',

      columns: {
        identity: {
          user:          'User',
          documentType:  'Document type',
          submittedAt:   'Submitted date',
          priority:      'Priority',
          status:        'Status',
        },
        property: {
          requestOwner:  'Request ID / Owner',
          propertyType:  'Property type',
          area:          'Area m²',
          city:          'City',
          submittedAt:   'Submitted date',
          status:        'Status',
        },
        lawyers: {
          lawyer:        'Lawyer',
          licenseNumber: 'License number',
          submittedAt:   'Submitted date',
          specialty:     'Specialty',
          status:        'Status',
        },
      },

      documentTypes: {
        nationalId:     'National ID',
        passport:       'Passport',
        residenceCard:  'Residence card',
      },

      propertyTypes: {
        residential:    'Residential',
        commercial:     'Commercial',
      },

      specialties: {
        realEstate:     'Real estate',
        contractNotary: 'Contract notarization',
      },

      priorities: {
        high:           'High',
        medium:         'Medium',
        low:            'Low',
      },

      statuses: {
        pending:        'Under review',
        approved:       'Verified',
        rejected:       'Rejected',
      },
    },

    // Dashboard stats
    activeProperties: 'Active Properties',
    pendingRequests:  'Pending Verification',
    verifiedUsers:    'Verified Users',
    totalUsers:       'Users',
    openIssues:       'Open Issues',
    aiContracts:      'AI-Generated Contracts',
    monthlyRevenue:   'Monthly Revenue',
    saasCurrent:      'Current',

    // Top bar
    searchPh:         'Search: contract, property, ref number...',

    // Dashboard — Welcome
    welcomeUser:      'Welcome, Admin 👋',
    welcomeDate:      'Monday, August 12, 2026',

    // Dashboard — Priority Center
    priorityCenter:   'Verification Center — Today\'s Priority',
    prioritySub:      'Review verification requests before the deadline expires',
    avgReviewTime:    'Avg Review Time',
    highPriority:     'High Priority',
    totalPending:     'Total Pending',

    // Dashboard — Verify section
    verifyTitle:      'Identity Verification',
    verifyTabProperty:'Property Ownership',
    verifyTabLawyer:  'Lawyer Approval',
    verifyShowAll:    'View all verification requests',
    highPriorityBadge:'High Priority',
    rejectBtn:        '✕ Reject',
    approveBtn:       '✓ Quick Approve',

    // Dashboard — Contract pipeline
    contractLife:     'Contract Lifecycle',
    contractSub:      'Active contracts across workflow stages',
    viewAllContracts: 'View all contracts',
    pipeline: ['Draft','AI Review','Lawyer Review','Approved','Awaiting Signature','Signed','Awaiting Payment','Active','Completed','Cancelled'],

    // Dashboard — Charts
    userGrowth:       'User Growth',
    last12Months:     'Last 12 months',
    revenueTitle:     'Revenue Trend',
    last6Months:      'Last 6 months',
    chartVerified:    'Verified',
    chartNew:         'New',
    chartRevenue:     'Revenue',

    // Dashboard — AI Monitor
    aiMonitorTitle:   'AI Monitor',
    aiMonitorSub:     'System status & legal knowledge base (RAG)',
    aiRiskScore:      'Avg Risk Score',
    aiContractsGen:   'AI-Generated Contracts',
    aiUptime:         'System Uptime',
    aiQueries:        'Queries This Month',
    aiKbHealth:       'Legal Knowledge Base Health',

    // Dashboard — Donut
    contractDist:     'Contract Status Distribution',
    donutActive:      'Active',
    donutLegal:       'Legal Review',
    donutPending:     'Awaiting Signature',
    donutDone:        'Completed',

    // Dashboard — Payments
    paymentsTitle:    'Recent Payments',
    paymentFee:       'Commission Payment',
    paymentSub:       'Al-Rashed Office',
    paymentFail:      'Payment Failed',

    // Dashboard — System alerts
    alertsTitle:      'System Alerts',
    alert1:           'AI response time spike detected',
    alert2:           'Scheduled maintenance — Sunday 30th',
    alert3:           'Legal knowledge base updated successfully',

    // Dashboard — Audit logs
    auditTitle:       'Audit Events',
    audit1Action:     'Approved identity #USR-88190',
    audit2Action:     'Updated lawyer permissions — A. Fahad',
    audit3Action:     'Rejected property ownership #PR-2201',

    // Dashboard — Users table
    usersTitle:       'Users',
    usersSubtitle:    'Manage user accounts and roles',
    addUser:          ' Add User',
    searchUsers:      'Search by name, email or ID',
    filterStatus:     'Status',
    filterRole:       'Role',
    filterAll:        'All',
    advancedFilter:   'Advanced Filter',
    bulkActions:      'Bulk Actions',
    colUser:          'User',
    colRole:          'Role',
    colStatus:        'Status',
    colLastActive:    'Last Active',
    showAll:          'View All',

    // User roles & statuses
    rolePropOwner:    'Property Owner',
    roleLawyer:       'Lawyer',
    roleTenant:       'Tenant',
    roleBroker:       'Real Estate Broker',
    statusVerified:   'Verified',
    statusActive:     'Active',
    statusReview:     'Under Review',
    statusRejected:   'Rejected',

    // Dashboard — Risk contracts
    riskTitle:        'High-Risk Contracts',
    riskSub:          'Contracts requiring immediate legal review based on AI analysis',
    colContract:      'Contract No.',
    colLawyer:        'Responsible Lawyer',
    colRisk:          'Risk Score',
    statusLegalReview:'Legal Review',
    statusSigned:     'Signed',
    viewAll:          'View All',
  }
  export default en