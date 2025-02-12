import * as XLSX from "xlsx";

export const ExcelToJson = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};


// function ExcelToJson() {
//   const [jsonData, setJsonData] = useState(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });

//         // Get the first sheet name
//         const sheetName = workbook.SheetNames[0];

//         // Get the worksheet
//         const worksheet = workbook.Sheets[sheetName];

//         // Convert the worksheet to JSON
//         const json = XLSX.utils.sheet_to_json(worksheet);

//         setJsonData(json);
//       };

//       reader.readAsArrayBuffer(file);
//     }
//   };
// console.log("Excel to Json Data ",jsonData)
//   return (
//     <div className="App">
//       <h1>Excel to JSON Converter</h1>
//       <input
//         type="file"
//         accept=".xlsx, .xls"
//         onChange={handleFileUpload}
//         style={{ marginBottom: "20px" }}
//       />
//       {jsonData && (
//         <pre
//           style={{
//             background: "#f4f4f4",
//             padding: "10px",
//             borderRadius: "5px",
//             maxHeight: "400px",
//             overflow: "auto",
//           }}
//         >
//           {JSON.stringify(jsonData, null, 2)}
//         </pre>
//       )}
//     </div>
//   );
// }

// export default ExcelToJson;
