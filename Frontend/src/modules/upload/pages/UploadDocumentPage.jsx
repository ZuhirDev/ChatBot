import React from 'react'
import UploadDocuments from '@upload/components/UploadDocuments'

const UploadDocumentPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Documentation Upload</h1>
      <p className="text-gray-700 mb-6 leading-relaxed">
        This section allows you to upload documents that will serve as the 
        <strong> knowledge base </strong> for the virtual assistant. 
        <br />
        The content you upload will be processed and used by the chatbot to provide 
        <strong> faster, more accurate, and context-aware </strong> responses to users' questions.
        <br />
        Please ensure that the documents are <strong> up-to-date, clear, and relevant </strong> 
        to the topics the assistant is expected to handle. The quality and relevance of the uploaded content 
        directly affect the chatbot’s ability to deliver helpful and reliable answers.
      </p>

      <UploadDocuments />
    </div>
  )
}

export default UploadDocumentPage;
