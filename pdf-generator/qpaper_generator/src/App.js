import { PDFDownloadLink } from '@react-pdf/renderer';
import { ExamPaper } from './ExamDocument';

const questions = [
  { 
    text: "Which of the following is a Hook in React?", 
    options: ["useState", "useLink", "useDiv", "useFetch"], 
    marks: 2 
  },
  { 
    text: "What is the time complexity of a Binary Search?", 
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], 
    marks: 2 
  }
];

function App() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Exam Generator</h1>
      
      <PDFDownloadLink 
        document={<ExamPaper questions={questions} title="Computer Science Midterm" />} 
        fileName="Exam_Paper.pdf"
      >
        {({ loading }) => (loading ? 'Preparing Paper...' : 'Download Question Paper')}
      </PDFDownloadLink>
    </div>
  );
}

export default App;