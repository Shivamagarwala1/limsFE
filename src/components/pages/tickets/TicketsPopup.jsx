import React, { useEffect, useRef, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { LuNotebookPen } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import FromHeader from '../../global/FormHeader'
import { CustomTextBox } from '../../global/CustomTextBox';
import CustomDropdown from '../../global/CustomDropdown';
import { useFormattedDateTime } from '../../customehook/useDateTimeFormate';
import Draggable from 'react-draggable';
import CustomFileUpload from '../../global/CustomFileUpload';
import { toast } from 'react-toastify';
import CustomFormButton from '../../global/CustomFormButton';
import { FaHandshake, FaSpinner } from 'react-icons/fa6';
import { usePostData, useRetrieveData } from '../../../service/service';
export default function TicketsPopup() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);

    const [showhelpAndSupportPopup, setShowhelpAndSupportPopup] = useState(false);
    const [ticketsPopupData, setTicketsPopupData] = useState({
        ticketType: '',
        ticketSubject: '',
        ticketDescription: '',
        priority: '',
        uploadDocument: '',
        deliveryDate: useFormattedDateTime()
    })

    const [isButtonClick, setIsButtonClick] = useState(0);
    const allTicketType = useRetrieveData();
    const postDataForTicketsPopup = usePostData();


    const handleClick = (user) => {
        if (user?.allowTicketRole === parseInt(user?.defaultRole)) {
            setShowhelpAndSupportPopup(!showhelpAndSupportPopup);
        } else {
            toast.error('Access Denied! You do not have permission.');
        }
    };




    useEffect(() => {

        const getAllData = async () => {
            try {
                await allTicketType.fetchDataFromApi('/SupportTicketType?select=id,ticketType&$filter=(isActive eq 1)')
            } catch (error) {
                toast.error(error?.message);
            }
        }

        if (showhelpAndSupportPopup) {
            getAllData()
        }

    }, [showhelpAndSupportPopup])




    const handelOnChangeTicketPopup = (e) => {
        setTicketsPopupData((preventData) => ({
            ...preventData,
            [e.target.name]: e.target.value
        }))
    }

    const handelImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileType = file.type;

            // Handle image files
            // if (fileType.startsWith("image/")) {
            //     const reader = new FileReader();
            //     reader.onloadend = () => {
            //         setPatientRegistrationData((prevData) => ({
            //             ...prevData,
            //             uploadDocument: reader.result, // Store base64 image
            //             fileType: "image", // Store file type
            //         }));
            //     };
            //     reader.readAsDataURL(file);
            // }
            // Handle PDF files
            if (fileType === "application/pdf") {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setTicketsPopupData((prevData) => ({
                        ...prevData,
                        uploadDocument: reader.result, // Store base64 PDF
                        fileType: "pdf", // Store file type
                    }));
                };
                reader.readAsDataURL(file);
            }
            // Handle unsupported files
            else {
                toast.info("Please upload a valid PDF file.")
            }
        }
    };


    const onSubmitForSaveRolePageBindData = async () => {

        setIsButtonClick(1);

        const updatedData = {
            "id": 0,
            "clientId": parseInt(user?.employeeId),
            "clientName": user?.name,
            "ticketTypeId": parseInt(ticketsPopupData?.ticketType),
            "priority": parseInt(ticketsPopupData?.priority),
            "ticketSubject": ticketsPopupData?.ticketSubject,
            "task": `${ticketsPopupData?.ticketDescription}`,
            "document": ticketsPopupData?.uploadDocument,
            "createDate": ticketsPopupData?.deliveryDate,
            "assignedTo": 0,
            "assignedBy": 0,
            "assignedDate": new Date('0001-01-01T00:00:00Z') // Correct format
                .toLocaleString("en-US", { hour12: true })
                .replace(",", "")
                .replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) =>
                    `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
                ),
            "isAssigned": 0,
            "isCompleted": 0,
            "completedBy": 0,
            "completedDate": new Date('0001-01-01T00:00:00Z') // Correct format
                .toLocaleString("en-US", { hour12: true })
                .replace(",", "")
                .replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) =>
                    `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
                ),
            "deliverydate": new Date('0001-01-01T00:00:00Z') // Correct format
                .toLocaleString("en-US", { hour12: true })
                .replace(",", "")
                .replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) =>
                    `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
                ),
            "actionTaken": "",
            "isReopen": 0,
            "reopenBy": 0,
            "reopenDate": new Date('0001-01-01T00:00:00Z') // Correct format
                .toLocaleString("en-US", { hour12: true })
                .replace(",", "")
                .replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) =>
                    `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
                ),
            "reopenReason": "",
            roleId: parseInt(user?.defaultRole)
        }

        try {
            const response = await postDataForTicketsPopup.postRequestData('/supportTicket/saveUpdateSupportTicket', updatedData);

            if (response?.success) {
                toast.success(response?.message);
                setTicketsPopupData({
                    ticketType: 0,
                    ticketSubject: '',
                    ticketDescription: '',
                    priority: 0,
                    uploadDocument: '',
                })
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            toast.error(error?.message)
        }

        setIsButtonClick(0)
    }
    const dragRef = useRef(null);

    return (
        <>
            <Draggable nodeRef={dragRef} >
                <div ref={dragRef} className='fixed bottom-52 right-3  p-2 rounded-full z-30 shadow-2xl cursor-pointer' title='Support Ticket'
                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                    onClick={() => handleClick(user)}
                // onClick={() => setShowhelpAndSupportPopup(!showhelpAndSupportPopup)}
                >
                    <LuNotebookPen className='text-2xl' />
                </div>
            </Draggable>



            {
                showhelpAndSupportPopup === true && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-32 z-50 shadow-2xl bg-white rounded-lg    animate-slideDown ">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md text-xs'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Support Ticket
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => {
                                        setShowhelpAndSupportPopup(!showhelpAndSupportPopup)
                                        // 
                                        //  setTicketsPopupData({
                                        //     ticketType: '',
                                        //     ticketSubject: '',
                                        //     ticketDescription: '',
                                        //     priority: '',
                                        //     uploadDocument: '',
                                        //     deliveryDate: useFormattedDate()
                                        // })
                                    }}
                                />
                            </div>

                            <FromHeader
                                headerData='Support Ticket'
                            />

                            <form autoComplete='off'>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mt-2 mb-1 items-center  mx-1">

                                    <div className='relative flex-1 mt-[1.9px]'>
                                        <CustomDropdown
                                            name="ticketType"
                                            label="Ticket Type"
                                            value={ticketsPopupData?.ticketType || ''}
                                            options={[
                                                { label: 'Select Ticket Type', value: '', disabled: true },
                                                ...allTicketType?.data?.map(item => ({
                                                    label: item?.ticketType,
                                                    value: parseInt(item?.id),
                                                })),
                                            ]}
                                            onChange={(e) => handelOnChangeTicketPopup(e)}
                                            defaultIndex={0}
                                            activeTheme={activeTheme}
                                            isMandatory={!Boolean(ticketsPopupData?.ticketType)}
                                        />

                                    </div>


                                    <div className='relative flex-1 mt-[1.9px]'>
                                        <CustomDropdown
                                            name="priority"
                                            label="Select Priority"
                                            value={ticketsPopupData?.priority || ''}
                                            options={[
                                                { label: 'Select Option', value: '', disabled: true },
                                                { label: 'Normal', value: '1' },
                                                { label: 'Medium', value: '2' },
                                                { label: 'High', value: '3' },
                                            ]}
                                            onChange={(e) => handelOnChangeTicketPopup(e)}
                                            defaultIndex={0}
                                            activeTheme={activeTheme}
                                            isMandatory={!Boolean(ticketsPopupData?.priority)}
                                        />

                                    </div>

                                    <div className="relative flex-1 ">
                                        <CustomTextBox
                                            type="alphabetandcharWithSpace"
                                            name="ticketSubject"
                                            value={ticketsPopupData?.ticketSubject || ''}
                                            onChange={(e) => handelOnChangeTicketPopup(e)}
                                            label="Ticket Subject"
                                            isDisabled={false}
                                            maxLength={50}
                                            allowSpecialChars={false}
                                            isMandatory={!Boolean(ticketsPopupData?.ticketSubject)}
                                            decimalPrecision={4}
                                        />
                                    </div>

                                    <div className="relative flex-1">
                                        <CustomFileUpload
                                            value={ticketsPopupData?.uploadDocument}
                                            handelImageChange={handelImageChange}
                                            activeTheme={activeTheme}
                                            fileType="pdf"
                                        />
                                    </div>


                                    <div className='flex gap-[0.25rem]'>
                                        <div className="relative flex-1">
                                            <CustomFormButton
                                                activeTheme={activeTheme}
                                                text="Save"
                                                icon={FaSpinner}
                                                isButtonClick={isButtonClick}
                                                loadingButtonNumber={1} // Unique number for the first button
                                                onClick={() => onSubmitForSaveRolePageBindData()} // Pass button number to handler
                                            />
                                        </div>

                                        <div className="relative flex-1">
                                        </div>
                                    </div>

                                    <div className="">
                                        {/* <CustomTextBox
                                            type="alphabetandchar"
                                            name="ticketDescription"
                                            value={ticketsPopupData?.ticketDescription || ''}
                                            onChange={(e) => handelOnChangeTicketPopup(e)}
                                            label="Ticket Description"
                                            isDisabled={false}
                                            maxLength={2}
                                            allowSpecialChars={false}
                                            isMandatory={!Boolean(ticketsPopupData?.ticketDescription)}
                                            decimalPrecision={4}
                                        /> */}
                                    </div>


                                </div>

                                <div className='mx-1 mb-2'>
                                    <textarea
                                        rows={4}
                                        maxLength={500}
                                        name='ticketDescription'
                                        onChange={handelOnChangeTicketPopup}
                                        className='w-full rounded border-[1.5px] px-1 text-sm font-semibold h-[5.4rem] outline-none bg-white text-[#795548]'
                                    />

                                </div>
                            </form>

                            <div className='border-b-[1px] -mt-2  flex justify-center items-center h-6 rounded-b-md text-xs font-semibold'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            >
                                <div>
                                    Thank You For Your Cooperation . . . . !
                                </div>

                                <div>
                                    <FaHandshake className='text-xl ml-2' />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
