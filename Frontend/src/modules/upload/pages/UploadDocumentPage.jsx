import React from 'react';
import UploadDocuments from '@upload/components/UploadDocuments';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sparkles, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FAQItems = [
  {
    id: "item-1",
    question: "What file formats are supported for knowledge ingestion?",
    answer: "The platform fully supports PDF (.pdf), Plain Text (.txt), and Markdown (.md) documents. Files are automatically parsed, split into semantic chunks, and processed by our embedding pipeline."
  },
  {
    id: "item-2",
    question: "Is there a file size limit per document?",
    answer: "Yes, the maximum allowed size is 10MB per file. This boundary ensures ultra-fast parsing speeds, prevents network timeouts, and maintains optimal vector generation efficiency."
  },
  {
    id: "item-3",
    question: "How long does it take for the chatbot to learn new data?",
    answer: "The update is instantaneous. As soon as the ingestion process finishes, the high-dimensional vectors (1536 dimensions) are stored in Supabase with an active HNSW index, making the content available for the chatbot immediately."
  },
  {
    id: "item-4",
    question: "Are the original files stored permanently on the server?",
    answer: "No. To guarantee strict data privacy and keep the server infrastructure lightweight, text is extracted and vectorized on the fly. All temporary files are securely wiped from local storage right after database synchronization."
  }
];

const UploadDocumentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="mb-12 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/20 shadow-sm flex items-center justify-center">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Build Your AI Knowledge Base
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Transform your documents into intelligent, searchable knowledge. Our advanced embedding system automatically indexes and vectorizes your content for instant AI comprehension.
            </p>
          </div>

          <Alert className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900">
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-900 dark:text-blue-300">Pro Tip for Best Results</AlertTitle>
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              Organize your documents by topic, keep them up-to-date, and ensure clear formatting. Quality documents lead to more accurate and reliable AI responses.
            </AlertDescription>
          </Alert>
        </div>

        <div className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Upload Your Documents</h2>
            <p className="text-sm text-muted-foreground">
              Supported formats: PDF, TXT, Markdown (max 10MB per file)
            </p>
          </div>
          <UploadDocuments />
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Learn more about how our knowledge ingestion system works.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {FAQItems.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-b last:border-b-0 px-6">
                  <AccordionTrigger className="py-4 hover:no-underline hover:text-primary transition-colors">
                    <span className="text-left font-semibold text-foreground">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UploadDocumentPage;