import { privateAxios, publicAxios } from "./helper"

//employee login
export const employeeLogin = async (loginData) => {
    const response = await publicAxios.post('/Login/Login', loginData)
    return response.data;
}


//EmployeeWiseCentre
export const employeeWiseCentre = async (EmployeeId) => {
    const response = await privateAxios.get(`/empMaster/EmployeeWiseCentre?EmplyeeId=${EmployeeId}`);
    return response.data;
}


//employee wise role
export const employeeWiseRole = async (EmployeeId) => {
    const response = await privateAxios.get(`/empMaster/EmployeeWiseRole?EmplyeeId=${EmployeeId}`);
    return response.data;
}

//get all menus
export const getAllMenus = async () => {

    const response = await privateAxios.get('/empMaster/GetAllMenu');
    return response.data;
}

//employee menu
export const getMenuDataBasedOnEmpIdAndRoleIdAndCentreId = async (EmployeeId, RoleId, CentreId) => {
    const response = await privateAxios.get(`/empMaster/EmployeeWiseMenu?EmplyeeId=${EmployeeId}&RoleId=${RoleId}&CentreId=${CentreId}`);
    return response.data;
}

//theme color
export const getThemeColor = async () => {

    const response = await privateAxios.get('/ThemeColour');
    return response.data;
}

// forgotpassword
export const forgotUserPassord = async (Username) => {
    const response = await privateAxios.post(`/Login/forgetPassword?Username=${Username}`);
    return response.data;
}


//update your password
export const updateEmployeePassword = async (userData) => {
    const response = await privateAxios.post(`/empMaster/UpdatePassword?Employeeid=${userData.Employeeid}&Password=${userData.Password}`);
    return response.data;
}


//menu master
//get all menu
export const getAllMenuApi = async () => {
    const response = await privateAxios.get('/menuMaster?select=id,menuName&$filter=(isActive eq 1 and parentId eq 0)');
    return response.data;
}

//save all menu
export const saveMenuData = async (formData) => {

    const response = await privateAxios.post('/menuMaster/SaveMenu', formData);
    return response.data;

}

//save all menu with cild menu
export const getAllMenuDataWithChildApi = async () => {

    const response = await privateAxios.get('/menuMaster');
    return response.data;

}

//UpdateMenuStatus
export const updateMenuStatusApi = async (menuId, Status) => {

    const response = await privateAxios.post(`/menuMaster/UpdateMenuStatus?menuId=${menuId}&Status=${Status}`);

    return response.data;
}


// employee page access
//get all  role
export const getAllRoleApi = async () => {

    const response = await privateAxios.get('/roleMaster?select=id,roleName&$filter=(isActive eq 1)');

    return response?.data;
}

//get all employee
export const getAllEmployeeApi = async () => {
    const response = await privateAxios.get('/empMaster?select=empId,fName,lName&$filter=(isActive eq 1)');

    return response?.data;
}

//get all submenu data based on menu
export const getAllSubMenuData = async (menuId) => {

    const response = await privateAxios.get(`/menuMaster?select=id,menuName&$filter=(isActive eq 1 and parentId eq ${menuId})`);

    return response?.data;
}

//save employee page access
export const saveEmployeePageAccessApi = async (menuData) => {

    const response = await privateAxios.post('/roleMenuAccess/SaveRoleMenuAccess', menuData);
    return response?.data;
}

// get all page menu access
export const getAllEmployeePageAccessApi = async (top, skip) => {

    const response = await privateAxios.get(`/roleMenuAccess/GetAllRoleMenuAcess?$filter=isActive eq true&$top=${top}&$skip=${skip}`);

    return response?.data;
}

//delete emp page access
export const deleteEmpPageAccessApi = async (Id) => {

    const response = await privateAxios.get(`/roleMenuAccess/EmpPageAccessRemove?Id=${Id}`);
    return response.data;
}

//========client master=========
//get billing type
export const getAllBillingTypeApi = async () => {

    const response = await privateAxios.get(`/centreBillingType?select=id,billingTypeName&$filter=(isActive eq 1)`);

    return response?.data;
}

//get centerTypeMaster
export const getCenterTypeMasterApi = async (billingtype) => {

    const response = await privateAxios.get(`/centreMaster/GetCentreType?billingtype=${billingtype}`);
    return response.data;
}

///api/centreBillingType

//get all parent center type
export const getAllParentCenterTypeApi = async () => {

    const response = await privateAxios.get('/centreMaster/GetParentCentre');

    return response.data;
}

//getAll processing lab
export const getAllProcessingLabApi = async () => {

    const response = await privateAxios.get('/centreMaster/GetProcesiongLab');
    return response.data;
}

//get all bank
export const getAllBankNameApi = async () => {

    const response = await privateAxios.get('/bank_master?select=id,bankName&$filter=(isActive eq 1)');

    return response.data;
}

//get all zone
export const getAllZoneApi = async () => {

    const response = await privateAxios.get('/zoneMaster?select=id,zone&$filter=(isActive eq 1)');

    return response.data;
}

//get all state
export const getAllStateApi = async () => {

    const response = await privateAxios.get('/stateMaster?select=id,state,zoneId&$filter=(isActive eq 1)');

    return response.data;
}

//get all district
export const getAllDistrictApi = async () => {

    const response = await privateAxios.get('/districtMaster?select=id,district,stateId&$filter=(isActive eq 1)');

    return response.data;
}

//get all cityMaster
export const getAllCityApi = async () => {

    const response = await privateAxios.get('/cityMaster');

    return response.data;
}


//get mrp center
export const getRateTypeMRPApi = async () => {

    const response = await privateAxios.get('/centreMaster/GetMRPRateType');

    return response.data;
}

// get rate type
export const getRateTypeApi = async (centerTypeId, parentCentreId) => {

    const response = await privateAxios.get(`/centreMaster/GetRateType?CentreType=${centerTypeId}&ParentCentre=${parentCentreId}`);

    return response.data;
}

//allCenterAccessData
export const getCenterAccessDataApi = async () => {

    const response = await privateAxios.get('/empMaster?select=empId,fName,lName&$filter=(isActive eq 1 and isSalesTeamMember eq 0 and autoCreated eq 0 and pro eq 0)');

    return response.data;
}

//get sales executive
export const getSalesExecutiveApi = async () => {

    const response = await privateAxios.get('/empMaster?select=empId,fname,lname&$filter=(isActive eq 1 and isSalesTeamMember eq 1)');

    return response.data;
}

//add state
export const saveStateApi = async (stateData) => {

    const response = await privateAxios.post('/stateMaster/SaveState', stateData);
    return response.data;
}

//add district
export const saveDistrictApi = async (districtData) => {

    const response = await privateAxios.post('/districtMaster/SaveDistrict', districtData);
    return response.data;
}

//add city
export const saveCityApi = async (cityData) => {

    const response = await privateAxios.post('/cityMaster/SaveCity', cityData);
    return response.data;
}

//get all document type
export const getAllDocumentApi = async () => {

    const response = await privateAxios.get('/documentTypeMaster');
    return response?.data;
}

//save client master page
export const saveCentreMasterApi = async (formData) => {

    const response = await privateAxios.post('/centreMaster/SaveCentreDetail', formData);
    return response.data;
}

//get single client master Data
export const getSingleClientMasterData = async (CentreId) => {

    const response = await privateAxios.get(`/centreMaster/GetCentreData?centreId=${CentreId}`);
    return response.data;
}

//get master client page data
export const getCentreMasterApi = async () => {

    const response = await privateAxios.get('/centreMaster');
    return response.data;
}

//update menu is active or inactive
export const saveActiveAndDiActiveClientmaster = async (CentreId, status, UserId) => {

    const response = await privateAxios.post(`/centreMaster/UpdateCentreStatus?CentreId=${CentreId}&status=${status}&UserId=${UserId}`);

    return response.data;
}

//===============employee master===================
//all emp master
export const getAllEmployeeDataApi = async () => {

    const response = await privateAxios.get('/empMaster');
    return response.data;
}

//get all title
export const getAllEmpTitleApi = async () => {

    const response = await privateAxios.get('/titleMaster?select=id,title&$filter=(isActive eq 1)');
    return response.data;
}

//get all designation
export const getDesignationApi = async () => {

    const response = await privateAxios.get(`/designationMaster?select=id,designationName&$filter=(isActive eq 1)`);

    return response.data;
}

//get all  Department
export const getAllDepartmentApi = async () => {

    const response = await privateAxios.get('/labDepartment?select=id,deptName');
    return response.data;
}

//get all centre
export const getAllCentreApi = async () => {

    const response = await privateAxios.get('/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)');
    return response.data;
}

//save employee data
export const saveEmployeeDataApi = async (employeeData) => {

    const response = await privateAxios.post('/empMaster/SaveEmployee', employeeData);

    return response.data;
}


//getemployeedata
export const getSingleEmployeeDataUsingEmpId = async (empId) => {

    const response = await privateAxios.get(`/empMaster/GetEmployeeData?EmpId=${empId}`);
    return response?.data;
}

//updateEmployeeStatusDataApi
export const updateEmployeeStatusDataApi = async (EmplyeeId, status, UserId) => {

    const response = await privateAxios.post(`/empMaster/UpdateEmployeeStatus?EmplyeeId=${EmplyeeId}&status=${status}&UserId=${UserId}`);

    return response.data;
}

//==============test lab master=================
///sampletype_master
export const getAllSampleTypeMaster = async () => {

    const response = await privateAxios.get(`/sampletype_master?select=id,sampleTypeName&$filter=(isactive eq 1)`);

    return response.data;
}

//save test lab master
export const saveTestLabMasterData = async (testLabMasterData) => {

    const response = await privateAxios.post(`/itemMaster/SaveItemMaster`, testLabMasterData);

    return response.data;
}

//get all test lab master
export const getAllLabMaterApi = async () => {
    // const response = await privateAxios.get('/itemMaster');///itemMaster/GetItemMasterAll
    const response = await privateAxios.get('/itemMaster/GetItemMasterAll');//
    return response.data;
}

//itemMaster updateItemStatus 
export const updateItemMasterStatus = async (ItemId, Status, UserId) => {
    const response = await privateAxios.post(`/itemMaster/updateItemStatus?ItemId=${ItemId}&Status=${Status}&UserId=${UserId}`);
    return response.data;
}

//get single test lab master data
export const getSingleLabTestMasterData = async (ItemId) => {
    const response = await privateAxios.get(`/itemMaster/GetItemMaster?ItemId=${ItemId}`);
    return response.data;
}

//====================Test Mapping================
// get test name
export const getAllTestNameApi = async (itemType) => {
    const response = await privateAxios.get(`/itemMaster?select=itemId,itemName&$filter=(itemType eq ${itemType} and isActive eq 1)`);
    return response.data;
}

//get all obseravation using item type
export const getAllItemObservationApi = async (itemType) => {
    const response = await privateAxios.get(`/itemMaster/GetItemObservation?itemtype=${itemType}`);
    return response.data;
}

//get grid data
export const getAllTestMapingGridDataApi = async (itemtype, itemid) => {

    const response = await privateAxios.get(`/itemMaster/GetMappedItem?itemtype=${itemtype}&itemid=${itemid}`);
    return response.data;
}

//save grid list of data
export const saveGridListOfDataApi = async (listGridData) => {
    const response = await privateAxios.post(`/ItemObservationMapping/SaveObservationMapping`, listGridData);
    return response?.data;
}

//delete grid data
export const deleteSingleGridDataApi = async (id) => {

    const response = await privateAxios.get(`/itemMaster/RemoveMapping?Id=${id}`);
    return response?.data;
}

//create new Observation
export const createNewObserVationDataApi = async (newObservationData) => {

    const response = await privateAxios.post(`/itemObservationMaster/SaveUpdateObservationMater`, newObservationData);

    return response.data;
}


//get single observation data
export const getSingleObserVationDataApi = async (id) => {

    const response = await privateAxios.get(`/itemObservationMaster?$filter=(id eq ${id})`);

    return response?.data;
}

//get all help menu
export const getAllHelpMenuDataApi = async () => {

    const response = await privateAxios.get(`/helpMenumMaster `);
    return response?.data;
}

//get grid help menu data
export const getAllGridAllHelpMenuData = async (itemId, observationId) => {

    const response = await privateAxios.post(`/helpMenuMapping/GetHelpMenuMapping?itemId=${itemId}&observationId=${observationId}`);

    return response.data;
}

//delete help maping
export const deleteHelpMapingApi = async (helpId, itemId, observationId, userId) => {

    const response = await privateAxios.post(`/helpMenuMapping/RemoveHelpMenuMapping?helpId=${helpId}&itemId=${itemId}&observationId=${observationId}&userId=${userId}`);

    return response.data;
}

//save helper nemu
export const saveHelperMenuDataApi = async (updateData) => {

    const response = await privateAxios.post('/helpMenuMapping/SaveHelpMenuMapping', updateData);
    return response?.data;
}

//save map data
export const saveMapDataApi = async (saveMapData) => {
    const response = await privateAxios.post(`/helpMenumMaster/SaveUpdateHelpMenu`, saveMapData);
    return response?.data;
}



//=================referance range===================
//get all center
export const getCenterDataForReferanceRangeApi = async () => {

    const response = await privateAxios.get(`/centreMaster?select=centreId,Companyname&$filter=(isActive eq 1 and centretypeId lt 3)`);

    return response?.data;
}

//get all machine 
export const getAllMachineDataForReferanceRangeApi = async () => {

    const response = await privateAxios.get(`/machineMaster?$filter=(isActive eq 1)`);

    return response?.data;
}

// save refrance range popup data
export const saveReferanceRangePopupApi = async (referanceData) => {

    const response = await privateAxios.post(`/observationReferenceRanges/SaveUpdateReferenceRange`, referanceData);

    return response?.data;
}

//get all data
export const getAllReferancePopupDataApi = async (observationId, gender) => {

    const response = await privateAxios.get(`/observationReferenceRanges?$filter=(observationId eq ${observationId} and gender eq '${gender}')`);
    return response?.data;
}

//delete referance
export const deleteReferancePopupDataApi = async (id) => {

    const response = await privateAxios.post(`/observationReferenceRanges/DeleteReferenceRange?Id=${id}`);
    return response?.data;
}

// =====================interpretationmaster=============
export const getAllTestNameUsingDeptId = async (id) => {

    const response = await privateAxios.get(`/itemMaster?select=itemId,itemName&$filter=(deptId eq ${id} and isActive eq 1)`);

    return response.data;
}

//save interpreation
export const saveInterpreationDataApi = async (interpreationData) => {

    const response = await privateAxios.post(`/itemInterpretation/SaveInterpatation`, interpreationData);

    return response.data;
}

// update interpreationData
export const updateInterPreationDataApi = async (itemId, centreid) => {

    const response = await privateAxios.get(`/itemInterpretation?$filter=(itemId eq ${itemId} and centreid eq ${centreid})`);

    return response?.data;
}
// ==================comment master=========
export const saveCommentMasterDataApi = async (commentMaster) => {

    const response = await privateAxios.post(`/itemCommentMaster/SaveCommentMaster`, commentMaster);
    return response.data;
}

//get all comment master data
export const getAllCommentMasterData = async (centreId, type, testid) => {
    const response = await privateAxios.post(`/itemCommentMaster/GetCommentData?CentreID=${centreId}&type=${type}&testid=${testid}`);
    return response.data;
}

//get single data
export const getSingleCommentDataApi = async (id) => {
    const response = await privateAxios.get(`/itemCommentMaster?$filter=(id eq ${id} and isActive eq 1)`);
    return response.data;
}

//update status
export const updateStatusCommentMasterData = async (commentId, status, userId) => {
    const response = await privateAxios.post(`/itemCommentMaster/updateCommentStatus?CommentId=${commentId}&Status=${status}&UserId=${userId}`);
    return response.data;
}

// ================template master=======
//get test name
export const getAllItemNameApi = async () => {

    const response = await privateAxios.get(`/itemMaster/GetItemForTemplate`);
    return response?.data;
}

//save template data
export const saveTemplateMasterDataApi = async (templateMasterData) => {

    const response = await privateAxios.post(`/itemTemplate/SaveUpdateTemplate`, templateMasterData);
    return response?.data;
}

//getAll template master data
export const getAllTemplateMasterDataApi = async (centreId, testid) => {
    const response = await privateAxios.post(`/itemTemplate/GetTemplateData?CentreID=${centreId}&testid=${testid}`);
    return response?.data;
}


//update status
export const updateStatusCommentMasterDataApi = async (id, status, userId) => {

    const response = await privateAxios.post(`/itemTemplate/UpdateTemplateStatus?id=${id}&status=${status}&Userid=${userId}`);

    return response?.data;
}

//get single data
export const getSingleTemplateDataApi = async (id) => {
    const response = await privateAxios.get(`/itemTemplate?$filter=(id eq ${id} and isActive eq 1)`);
    return response.data;
}

//=====================test approval master=================
//get employee data
export const getAllEmployeeForTestApprovalMasterApi = async () => {

    const response = await privateAxios.get(`/empmaster?select=empid,fname,lname&$filter=(isSalesTeamMember eq 0 and pro eq 0 and autoCreated eq 0 )`);

    return response?.data;
}

//get doctor data
export const getAllDoctorNameForTestApprovalMasterApi = async () => {

    const response = await privateAxios.get(`/empmaster?select=empid,fname,lname&$filter=(employeeType eq 2 or employeeType eq 3)`);

    return response?.data;
}

//save test approve master data
export const saveTestApprovalMasterData = async (testApprovalMasterData) => {

    const response = await privateAxios.post(`/doctorApprovalMaster/saveupdateDoctorApproval`, testApprovalMasterData);
    return response?.data;
}

//get all approval master data
export const getAllTestApprovalMasterApi = async () => {

    const response = await privateAxios.get(`/doctorApprovalMaster/DoctorApprovalData`);
    return response?.data;
}

//update status
export const updateTestApprovalMaster = async (id, status, userid) => {
    const response = await privateAxios.post(`/doctorApprovalMaster/updateDoctorApprovalStatus?id=${id}&status=${status}&userid=${userid}`);
    return response?.data;
}

//get single data
export const getSingleTestApprovalMasterApi = async (id) => {

    const response = await privateAxios.get(`/doctorApprovalMaster?$filter=(id eq ${id} and isActive eq 1)`);

    return response?.data;
}

//===========================machine master==============
//get all machine
export const getAllMachineMasterDataApi = async () => {

    const response = await privateAxios.get('/machineMaster?select=id,machineName&$filter=(isActive eq 1)');

    return response?.data;
}

//save machine master popup
export const saveMachineMasterPopupApi = async (saveMachineMasterPopupData) => {

    const response = await privateAxios.post(`/machineMaster/SaveMachineMaster`, saveMachineMasterPopupData);

    return response?.data;
}

//save add paramas
export const saveParamasMachineMasterDataApi = async (listOfAddParamasData) => {
    const response = await privateAxios.post(`/machineObservationMapping/SaveUpdateMapping`, listOfAddParamasData);
    return response?.data;
}

//get all grid machine master
export const getAllGridMachineMasterApi = async () => {
    const response = await privateAxios.get(`/machineObservationMapping/GetMachineMapping`);
    return response?.data;
}

//get single data
export const getSingleMachineMasterDataApi = async (assay) => {

    const response = await privateAxios.get(`/machineObservationMapping?$filter=(assay eq '${assay}')`);
    return response.data;
}

//========================Organism Antibiotic========================
//save organism antibiotic
export const saveOrganismAntiBioticMaster = async (organismAntibioticMaster) => {

    const response = await privateAxios.post(`/organismAntibioticMaster/SaveUpdateOrganismAntibiotic`, organismAntibioticMaster);

    return response.data;
}

//get all data
export const getAllOrganismAntibioticMaster = async () => {

    const response = await privateAxios.get(`/organismAntibioticMaster`);
    return response.data;
}

//update status
export const updateStatusOrganismAntibioticMasterApi = async (id, status, userId) => {

    const response = await privateAxios.post(`/organismAntibioticMaster/UpdateOrganismAntibioticStatus?id=${id}&status=${status}&userId=${userId}`);

    return response?.data;
}

//get single data
export const getgetSingleOrganismAntibioticMasterApi = async (id) => {

    const response = await privateAxios.get(`/organismAntibioticMaster?$filter=(id eq ${id} and isActive eq 1)`);

    return response?.data;
}

//get filter data
export const filterDataOrganismAntibioticMasterApi = async (microType, isActive) => {

    const response = await privateAxios.get(`/organismAntibioticMaster?$filter=(microType eq ${microType} and isActive eq ${isActive})`);

    return response?.data;
}

//get organism antibiotic tage master
export const getAllOrganismAntibioticTagMasterApi = async (id) => {

    const response = await privateAxios.get(`/organismAntibioticTagMaster/GetOrganismAntibioticeMapping?OrganismId=${id}`);

    return response?.data;
}

//save organism antibiotic tag popup
export const saveOrganismAntiBioticMasterTagPopupApi = async (updateData) => {

    const response = await privateAxios.post(`/organismAntibioticTagMaster/OrganismAntibioticeMapping`, updateData);

    return response?.data;
}

//=========================Formula master====================
//get profile data
export const getAllProfileDataBasedOnItemType = async () => {

    const response = await privateAxios.get(`/itemMaster?select=itemid,itemname&$filter=(itemType eq 2)`);

    return response?.data;
}

//get observation based on profile id
export const getAllObservationData = async (id) => {

    const response = await privateAxios.get(`/itemMaster/GetProfileObservation?itemId=${id}`);

    return response?.data;
}

//get calculator data
export const getCalCulatorData = async (itemId, observationId) => {

    const response = await privateAxios.get(`/formulaMaster?$filter=(itemId eq ${itemId} and observationId eq ${observationId})`);

    return response?.data;
}

//save fast formula master data
export const saveFormulaMasterData = async (formulaData) => {

    const response = await privateAxios.post(`/formulaMaster/SaveUpdateFormula`, formulaData);

    return response?.data;
}

//==================rate type master==============
//save rate type master
export const saveRateTypeMaster = async (rateTypeId, rateTypeName, CentreId, userId) => {

    const response = await privateAxios.post(`/rateTypeMaster/SaveUpdateRateType?rateTypeId=${rateTypeId}&rateTypeName=${rateTypeName}&CentreId=${CentreId}&userId=${userId}`);

    return response?.data;
}

//get all rate type
export const getAllRateTypeMasterApi = async () => {

    const response = await privateAxios.post(`/rateTypeTagging/GetRatetypeTagging`);

    return response?.data;
}

//update status
export const updateStatusForRateTypeMasterData = async (id, status, userId) => {

    const response = await privateAxios.post(`/rateTypeMaster/UpdateRateTypeStatus?id=${id}&status=${status}&userId=${userId}`);

    return response?.data;
}

//==========upload head========
export const getCenterDataForUploadReportLetterHeadApi = async () => {

    const response = await privateAxios.post(`/centreMaster?Select=reportHeader,reciptHeader,reciptFooter,reporrtHeaderHeightY,patientYHeader,barcodeXPosition,barcodeYPosition,qrCodeXPosition,qrCodeYPosition,isQRheader,isBarcodeHeader,footerHeight,nabLxPosition,nabLyPosition,docSignYPosition,receiptHeaderY&$filter=(Centreid eq 1)`);

    return response?.data;
}

export const getAllUploadReportLetterHeadApi = async (centreId) => {
    const response = await privateAxios.post(`/centreMaster?Select=centreid,reportHeader,reciptHeader,reciptFooter,showISO,showBackcover,reportBackImage,reporrtHeaderHeightY,patientYHeader,barcodeXPosition,barcodeYPosition,qrCodeXPosition,qrCodeYPosition,isQRheader,isBarcodeHeader,footerHeight,nabLxPosition,nabLyPosition,docSignYPosition,receiptHeaderY&$filter=(isactive eq ${centreId})`);

    return response?.data;
}

export const saveUploadReportLetterHeadApi = async () => {

}

//============= patient registration =================

export const getAllCentreForPatientRegistrationData = async (EmployeeId, billingtype) => {

    const response = await privateAxios.get(`/empMaster/BillingTypeWiseCentre?EmplyeeId=${EmployeeId}&Billingtype=${billingtype}`)

    return response?.data;
}


export const getAllRateTypeForPatientRegistrationData = async (centreId) => {

    const response = await privateAxios.get(`/centreMaster/GetRatetypeCentreWise?CentreId=${centreId?.centreId}`);

    return response?.data;
}

//save refer dr.
export const saveReferDrApi = async (addReferDrData) => {

    const response = await privateAxios.post(`/doctorReferalMaster/SaveUpdateReferDoctor`, addReferDrData);

    return response?.data;
}

//get all refer dr. data
export const getAllReferDrApi = async () => {

    const response = await privateAxios.get(`/doctorReferalMaster?select=doctorId,doctorName&$filter=(isActive eq 1 and type eq 1)`);

    return response?.data;
}


//get all refer lab data
export const getAllReferLabApi = async () => {

    const response = await privateAxios.get(`/doctorReferalMaster?select=doctorId,doctorName&$filter=(isActive eq 1 and type eq 2)`);

    return response?.data;
}

//get all invastigation
export const getAllInvestiGationApi = async (rateTypeId) => {


    const response = await privateAxios.get(`/tnx_BookingItem/GetitemDetailRate?ratetype=${rateTypeId}`);

    return response?.data;
}

//get all Investigation grid data
export const getAllInvestigationGridApi = async (rateId, itemId) => {

    const response = await privateAxios.get(`/tnx_BookingItem/GetitemDetail?ratetype=${rateId}&itemId=${itemId}`);

    return response?.data;
}

//get all discount type
export const getAllDisCountType = async () => {

    const response = await privateAxios.get(`/discountTypeMaster?select=id,type&$filter=(isActive eq 1)`);

    return response?.data;
}

//get all discount resion
export const getAllDicountReasionApi = async () => {

    const response = await privateAxios.get(`/discountReasonMaster?select=id,discountReasonName&$filter=(isActive eq 1)`);

    return response?.data;
}

//get all discount approved by
export const getAllDiscountApprovedBy = async () => {

    const response = await privateAxios.get(`/empMaster?select=empId,fName,lName&$filter=(isDiscountAppRights eq 1)`);

    return response?.data;
}

//save patient registaration
export const savePatientRegistrationDataApi = async (patientRegistrationData) => {

    const response = await privateAxios.post(`/tnx_BookingPatient/SavePatientRegistration`, patientRegistrationData);

    return response?.data;
}


//get edit info
export const getSingleEditInfoApi = async (searchVal) => {

    const response = await privateAxios.get(`/tnx_BookingItem/GetPatientEditInfo?searchValue=${searchVal}`);

    return response.data;
}

//save edit info data
export const updateEditInfoApi = async (updatedEditInfo) => {

    const response = await privateAxios.post(`/tnx_BookingItem/UpdatePatientinfo`, updatedEditInfo);

    return response?.data;
}

//get edit info
export const getSingleEditTestApi = async (searchVal) => {

    const response = await privateAxios.get(`/tnx_BookingItem/GetPatientEditTest?searchValue=${searchVal}`);

    return response.data;
}


//get old patient
export const getOldPatientApi = async (searchVal) => {

    const response = await privateAxios.get(`/tnx_BookingItem/GetOldPatient?searchValue=${searchVal}`);

    return response.data;
}

//get single patient in old patient popup
export const getSingleOldPatientDataInOldPatientPopupApi = async (val) => {

    const response = await privateAxios.get(`/tnx_BookingItem/GetOldPatient/${val}`);

    return response.data;
}
//=====================patient record===============
export const getSearchBtnColorCodeInPatientRecordApi = async () => {

    const response = await privateAxios.get(`/LegendColorMaster?select=id,colourCode,contantName&$filter=(id eq 13 or id eq 14 or id eq 15 or id eq 16 and isActive eq 1)`);

    return response?.data;
}


//search grid data
export const getGridDataBasedOnPatientRecordData = async (patientRecordData) => {
    const response = await privateAxios.post(`/tnx_Booking/GetPatientData`, patientRecordData);
    return response?.data;

}

export const handelDownloadCashReceiptApi = async (workId) => {
    const response = await privateAxios.get(
        `/tnx_BookingPatient/GetPatientReceipt?workorderid=${workId}`,
        { responseType: "blob" } // Ensure response is a file
    );
    return response;
};


export const handelDownloadMRPreceiptApi = async (workId) => {
    const response = await privateAxios.get(
        `/tnx_BookingPatient/GetPatientMRPBill?workorderid=${workId}`,
        { responseType: "blob" } // Ensure response is a file
    );
    return response;
};


export const handelDownloadInfoOrDocumentApi = async (workId) => {
    const response = await privateAxios.get(
        `/tnx_BookingPatient/GetPatientMRPBill?workorderid=${workId}`,
        { responseType: "blob" } // Ensure response is a file
    );
    return response;
};

//=====================result tracking========================
export const getAllResultTrackinDataApi = async (recordTrackinData) => {

    const response = await privateAxios.post('/tnx_BookingItem/GetResultEntryAllData', recordTrackinData);

    return response?.data;
}

//======================feed back=============
export const getAllEmojiColorCodeApi = async () => {

    const response = await privateAxios.get(`/LegendColorMaster?select=id,colourCode,contantName&$filter=(id eq 26 or id eq 27 or id eq 28 or id eq 29 or id eq 30 or id eq 31)`);

    return response?.data;
}