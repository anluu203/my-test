const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

/**
 * Hàm trích xuất text thuần từ ssml.xml
 */
function extractTextFromSsml(inputFile, outputFile) {
  try {
    // Đọc dữ liệu SSML từ file đầu vào
    const ssmlData = fs.readFileSync(inputFile, 'utf8');

    // Tạo parser và phân tích cú pháp XML, bỏ qua namespace
    const parser = new XMLParser({ 
      ignoreAttributes: false,  // Giữ lại các thuộc tính
      parseNodeValue: true,     // Giữ lại giá trị của các node
      attributeNamePrefix: "",  // Bỏ tiền tố namespace của các thuộc tính
      textNodeName: "text"      // Đặt tên node chứa văn bản là "text"
    });
    const parsedData = parser.parse(ssmlData);


    let textArray = [];
    if (parsedData.speak && parsedData.speak.voice) {
      const voices = parsedData.speak.voice;
      textArray = Array.isArray(voices) ? voices : [voices];

      // Trích xuất văn bản từ mỗi phần tử <voice>
      textArray = textArray.map(voice => voice.text.trim()).filter(Boolean);
    }

    if (textArray.length > 0) {
      // Trích xuất và lưu văn bản vào file đầu ra
      const textOutput = textArray.join('\n');
      fs.writeFileSync(outputFile, textOutput, 'utf8');
      console.log(`Extracted text has been saved to ${outputFile}`);
    } else {
      console.error("No text found in SSML voices.");
    }
  } catch (error) {
    console.error('Error while extracting text from SSML:', error.message);
  }
}

// Kiểm tra sự tồn tại của file và chạy hàm
const inputFile = path.join(__dirname, '..', '..', 'public', 'input', 'ssml.xml');  // Đúng với thư mục public/input
const outputFile = path.join(__dirname, '..', '..', 'public', 'output', 'output.txt');
extractTextFromSsml(inputFile, outputFile);









/**
 * Hàm trích xuất text với label A/B
 */
function extractTextWithLabels(inputFile, outputFile) {
  try {
    // Đọc dữ liệu SSML từ file đầu vào
    const ssmlData = fs.readFileSync(inputFile, 'utf8');

    // Tạo parser và phân tích cú pháp XML, bỏ qua namespace
    const parser = new XMLParser({ 
      ignoreAttributes: false,  // Giữ lại các thuộc tính
      parseNodeValue: true,     // Giữ lại giá trị của các node
      attributeNamePrefix: "",  // Bỏ tiền tố namespace của các thuộc tính
      textNodeName: "text"      // Đặt tên node chứa văn bản là "text"
    });
    const parsedData = parser.parse(ssmlData);


    let textArray = [];
    if (parsedData.speak && parsedData.speak.voice) {
      const voice = parsedData.speak.voice;
      textArray = Array.isArray(voice) ? voice : [voice];

      // Trích xuất văn bản từ mỗi phần tử <voice>
      textArray = textArray.map(voice => voice.text.trim()).filter(Boolean);
    }

    if (textArray.length > 0) {
      // Thêm nhãn cho từng dòng văn bản
      const labeledText = textArray.map((voice, index) => {
        const speaker = index % 2 === 0 ? 'A' : 'B';
        return `${speaker}: ${voice.replace(/\s+/g, ' ').trim()}`;
      }).join('\n');

      // Lưu kết quả vào file
      fs.writeFileSync(outputFile, labeledText, 'utf8');
      console.log(`Labeled text has been saved to ${outputFile}`);
    } else {
      console.error("No voice found in SSML.");
    }
  } catch (error) {
    console.error('Error while extracting text with labels from SSML:', error.message);
  }
}
// Kiểm tra sự tồn tại của file và chạy hàm
const inputFileLabel = path.join(__dirname, '..', '..', 'public', 'input', 'ssml.xml');  
const outputFileLabel = path.join(__dirname, '..', '..', 'public', 'output', 'output_AB.txt');
extractTextWithLabels(inputFileLabel, outputFileLabel);










// /**
//  * Hàm trích xuất timestamp
//  */
/**
 * Hàm trích xuất timestamp từ file timestamp.json
 */
function extractTimestamps(inputFile, outputFile) {
  // Đọc dữ liệu từ file timestamp.json
  const timestampData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  // Kiểm tra xem có phần timestamp không
  const timestamps = timestampData.timestamp || [];

  // Duyệt qua các timestamp và chuẩn bị dữ liệu
  const timestampLines = timestamps.map(([timeElapsed, duration, index, wordLength]) => {
    return `${timeElapsed},${duration},${index},${wordLength}`;
  }).join('\n');

  // Lưu kết quả vào file timestamp.txt
  fs.writeFileSync(outputFile, timestampLines, 'utf8');
  console.log(`Dữ liệu timestamp đã được lưu vào ${outputFile}`);
}
const inputFileTimeStamp = path.join(__dirname, '..', '..', 'public', 'input', 'timestamp.json');  
const outputFileTimeStamp = path.join(__dirname, '..', '..', 'public', 'output', 'timestamp.txt');
extractTimestamps(inputFileTimeStamp, outputFileTimeStamp);


//chạy câu lệnh sau để sử dụng 3 logic trên : node src/utils/extractors.js
