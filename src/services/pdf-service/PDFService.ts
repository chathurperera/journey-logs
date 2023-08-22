import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { ToastService } from '../toast-service';

interface CreatePDFProps {
  html: string;
  fileName: string;
  directory: string;
}

const createPDF = async (payload: CreatePDFProps) => {
  try {
    let file = await RNHTMLtoPDF.convert(payload);
    console.log('file.filePath', file.filePath);
    ToastService.success('Success', 'Note Exported successfully');
  } catch (error) {
    ToastService.error('Error', 'Something went wrong');
  }
};

export const PDFService = { createPDF };
