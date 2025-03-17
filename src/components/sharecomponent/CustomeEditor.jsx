import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaBold, FaCode, FaCopy, FaCut, FaEraser, FaEye, FaFile, FaFileImage, FaFont, FaItalic, FaLink, FaPaste, FaRedoAlt, FaStrikethrough, FaSubscript, FaSuperscript, FaTable, FaUndoAlt, FaVideo } from 'react-icons/fa';
import { MdDeselect, MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight, MdFullscreen, MdKeyboardVoice, MdOutlineFormatListBulleted, MdOutlineFormatListNumbered, MdOutlineFormatSize, MdOutlineFormatTextdirectionLToR, MdSelectAll, MdWaterDrop } from 'react-icons/md';
import { RiLineHeight } from 'react-icons/ri'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { allFontForCustomeEditor, fontSizesForCustome } from '../listData/listData';
// import { bold } from 'jodit/types/plugins/bold/bold';

export default function CustomeEditor({ onContentChange, value }) {

    const activeTheme = useSelector((state) => state.theme.activeTheme);


    const editorRef = useRef(null);
    const recognitionRef = useRef(null); //Ref. for SpeechRecognition instance

    const [content, setContent] = useState(""); // Maintain content in state
    const [openPreview, setOpenPreview] = useState(false);
    const [isListening, setIsListening] = useState(false); // Track listening state
    const [showInText, setShowInText] = useState(false);
    const [originalHtml, setOriginalHtml] = useState(""); // Store original HTML content

    const [isOrderedList, setIsOrderedList] = useState(false);
    const [showListDropDown, setShowListDropDown] = useState(0);

    // Apply formatting to the selected text
    const applyStyle = (command) => {

        if (command === 'bold' || command === 'italic' || command === 'strikeThrough' || command === 'superscript' || command === 'subscript' || command === 'justifyFull' || command === 'justifyCenter' || command === 'justifyLeft' || command === 'justifyRight' || command === 'insertUnorderedList' || command === 'insertOrderedList') {

            document.execCommand(command, false, null);  // Use `execCommand` for inline styling

            //revove ul to ol and ol to ul
            if (command === "insertOrderedList") {
                setIsOrderedList(true);
                editorRef.current.classList.add("list-decimal");
                editorRef.current.classList.remove("list-disc");
            } else if (command === "insertUnorderedList") {
                setIsOrderedList(false);
                editorRef.current.classList.add("list-disc");
                editorRef.current.classList.remove("list-decimal");
            }
        } else if (command === 'clear') {
            if (editorRef.current) {
                editorRef.current.innerHTML = ""; // Clear editor content
                setContent(""); // Clear state
            }
        } else if (command === 'cut' || command === 'copy' || command === 'paste' || command === 'selectAll' || command === 'undo' || command === 'redo') {
            document.execCommand(command);
        } else if (command === 'deSelectAll') {
            const selection = window.getSelection();
            selection.removeAllRanges();
        } else if (command === 'preview') {
            setOpenPreview(!openPreview)
        } else if (command === 'audio') {

            if (!isListening) {
                if (recognitionRef.current) {
                    recognitionRef.current.start();
                    setIsListening(true);
                }
            } else {
                if (recognitionRef.current) {
                    recognitionRef.current.stop();
                    setIsListening(false);
                }
            }
        }
    };

    const applyFont = (fontName) => {
        if (editorRef.current) {
            editorRef.current.focus(); // Ensure editor is focused
            document.execCommand("fontName", false, fontName); // Apply font
        }
    };

    const applyFontSize = (size) => {
        if (editorRef.current) {
            editorRef.current.style.fontSize = size;
        }
    };


    // Initialize SpeechRecognition
    const initializeSpeechRecognition = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = "en-US"; // Set language
            recognition.interimResults = true; // Show interim results
            recognition.continuous = true; // Keep recognizing continuously

            recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map((result) => result[0].transcript)
                    .join("");
                if (editorRef.current) {
                    editorRef.current.innerHTML = transcript; // Update editor content
                    setContent(transcript); // Update state
                }
            };

            recognition.onerror = (event) => {
                console.error("SpeechRecognition error:", event.error);
            };

            recognition.onend = () => {
                setIsListening(false); // Update state when recognition ends
            };

            recognitionRef.current = recognition;
        } else {
            alert("Speech recognition is not supported in this browser.");
        }
    };


    const handleOuterClick = (e) => {
        // Focus on the contentEditable div when the outer container is clicked
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };


    // Function to insert a table
    const insertTable = () => {
        if (editorRef.current) {
            const tableHtml = generateTableHtml(3, 3); // Change 3, 3 to desired rows and columns
            document.execCommand("insertHTML", false, tableHtml); // Insert the generated table HTML
        }
    };

    // Generate table HTML dynamically (blank cells)
    const generateTableHtml = (rows, cols) => {
        let table = '<table class="border-2 border-collapse  w-full">';
        for (let i = 0; i < rows; i++) {
            table += '<tr class="border-2 ">';
            for (let j = 0; j < cols; j++) {
                table += '<td class="border px-4 py-2 text-center"></td>';
            }
            table += "</tr>";
        }
        table += "</table><br/>";
        return table;
    };


    useEffect(() => {
        initializeSpeechRecognition();
    }, []);

    // Update state when content changes
    const handleInput = () => {
        if (editorRef.current) {
            const updatedContent = editorRef.current.innerHTML; // Capture plain text from the contentEditable div
            setContent(updatedContent); // Update local state
            onContentChange(updatedContent); // Pass data to the parent
        }
    };

    // Sync content and cursor position with parent component
    // useEffect(() => {
    //     // Only update content if the parent value is different
    //     if (editorRef.current && editorRef.current.innerHTML !== value) {
    //         editorRef.current.innerHTML = value; // Update content inside contentEditable
    //     }
    // }, [value]); // Update whenever the value from the parent changes




    useEffect(() => {
        if (editorRef.current) {
            if (showInText) {
                // Store HTML content before switching to text mode
                setOriginalHtml(editorRef.current.innerHTML);
                editorRef.current.innerText = editorRef.current.innerHTML; // Convert to plain text
            } else {
                // Restore original HTML content or set value from props
                editorRef.current.innerHTML = originalHtml || value || "";
            }
        }
    }, [showInText, value]); // Re-run effect when showInText or value changes




    let isPropData = true;

    return (
        <>

            <div className='mx-1 lg:mx-2 border-2 border-t-4 rounded-md  border-borderColor'
                onClick={handleOuterClick}
            >
                <div className='flex flex-wrap m-2 gap-2'>

                    <div className="flex  gap-2 text-xs">
                        <button
                            type='button'
                            title='Bold'
                            onClick={() => {
                                applyStyle('bold');
                            }
                            }
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md  `}
                        >
                            <FaBold />
                        </button>
                        <button
                            type='button'
                            title='Italic'
                            onClick={() => applyStyle('italic')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaItalic />
                        </button>
                        <button
                            type='button'
                            title='Strikethrough'
                            onClick={() => applyStyle('strikeThrough')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaStrikethrough />
                        </button>
                    </div>

                    <div className="flex  gap-2 text-xs">
                        <button
                            type='button'
                            title='Clear Format'
                            onClick={() => applyStyle('clear')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaEraser />
                        </button>
                        <button
                            type='button'
                            title='Unordered List'
                            onClick={() => applyStyle('insertUnorderedList')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}

                        >
                            <MdOutlineFormatListBulleted className='text-lg' />
                        </button>
                        <button
                            type='button'
                            title='Ordered List'
                            onClick={() => applyStyle('insertOrderedList')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}

                        >
                            <MdOutlineFormatListNumbered className='text-lg' />
                        </button>
                    </div>

                    <div className="flex  gap-2 text-xs relative">
                        <button
                            type='button'
                            onClick={() => setShowListDropDown(1)}
                            title='Font Family'
                            // onClick={() =>{ applyStyle('fontName')setShowListDropDown}}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}

                        >
                            <FaFont />


                        </button>
                        <button
                            type='button'
                            title='Font Size'
                            onClick={() => setShowListDropDown(2)}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <MdOutlineFormatSize className='text-lg' />
                        </button>
                        <button
                            type='button'
                            title='Heading Size'
                            onClick={() => applyStyle('formatBlock')}
                            className={`cursor-not-allowed text-gray-400 border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                            disabled
                        >
                            <MdOutlineFormatTextdirectionLToR className='text-lg' />
                        </button>

                        {showListDropDown !== 0 && (
                            <div className="absolute border-2 w-32 h-36 overflow-scroll mt-7 z-10 bg-white shadow-xl rounded-l">
                                {
                                    showListDropDown === 1 && (


                                        allFontForCustomeEditor.map((fontName) => (
                                            <div
                                                key={fontName}
                                                className="text-xxs p-1 hover:bg-gray-100 cursor-pointer"
                                                style={{ fontFamily: fontName }} // Preview font
                                                onClick={() => {
                                                    applyFont(fontName);
                                                    setShowListDropDown(0); // Close dropdown
                                                }}
                                            >
                                                {fontName}
                                            </div>
                                        ))

                                    )
                                }
                                {
                                    showListDropDown === 2 && (
                                        fontSizesForCustome.map((fontsize, index) => (
                                            <div
                                                key={index} // Using index as key
                                                className="text-xxs p-1 hover:bg-gray-100 cursor-pointer"
                                                // style={{ fontSize: fontsize.size }} // Preview the font size in the dropdown
                                                onClick={() => {
                                                    // Apply font size using execCommand
                                                    applyFontSize(fontsize.size);
                                                    setShowListDropDown(0); // Close dropdown after selection
                                                }}
                                            >
                                                {fontsize.value}
                                            </div>
                                        ))
                                    )
                                }



                            </div>
                        )
                        }

                    </div>

                    <div className="flex  gap-2 text-xs">
                        <button
                            type='button'
                            title='Line Height'
                            onClick={() => applyStyle('styleWithCSS')}
                            className={`cursor-not-allowed text-gray-400 border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                            disabled
                        >
                            <RiLineHeight className='text-lg' />
                        </button>
                        <button
                            type='button'
                            title='Superscript'
                            onClick={() => applyStyle('superscript')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaSuperscript />
                        </button>
                        <button
                            type='button'
                            title='Subscript'
                            onClick={() => applyStyle('subscript')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaSubscript />
                        </button>
                    </div>

                    <div className="flex  gap-2 text-xs">
                        <button
                            type='button'
                            title='File Insert'
                            onClick={() => applyStyle('createLink')}
                            className={`cursor-not-allowed text-gray-400 border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                            disabled
                        >
                            <FaFile />
                        </button>
                        <button
                            type='button'
                            title='Image Insert'
                            onClick={() => applyStyle('createLink')}
                            className={`cursor-not-allowed text-gray-400 border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                            disabled
                        >
                            <FaFileImage />
                        </button>
                        <button
                            type='button'
                            title='Video Insert'
                            onClick={() => applyStyle('createLink')}
                            className={`cursor-not-allowed text-gray-400 border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                            disabled
                        >
                            <FaVideo />
                        </button>
                    </div>

                    <div className="flex  gap-2 text-xs">
                        <button
                            type='button'
                            title='Speak Something'
                            onClick={() => applyStyle('audio')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md ${isListening ? 'bg-red-400 border-red-400 text-white' : ''}`}
                        >
                            <MdKeyboardVoice className='text-lg' />
                        </button>
                        <button
                            type='button'
                            title='Cut'
                            onClick={() => applyStyle('cut')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaCut />
                        </button>
                        <button
                            type='button'
                            title='Copy'
                            onClick={() => applyStyle('copy')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaCopy />
                        </button>
                    </div>

                    <div className="flex  gap-2 text-xs">
                        <button
                            type='button'
                            title='Paste'
                            onClick={() => applyStyle('paste')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaPaste />
                        </button>
                        <button
                            type='button'
                            title='Select all'
                            onClick={() => applyStyle('selectAll')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <MdSelectAll className='text-lg' />
                        </button>
                        <button
                            type='button'
                            title='Deselect all'
                            onClick={() => applyStyle('deSelectAll')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <MdDeselect className='text-lg' />
                        </button>
                    </div>

                    <div className="flex  gap-2 text-xs">
                        <button
                            type='button'
                            title='Insert Link'
                            onClick={() => applyStyle('link')}
                            className={`cursor-not-allowed text-gray-400 border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                            disabled
                        >
                            <FaLink />
                        </button>

                        <button
                            type='button'
                            title='Text Color'
                            onClick={() => applyStyle('justifyFull')}
                            className={`cursor-not-allowed text-gray-400 border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                            disabled
                        >
                            <MdWaterDrop className='text-lg' />
                        </button>

                        <button
                            type='button'
                            title='Align Justify'
                            onClick={() => applyStyle('justifyFull')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <MdFormatAlignJustify />
                        </button>
                    </div>

                    <div className="flex  gap-2 text-xs">
                        <button
                            type='button'
                            title='Align Center'
                            onClick={() => applyStyle('justifyCenter')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <MdFormatAlignCenter />
                        </button>
                        <button
                            type='button'
                            title='Align Left'
                            onClick={() => applyStyle('justifyLeft')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <MdFormatAlignLeft />
                        </button>
                        <button
                            type='button'
                            title='Align Right'
                            onClick={() => applyStyle('justifyRight')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <MdFormatAlignRight />
                        </button>
                    </div>

                    <div className="flex  gap-2 text-xs">

                        <button
                            type='button'
                            title='Table'
                            onClick={insertTable}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaTable className='text-base' />

                        </button>

                        <button
                            type='button'
                            title='Undo'
                            onClick={() => applyStyle('undo')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaUndoAlt />
                        </button>
                        <button
                            type='button'
                            title='Redo'
                            onClick={() => applyStyle('redo')}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaRedoAlt />
                        </button>

                    </div>

                    <div className="flex  gap-2 text-xs">

                        <button
                            type='button'
                            title='Code'
                            onClick={() => setShowInText((prev) => !prev)}
                            className="cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md"
                        >
                            <FaCode />
                        </button>



                        <button
                            type='button'
                            title='Preview'
                            onClick={() => setOpenPreview(true)}
                            className={`cursor-pointer border-[1px] w-6 h-6 flex justify-center items-center rounded-md`}
                        >
                            <FaEye />


                        </button>

                    </div>

                </div>


                {/* Editable Area */}
                <div
                    ref={editorRef}
                    contentEditable={true}
                    onInput={handleInput}
                    className={`outline-none border-2 h-32 overflow-scroll relative p-1 text-left  space-y-2 ${isOrderedList ? "list-decimal" : "list-disc"
                        } list-inside`}
                    suppressContentEditableWarning
                // dangerouslySetInnerHTML={isPropData ? { __html: value } : undefined}
                >

                </div>



            </div>


            {
                openPreview && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-10 h-auto z-50 shadow-2xl bg-white rounded-lg    animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex  items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Preview
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setOpenPreview(!openPreview) }}
                                />
                            </div>


                            <div className='h-96 overflow-scroll px-2'>
                                <div
                                    dangerouslySetInnerHTML={{ __html: content }} // Render HTML content
                                />
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}


