export const menuDataHeaderList = ['SNO.', 'Menu Name', 'Navigation URL', 'Display Sequence', 'Active', 'Parent Menu', 'Action'];

export const employeePageAccessData = ['SNO', 'Role', 'Employee Name', 'Menu', 'Sub Menu', 'Remove Access'];

export const clientMasterAccessPage = ['Pre Printed Barcode', 'Active', 'Show Backcover', 'Show ISO', 'Reception area', 'Waiting area', 'Watercooler', 'AC'];


export const clientMasterHeaderList = ['SNo.', '⁠Centre Code', '⁠Centre Type', '⁠Centre Name', 'Centre Category', '⁠Mobile No.', '⁠Email Add.', 'Action'];

export const employeeMasterHeaderList = ['SNo.', 'Emp Code', 'Employee Name', '⁠Mobile No.', 'Email', 'Action'];

export const allItemTypeInLabTestMaster = [
  { id: 1, value: 'Test' },
  { id: 2, value: 'Profile' },
  { id: 3, value: 'Package' }
];

export const allSampleVolumeInLabTestMaster = ['1 ml', '2 ml', '3 ml', '4 ml', '5 ml', '7 ml', '10 ml', '15 ml', '20 ml', '25 ml', '40 ml'];

export const colorsAndTypesInLabTestMaster = [
  { id: 1, value: 'Black' },
  { id: 2, value: 'Blue' },
  { id: 3, value: 'Green' },
  { id: 4, value: 'Grey' },
  { id: 5, value: 'Light Blue' },
  { id: 6, value: 'Light Green' },
  { id: 7, value: 'Orange' },
  { id: 8, value: 'Other' },
  { id: 9, value: 'Purple' },
  { id: 10, value: 'Red' },
  { id: 11, value: 'Separator with Heparin' },
  { id: 12, value: 'Separator Tube with Heparin' },
  { id: 13, value: 'VTM' },
  { id: 14, value: 'Yellow' }
];

export const reportTypesInLabTestMaster = [
  { id: 1, value: 'Numeric' },
  { id: 2, value: 'TextReport' },
  { id: 3, value: 'Radiology' },
  { id: 4, value: 'Microbiology' },
  { id: 5, value: 'HistoReport' },
  { id: 6, value: 'Not Require' }
];

export const gendersInLabTestMaster = ['Both (F/M)', "Male", "Female", "Transgender"];

export const labTestMasterHeaderData = ["Sr.No.", "Item Type", "Test Code", "Test Name", "Department", "Sample Type", "Report Type", "Action"];


export const testMappingHeader = ['SR.No.', 'ID', 'Test Name', 'Header', 'Bold', 'Critical', 'PrintSeparate', 'Show Report', 'DLC Check', 'InterPertation', 'Ref.Range', 'Help Menu', 'Remove', 'Edit'];

export const testMappingHeaderWithItemTypeIsPackage = ['SR.No.', 'ID', 'Test Name', 'PrintSeparate', 'Remove', 'Edit'];

export const testMappingRoundUp = [-1, 0, 1, 2, 3, 4];

export const referanceRangePopUpHeaderInTestMapping = ["FromAge", "ToAge", "MinValue", "MaxValue", "MinCritical", "MaxCritical", "MinAutoApp.", "MaxAutoApp.", "Unit", "Ref.Range", "DefaultValue", "ADD",];


export const allFontForCustomeEditor = ["Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Gill Sans",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Palatino",
  "Bookman",
  "Courier New",
  "Lucida Console",
  "Monaco",
  "Consolas",
  "Comic Sans MS",
  "Brush Script MT",
  "Impact",
  "Papyrus",
];

export const fontSizesForCustome = [
  { key: "1", value: "Small", size: "12px" },
  { key: "2", value: "Normal", size: "16px" },
  { key: "3", value: "Large", size: "20px" },
  { key: "4", value: "Larger", size: "24px" },
  { key: "5", value: "Extra Large", size: "30px" },
  { key: "6", value: "Huge", size: "36px" },
  { key: "7", value: "Maximum", size: "48px" },
];

export const commentMasterHeader = ['ID', 'Centre Name', 'Type', 'Item/Observation', 'Comment Name', 'Comment Data', 'Actions']

export const templateMasterHeader = ['SR.No.', '⁠Centre Name', 'Test Name', 'Template Name', 'Gender', 'Template Data', 'Actions'];
//SrNo,Centre,Doctor,Employee,Sign Image,Action(Edit/Deactivate)
export const testApprovalMasterHeader = ['SR.NO.', 'Centre Name', 'Employee', 'Doctor', 'Sign Image', 'Actions']

export const machineMasterHeaderData = ['SR.NO.', 'Machine Name', 'Suffix', 'Assay No', 'RoundUp', 'Orderable', 'Test', 'Actions']


export const formulaMasterHeader = ['SR.NO.', 'Test Name'];

export const formulaOrganismAnitibioticHeaderMicroTypeOrganism = ['SR.NO.', 'Micro Type', 'Organism Antibiotic', 'Machine Code', 'Actions', 'Tag'];

export const formulaOrganismAnitibioticHeaderMicroTypeAntibiotic = ['SR.NO.', 'Micro Type', 'Organism Antibiotic', 'Machine Code', 'Actions'];

export const organismAntibioticMasterTagPopupHeader = [' ', 'SR.NO.', 'Antibiotic']

// export const dataformulaMasterHeader = [
//     { 'id': 1, 'name': 'test1' },
//     { 'id': 2, 'name': 'test2' },
//     { 'id': 3, 'name': 'test3' },
//     { 'id': 4, 'name': 'test4' },
//     { 'id': 5, 'name': 'test5' },
//     { 'id': 6, 'name': 'test6' },
//     { 'id': 7, 'name': 'test7' },
//     { 'id': 8, 'name': 'test8' },
//     { 'id': 9, 'name': 'test9' },
//     { 'id': 10, 'name': 'test10' },
//     { 'id': 11, 'name': 'test11' },
//     { 'id': 12, 'name': 'test12' },
//     { 'id': 13, 'name': 'test13' },
//     { 'id': 14, 'name': 'test14' },
//     { 'id': 15, 'name': 'test15' },
//     { 'id': 16, 'name': 'test16' },
//     { 'id': 17, 'name': 'test17' },
//     { 'id': 18, 'name': 'test18' },
//     { 'id': 19, 'name': 'test19' },
//     { 'id': 20, 'name': 'test20' },
//     { 'id': 21, 'name': 'test21' },
//     { 'id': 22, 'name': 'test22' },
//     { 'id': 23, 'name': 'test23' },
//     { 'id': 24, 'name': 'test24' },
//     { 'id': 25, 'name': 'test25' },
//     { 'id': 26, 'name': 'test26' },
//     { 'id': 27, 'name': 'test27' },
//     { 'id': 28, 'name': 'test28' },
//     { 'id': 29, 'name': 'test29' },
//     { 'id': 30, 'name': 'test30' },
//     { 'id': 31, 'name': 'test31' },
//     { 'id': 32, 'name': 'test32' },
//     { 'id': 33, 'name': 'test33' },
//     { 'id': 34, 'name': 'test34' },
//     { 'id': 35, 'name': 'test35' },
//     { 'id': 36, 'name': 'test36' },
//     { 'id': 37, 'name': 'test37' },
//     { 'id': 38, 'name': 'test38' },
//     { 'id': 39, 'name': 'test39' },
//     { 'id': 40, 'name': 'test40' },
//     { 'id': 41, 'name': 'test41' },
//     { 'id': 42, 'name': 'test42' },
//     { 'id': 43, 'name': 'test43' },
//     { 'id': 44, 'name': 'test44' },
//     { 'id': 45, 'name': 'test45' },
//     { 'id': 46, 'name': 'test46' },
//     { 'id': 47, 'name': 'test47' },
//     { 'id': 48, 'name': 'test48' },
//     { 'id': 49, 'name': 'test49' },
//     { 'id': 50, 'name': 'test50' },
//     { 'id': 51, 'name': 'test51' },
//     { 'id': 52, 'name': 'test52' },
//     { 'id': 53, 'name': 'test53' },
//     { 'id': 54, 'name': 'test54' },
//     { 'id': 55, 'name': 'test55' },
//     { 'id': 56, 'name': 'test56' },
//     { 'id': 57, 'name': 'test57' },
//     { 'id': 58, 'name': 'test58' },
//     { 'id': 59, 'name': 'test59' },
//     { 'id': 60, 'name': 'test60' },
//     { 'id': 61, 'name': 'test61' },
//     { 'id': 62, 'name': 'test62' },
//     { 'id': 63, 'name': 'test63' },
//     { 'id': 64, 'name': 'test64' },
//     { 'id': 65, 'name': 'test65' },
//     { 'id': 66, 'name': 'test66' },
//     { 'id': 67, 'name': 'test67' },
//     { 'id': 68, 'name': 'test68' },
//     { 'id': 69, 'name': 'test69' },
//     { 'id': 70, 'name': 'test70' },
//     { 'id': 71, 'name': 'test71' },
//     { 'id': 72, 'name': 'test72' },
//     { 'id': 73, 'name': 'test73' },
//     { 'id': 74, 'name': 'test74' },
//     { 'id': 75, 'name': 'test75' },
//     { 'id': 76, 'name': 'test76' },
//     { 'id': 77, 'name': 'test77' },
//     { 'id': 78, 'name': 'test78' },
//     { 'id': 79, 'name': 'test79' },
//     { 'id': 80, 'name': 'test80' },
//     { 'id': 81, 'name': 'test81' },
//     { 'id': 82, 'name': 'test82' },
//     { 'id': 83, 'name': 'test83' },
//     { 'id': 84, 'name': 'test84' },
//     { 'id': 85, 'name': 'test85' },
//     { 'id': 86, 'name': 'test86' },
//     { 'id': 87, 'name': 'test87' },
//     { 'id': 88, 'name': 'test88' },
//     { 'id': 89, 'name': 'test89' },
//     { 'id': 90, 'name': 'test90' },
//     { 'id': 91, 'name': 'test91' },
//     { 'id': 92, 'name': 'test92' },
//     { 'id': 93, 'name': 'test93' },
//     { 'id': 94, 'name': 'test94' },
//     { 'id': 95, 'name': 'test95' },
//     { 'id': 96, 'name': 'test96' },
//     { 'id': 97, 'name': 'test97' },
//     { 'id': 98, 'name': 'test98' },
//     { 'id': 99, 'name': 'test99' },
//     { 'id': 100, 'name': 'test100' }
// ];

export const nablMasterHeader = ['Booking Centre', 'Department', 'Investigation', 'Logo', 'Action']
export const testOrderingHeader = ['SR.NO.', 'Test Name', 'Action'];

export const outHouseProcessMasterHeader = ['SR.NO.', 'Booking Centre', 'Processing Centre', 'Department', 'Investigation', 'Action'];

export const outSourceProcessMasterHeader = ['SR.NO.', 'Booking Centre', 'Department', 'Investigation', 'Lab', 'Rate', 'Action'];


export const rateTypeMasterHeader = ['SR.NO.', 'Rate Type', 'Centre', 'Action'];

export const rateTypeWiseRateListHeader = [' ', 'Item ID', 'Item Code', 'Item Name', 'Departement', 'View', 'Map', 'Offerrate'];

export const testWiseRateListHeader = [' ', 'Item Code', 'Item Name', 'Rate Type', 'MRP', 'Rate'];

export const uploadReportLetterHead = ['SR.NO', 'Centre', 'Report Header Height Y', 'Patient Y Header', 'BarCode X Position', 'QR Code Y Position', 'QR Header', 'Barcode Header', 'Footer Height', 'Receipt Header', 'Receipt Footer', 'R.WaterMark', 'Letter Head', 'Action'];

export const rateListUploadByExcelHeader = ['Item ID', 'Item Code', 'Item Name', , 'Departement', 'MRP', 'Offerrate', 'Action'];


export const patientRegistrationInvestigation = ['Item', 'View', 'MRP', 'Gross Amt.', 'Discount', 'Net Amt.', 'Sample Type', 'Bar Code', 'Delivery Date', 'IsUrgent', 'Delete'];

export const patientRegistrationPaymentMode = ['Cash Amt.', 'Credit/DebitCard Amt.', 'Last 4 Digit Of Card', 'Bank', 'UPI Amt.', 'UPI Type'];

export const paymentModes = [
  { value: "1", label: "Cash" },
  { value: "2", label: "Debit/Credit Card" },
  { value: "3", label: "UPI" },
];


export const patientRegistrationoldPatient = ['Select', 'Patient Id', 'Patient Name', 'Age', 'Gender', 'Mobile', 'Email', 'Reg. Date']


export const dummyDataForpatientRegistrationoldPatient = [
  {
    "PatientId": "P001",
    "PatientName": "John Doe",
    Age: 30,
    Gender: "Male",
    Mobile: "9876543210",
    Email: "johndoe@gmail.com",
    "RegDate": "2025-01-01",
  },
  {
    "PatientId": "P002",
    "PatientName": "Jane Smith",
    Age: 25,
    Gender: "Female",
    Mobile: "8765432109",
    Email: "janesmith@gmail.com",
    "RegDate": "2025-01-02",
  },
  {
    "PatientId": "P003",
    "PatientName": "Robert Brown",
    Age: 40,
    Gender: "Male",
    Mobile: "7654321098",
    Email: "robertbrown@gmail.com",
    "RegDate": "2025-01-03",
  },
  {
    "PatientId": "P004",
    "PatientName": "Emily Davis",
    Age: 35,
    Gender: "Female",
    Mobile: "6543210987",
    Email: "emilydavis@gmail.com",
    "RegDate": "2025-01-04",
  },
  {
    "PatientId": "P005",
    "PatientName": "Michael Wilson",
    Age: 50,
    Gender: "Male",
    Mobile: "5432109876",
    Email: "michaelwilson@gmail.com",
    "RegDate": "2025-01-05",
  },
  {
    "PatientId": "P006",
    "PatientName": "Sophia Miller",
    Age: 28,
    Gender: "Female",
    Mobile: "4321098765",
    Email: "sophiamiller@gmail.com",
    "RegDate": "2025-01-06",
  },
  {
    "PatientId": "P007",
    "PatientName": "James Taylor",
    Age: 32,
    Gender: "Male",
    Mobile: "3210987654",
    Email: "jamestaylor@gmail.com",
    "RegDate": "2025-01-07",
  },
  {
    "PatientId": "P008",
    "PatientName": "Isabella Martinez",
    Age: 45,
    Gender: "Female",
    Mobile: "2109876543",
    Email: "isabellamartinez@gmail.com",
    "RegDate": "2025-01-08",
  },
  {
    "PatientId": "P009",
    "PatientName": "William Hernandez",
    Age: 55,
    Gender: "Male",
    Mobile: "1098765432",
    Email: "williamhernandez@gmail.com",
    "RegDate": "2025-01-09",
  },
  {
    "PatientId": "P010",
    "PatientName": "Mia Garcia",
    Age: 22,
    Gender: "Female",
    Mobile: "0987654321",
    Email: "miagarcia@gmail.com",
    "RegDate": "2025-01-10",
  },
];


export const doctorShareMasterHeaderApi = ['SR. NO.', 'Departement', 'Percentage(%)', 'Amount'];

