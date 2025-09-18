import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, File, FileText, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { embeddingService } from '@upload/service/embeddingService';

const ALLOWED_FILE_TYPES = {
  'application/pdf': { ext: '.pdf', icon: File, color: 'bg-red-500' },
  'text/plain': { ext: '.txt', icon: FileText, color: 'bg-blue-500' },
  'text/markdown': { ext: '.md', icon: FileText, color: 'bg-green-500' },
  'text/x-markdown': { ext: '.md', icon: FileText, color: 'bg-green-500' },
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const UploadDocuments = () => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const type = file.type;
    const name = file.name.toLowerCase();

    const allowedTypes = Object.keys(ALLOWED_FILE_TYPES);
    const allowedExtensions = Object.values(ALLOWED_FILE_TYPES).map(f => f.ext);

    const isTypeAllowed = type && allowedTypes.includes(type);
    const hasValidExtension = allowedExtensions.some(ext => name.endsWith(ext));

    if (!isTypeAllowed && !hasValidExtension) {
      return `File type not allowed. Only ${allowedExtensions.join(', ').toUpperCase()} are accepted.`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return 'File is too large. Maximum size is 10MB.';
    }

    return null;
  };

  const addFiles = useCallback((newFiles) => {
    const validFiles = [];
    const errors = [];

    Array.from(newFiles).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        const exists = files.some(f => f.file.name === file.name && f.file.size === file.size);
        if (!exists) {
          validFiles.push({
            id: crypto.randomUUID(),
            file,
          });
        } else {
          errors.push(`${file.name}: File already added.`);
        }
      }
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }

    if (errors.length > 0) {
      toast.error(errors.join('\n'));
    }
  }, [files]);

  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
    e.target.value = '';
  };

  const handleUploadAll = async () => {
    setIsUploading(true);

    try {
      const response = await embeddingService(files);

      toast.success(response.message);

      setFiles([]);
    } catch (error) {
      console.log("Error uploading files: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (file) => {
    const fileType = ALLOWED_FILE_TYPES[file.type];
    return fileType?.icon || FileText;
  };

  const getFileColor = (file) => {
    const fileType = ALLOWED_FILE_TYPES[file.type];
    return fileType?.color || 'bg-gray-500';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Upload className="h-4 w-4" />
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "relative border-2 border-dashed rounded-md p-4 text-center transition-colors cursor-pointer",
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.txt,.md"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="flex flex-col items-center gap-3">
              <div className={cn(
                "mx-auto h-10 w-10 rounded-full flex items-center justify-center",
                isDragOver ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                <Upload className="h-5 w-5" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {isDragOver ? 'Drop the files here' : 'Select or drag files'}
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, TXT, Markdown • Max 10MB per file
                </p>
              </div>

              <Button variant="outline" className="mt-1 h-8 px-3 text-sm">
                Select Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span>Selected Files</span>
              <Badge variant="secondary">{files.length} pending</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {files.map((file) => {
              const Icon = getFileIcon(file.file);
              const color = getFileColor(file.file);

              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 rounded-md border bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className={cn("p-2 rounded-md text-white", color)}>
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{file.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.file.size)}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    disabled={isUploading}
                    className="hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}

            <div className="flex justify-end pt-3 border-t">
              <Button
                onClick={handleUploadAll}
                disabled={isUploading}
                className="min-w-32 h-9 text-sm"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    {files.length === 1 ? `Upload File` : `Upload ${files.length} Files`}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default UploadDocuments;
