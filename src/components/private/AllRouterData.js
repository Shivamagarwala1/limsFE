import React from "react";

export const allRoutes = [
    {
        path: "/LIMS/MenuMaster",
        component: React.lazy(() => import('../pages/adminctrlmaster/MenuMaster')),
        exact: true,
    },
    {
        path: "/LIMS/EmployeePageAccess",
        component: React.lazy(() => import("../pages/adminctrlmaster/employee/EmployeePageAccess")),
        exact: true,
    },
    {
        path: "/LIMS/RolePageBind",
        component: React.lazy(() => import("../pages/adminctrlmaster/RolePageBind")),
        exact: true,
    },

    {
        path: "/LIMS/clientmaster",
        component: React.lazy(() => import("../pages/adminctrlmaster/client/ClientMaster")),
        exact: true,
    },
    {
        path: "/LIMS/employee-master",
        component: React.lazy(() => import("../pages/adminctrlmaster/employee/EmployeeMaster")),
        exact: true,
    },
    {
        path: "/LIMS/UniversalMaster",
        component: React.lazy(() => import("../pages/adminctrlmaster/UniversalMaster/UniversalMaster")),
        exact: true,
    },
    {
        path: "/LIMS/RateTypeMaster",
        component: React.lazy(() => import("../pages/adminctrlmaster/RateTypeMaster")),
        exact: true,
    },
    {
        path: "/LIMS/RateTypeWiseRateList",
        component: React.lazy(() => import("../pages/adminctrlmaster/RateTypeWiseRateList")),
        exact: true,
    },
    {
        path: "/LIMS/TestWiseRateList",
        component: React.lazy(() => import("../pages/adminctrlmaster/TestWiseRateList")),
        exact: true,
    },
    {
        path: "/LIMS/UploadReportLetterHead",
        component: React.lazy(() => import("../pages/adminctrlmaster/UploadReportLetterHead")),
        exact: true,
    },
    {
        path: "/LIMS/RateListUploadByExcel",
        component: React.lazy(() => import("../pages/adminctrlmaster/RateListUploadByExcel")),
        exact: true,
    },

    {
        path: "/LIMS/lab-test-master",
        component: React.lazy(() => import("../pages/labctrlmaster/LabTestMaster")),
        exact: true,
    },
    {
        path: "/LIMS/test-mapping",
        component: React.lazy(() => import("../pages/labctrlmaster/TestMapping")),
        exact: true,
    },
    {
        path: "/LIMS/interpretation-master",
        component: React.lazy(() => import("../pages/labctrlmaster/InterpretationMaster")),
        exact: true,
    },
    {
        path: "/LIMS/comment-master",
        component: React.lazy(() => import("../pages/labctrlmaster/CommentMaster")),
        exact: true,
    },
    {
        path: "/LIMS/template-master",
        component: React.lazy(() => import("../pages/labctrlmaster/TemplateMaster")),
        exact: true,
    },
    {
        path: "/LIMS/test-approval-master",
        component: React.lazy(() => import("../pages/labctrlmaster/TestApprovalMaster")),
        exact: true,
    },
    {
        path: "/LIMS/MachineMaster",
        component: React.lazy(() => import("../pages/labctrlmaster/MachineMaster")),
        exact: true,
    },
    {
        path: "/LIMS/FormulaMaster",
        component: React.lazy(() => import("../pages/labctrlmaster/FormulaMaster")),
        exact: true,
    },
    {
        path: "/LIMS/OrganismAntibioticMaster",
        component: React.lazy(() => import("../pages/labctrlmaster/OrganismAntibioticMaster")),
        exact: true,
    },
    {
        path: "/LIMS/NABLMaster",
        component: React.lazy(() => import("../pages/labctrlmaster/NABLMaster")),
        exact: true,
    },
    {
        path: "/LIMS/TestOrdering",
        component: React.lazy(() => import("../pages/labctrlmaster/TestOrdering")),
        exact: true,
    },
    {
        path: "/LIMS/OutHouseProcessMaster",
        component: React.lazy(() => import("../pages/labctrlmaster/OutHouseProcessMaster")),
        exact: true,
    },
    {
        path: "/LIMS/OutSourceProcessMaster",
        component: React.lazy(() => import("../pages/labctrlmaster/OutSourceProcessMaster")),
        exact: true,
    },
    {
        path: "/LIMS/LabUniversalMaster",
        component: React.lazy(() => import("../pages/labctrlmaster/LabUniversalMaster/LabUniversalMaster")),
        exact: true,
    },
    {
        path: "/LIMS/PaymentVerification",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/PaymentVerification")),
        exact: true,
    },
    {
        path: "/LIMS/CreateInvoice",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/CreateInvoice")),
        exact: true,
    },
    {
        path: "/LIMS/ClientPay",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/ClientPay")),
        exact: true,
    },
    {
        path: "/LIMS/PrintInvoice",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/PrintInvoice")),
        exact: true,
    },
    {
        path: "/LIMS/LedgerStatement",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/LedgerStatement")),
        exact: true,
    },
    {
        path: "/LIMS/ChangePayMode",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/ChangePayMode")),
        exact: true,
    },
    {
        path: "/LIMS/RateList",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/RateList")),
        exact: true,
    },
    {
        path: "/LIMS/PaymentDepositeReport",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/PaymentDepositeReport")),
        exact: true,
    },
    {
        path: "/LIMS/ChangeBillingCentre",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/ChangeBillingCentre")),
        exact: true,
    },
    {
        path: "/LIMS/PatientWiseBulkSettelment",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/PatientWiseBulkSettelment")),
        exact: true,
    },
    {
        path: "/LIMS/UpdateRateAfterBooking",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/UpdateRateAfterBooking")),
        exact: true,
    },
    {
        path: "/LIMS/LedgerStatus",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/LedgerStatus")),
        exact: true,
    },
    {
        path: "/LIMS/AppointmentBooking",
        component: React.lazy(() => import("../pages/adminctrlmaster/Appointment/AppointmentBooking")),
        exact: true,
    },
    {
        path: "/LIMS/AppointmentStatus",
        component: React.lazy(() => import("../pages/adminctrlmaster/Appointment/AppointmentStatus")),
        exact: true,
    },
    {
        path: "/LIMS/TimeSlotMaster",
        component: React.lazy(() => import("../pages/adminctrlmaster/Appointment/TimeSlotMaster")),
        exact: true,
    },
    {
        path: "/LIMS/PheleboRouteMaster",
        component: React.lazy(() => import("../pages/adminctrlmaster/Appointment/PheleboRouteMaster")),
        exact: true,
    },
    {
        path: "/LIMS/PheleboRouteMap",
        component: React.lazy(() => import("../pages/adminctrlmaster/Appointment/PheleboRouteMap")),
        exact: true,
    },
    {
        path: "/LIMS/Phelebodashboard",
        component: React.lazy(() => import("../pages/adminctrlmaster/Appointment/Phelebodashboard")),
        exact: true,
    },
    {
        path: "/LIMS/PhlebotomyCollection",
        component: React.lazy(() => import("../pages/adminctrlmaster/Appointment/PhlebotomyCollection")),
        exact: true,
    },
    {
        path: "/LIMS/ShowCommission",
        component: React.lazy(() => import("../pages/adminctrlmaster/Commission/ShowCommission")),
        exact: true,
    },
    {
        path: "/LIMS/CommissionLedger",
        component: React.lazy(() => import("../pages/adminctrlmaster/Commission/CommissionLedger")),
        exact: true,
    },
    {
        path: "/LIMS/TestSampleReport-UD",
        component: React.lazy(() => import("../pages/adminctrlmaster/Test Portfolio/TestSampleReport")),
        exact: true,
    },
    {
        path: "/LIMS/DownloadDOS",
        component: React.lazy(() => import("../pages/adminctrlmaster/Test Portfolio/DownloadDOS")),
        exact: true,
    },
    {
        path: "/LIMS/SampleCollection",
        component: React.lazy(() => import("../pages/adminctrlmaster/Sample Gathering/SampleCollection")),
        exact: true,
    },
    {
        path: "/LIMS/SampleLogisticTransfer",
        component: React.lazy(() => import("../pages/adminctrlmaster/Sample Gathering/SampleLogisticTransfer")),
        exact: true,
    },
    {
        path: "/LIMS/SampleLogisticReceive",
        component: React.lazy(() => import("../pages/adminctrlmaster/Sample Gathering/SampleLogisticReceive")),
        exact: true,
    },
    {
        path: "/LIMS/LogisticDispatchReport",
        component: React.lazy(() => import("../pages/adminctrlmaster/Sample Gathering/LogisticDispatchReport")),
        exact: true,
    },
    {
        path: "/LIMS/ReportDispatch",
        component: React.lazy(() => import("../pages/adminctrlmaster/AccessionDesk/ReportDispatch")),
        exact: true,
    },
    {
        path: "/LIMS/PatientRecord",
        component: React.lazy(() => import("../pages/adminctrlmaster/AccessionDesk/PatientRecord")),
        exact: true,
    },
    {
        path: "/LIMS/ChangeBarcode",
        component: React.lazy(() => import("../pages/adminctrlmaster/AccessionDesk/ChangeBarcode")),
        exact: true,
    },
    {
        path: "/LIMS/Discount-Refund",
        component: React.lazy(() => import("../pages/adminctrlmaster/AccessionDesk/DiscountRefund")),
        exact: true,
    },
    {
        path: "/LIMS/PatientRegistration",
        component: React.lazy(() => import("../pages/adminctrlmaster/AccessionDesk/PatientRegistration.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/HistoResultTrack",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/HistoResultTrack")),
        exact: true,
    },
    {
        path: "/LIMS/MicroResultTrack",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/MicroResultTrack")),
        exact: true,
    },
    {
        path: "/LIMS/ResultTrack",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/ResultTrack")),
        exact: true,
    },
    {
        path: "/LIMS/WorkSheet",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/WorkSheet")),
        exact: true,
    },
    {
        path: "/LIMS/AmendmentReport",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/AmendmentReport")),
        exact: true,
    },
    {
        path: "/LIMS/MachineResult",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/MachineResult")),
        exact: true,
    },
    {
        path: "/LIMS/TATMaster",
        component: React.lazy(() => import("../pages/labctrlmaster/TATMaster")),
        exact: true,
    },
    {
        path: "/LIMS/TATReport",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/TATReport")),
        exact: true,
    },
    {
        path: "/LIMS/TransferOutSource",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/TransferOutSource")),
        exact: true,
    },
    {
        path: "/LIMS/ReportDateChange",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/ReportDateChange")),
        exact: true,
    },
    {
        path: "/LIMS/CreateDoctor",
        component: React.lazy(() => import("../pages/adminctrlmaster/Doctor Account/CreateDoctor")),
        exact: true,
    },
    {
        path: "/LIMS/DoctorShareMaster",
        component: React.lazy(() => import("../pages/adminctrlmaster/Doctor Account/DoctorShareMaster")),
        exact: true,
    },
    {
        path: "/LIMS/DoctorIPreport",
        component: React.lazy(() => import("../pages/adminctrlmaster/Doctor Account/DoctorIPreport")),
        exact: true,
    },

    {
        path: "/LIMS/TicketSupport",
        component: React.lazy(() => import("../pages/adminctrlmaster/ticketmanagements/TicketSupport")),
        exact: true,
    },
    {
        path: "/LIMS/FeedbackDashboard",
        component: React.lazy(() => import("../pages/feedback/FeedbackDashboard")),
        exact: true,
    },
    {
        path: "/LIMS/ChangeReportType-Method",
        component: React.lazy(() => import("../pages/adminctrlmaster/ProcessingHub/ChangeReportTypeMethod.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/GenerateCertificate",
        component: React.lazy(() => import("../pages/adminctrlmaster/GenerateCertificate.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/TestEvaluate",
        component: React.lazy(() => import("../pages/adminctrlmaster/TestEvaluate/TestEvaluate.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/StoreItemMaster",
        component: React.lazy(() => import("../pages/adminctrlmaster/Store/StoreItemMaster.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/Indent",
        component: React.lazy(() => import("../pages/adminctrlmaster/Store/Indent.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/ViewIndent",
        component: React.lazy(() => import("../pages/adminctrlmaster/Store/ViewIndent.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/MarketingDashboardMaster",
        component: React.lazy(() => import("../pages/adminctrlmaster/MarketingDashboardMaster.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/MarketingDashboard",
        component: React.lazy(() => import("../pages/adminctrlmaster/Dashboard/MarketingDashboard.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/UserCollectionReport",
        component: React.lazy(() => import("../pages/adminctrlmaster/MIS Report/UserCollectionReport.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/DiscountReport",
        component: React.lazy(() => import("../pages/adminctrlmaster/MIS Report/DiscountReport.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/DoctorBusinessReport",
        component: React.lazy(() => import("../pages/adminctrlmaster/MIS Report/DoctorBusinessReport.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/ClientBusinessRevenue",
        component: React.lazy(() => import("../pages/adminctrlmaster/MIS Report/ClientBusinessRevenue")),
        exact: true,
    },
    {
        path: "/LIMS/MasterMarketingDashboard",
        component: React.lazy(() => import("../pages/adminctrlmaster/MarketingDashboardMaster.jsx")),
        exact: true,
    },
    {
        path: "/LIMS/TransferRatelist",
        component: React.lazy(() => import("../pages/adminctrlmaster/Account/TransferRatelist")),
        exact: true,
    },
    {
        path: "/LIMS/SalesBusinessReport",
        component: React.lazy(() => import("../pages/adminctrlmaster/sales/SalesBusinessReport")),
        exact: true,
    },
];


