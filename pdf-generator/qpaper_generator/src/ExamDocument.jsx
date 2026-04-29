import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// 2. Official-looking styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
    borderBottom: '2pt solid black',
    paddingBottom: 10,
  },
  examName: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    fontWeight: 'bold',
  },
  questionContainer: {
    marginBottom: 15,
  },
  questionHeader: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  questionText: {
    flex: 1,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  marks: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 25,
  },
  option: {
    width: '50%', // Two options per row
    marginBottom: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
    color: 'grey',
  }
});

// 3. The Document Component
export const ExamPaper = ({ questions, title }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Exam Header */}
      <View style={styles.header}>
        <Text style={styles.examName}>{title}</Text>
        <View style={styles.metaInfo}>
          <Text>Duration: 180 Mins</Text>
          <Text>Max Marks: 100</Text>
        </View>
      </View>

      {/* Logic to Render Questions */}
      {questions.map((q, index) => (
        <View key={index} style={styles.questionContainer} wrap={false}>
          <View style={styles.questionHeader}>
            <Text>{index + 1}.</Text>
            <Text style={styles.questionText}>{q.text}</Text>
            <Text style={styles.marks}>[{q.marks}M]</Text>
          </View>

          <View style={styles.optionsContainer}>
            {q.options.map((opt, i) => (
              <Text key={i} style={styles.option}>
                {String.fromCharCode(97 + i)}) {opt} 
              </Text>
            ))}
          </View>
        </View>
      ))}

      {/* Page Numbering */}
      <Text 
        style={styles.footer} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
    </Page>
  </Document>
);