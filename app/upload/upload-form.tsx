'use client';

import { z } from 'zod';
import { X } from 'lucide-react';
import { team } from '@/db/schema/team';
import { category } from '@/db/schema/options';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card } from '@/components/ui/card';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { uploadPhotos } from './action';


const uploadFormSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, 'At least one image is required').max(10, 'You can only upload up to 10 images at a time').refine((files) => files.every((file) => file.type === 'image/png' || file.type === 'image/jpeg'), {
    message: 'Only PNG and JPEG images are allowed',
  }),
  teamId: z.number().min(1, 'Please select your team'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  categoryId: z.number().min(1, 'Please select your category'),
  caption: z.string().optional(),
});

type UploadFormData = z.infer<typeof uploadFormSchema>;

interface UploadFormProps {
  teams: typeof team.$inferSelect[];
  categories: typeof category.$inferSelect[];
}

interface FileWithPreview extends File {
  preview?: string;
}

export function UploadForm({ teams, categories }: UploadFormProps) {

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      tags: [],
      caption: 'Hacking the HexaFalls',
    },
  });


  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const totalFiles = files.length + acceptedFiles.length;
      if (totalFiles > 10) {
        toast.error('You can only upload up to 10 images at a time');
        return;
      }
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (fileToRemove: FileWithPreview) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
  };


  useEffect(() => {
    form.setValue('images', files);
  }, [files]);


  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof uploadFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsUploading(true);
    toast.promise(uploadPhotos(values), {
      loading: 'Adding your memories to the gallery...',
      success: (data) => {
        setIsUploading(false);
        return 'Your memories are sent for review!'
      },
      error: (error) => {
        setIsUploading(false);
        return error instanceof Error ? error.message : 'Failed to add your memories'
      },
    })
  }


  return (
    <Card className="space-y-6 p-6 rounded-2xl w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Pictures</FormLabel>
                <FormControl>
                  <div className='w-full'>
                    <div
                      {...getRootProps()}
                      className={cn(
                        'cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5',
                        isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
                      )}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center gap-3">
                        <div className="rounded-full bg-muted p-3">
                          <svg
                            className="h-6 w-6 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        {isDragActive ? (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-primary">Drop the files here</p>
                            <p className="text-xs text-muted-foreground">Release to upload</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Drag & drop your images</p>
                            <p className="text-xs text-muted-foreground">
                              or <span className="text-primary underline">click to browse</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG, GIF up to 10MB (max 10 files)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="grid max-h-[200px] gap-2 overflow-y-auto pr-2">
                          {files.map((file) => (
                            <div
                              key={file.name}
                              className="flex items-center justify-between rounded-md bg-muted p-2"
                            >
                              <div className="flex items-center gap-2">
                                <Image src={file.preview || ''} alt={file.name} width={100} height={100} className="rounded-md" />
                                <span className="max-w-[200px] truncate text-sm">
                                  {file.name}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFile(file)}
                                className="h-8 w-8"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teamId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your Team</FormLabel>
                <FormControl className='w-full'>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                    <SelectTrigger className='w-full' >
                      <span>
                        Team: <SelectValue placeholder="Select a team" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>{team.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your Category</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                    <SelectTrigger className='w-full' >
                      <span>
                        Category: <SelectValue placeholder="Select a category" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-muted text-muted-foreground px-3 py-1 rounded-xl text-base"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newTags =
                                field.value?.filter(
                                  (_, i: number) => i !== index
                                ) || [];
                              field.onChange(newTags);
                            }}
                            className="text-destructive cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Type a tag and press Enter"
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.currentTarget;
                          const value = input.value.trim();
                          if (value) {
                            const newTags = field.value
                              ? [...field.value, value]
                              : [value];
                            field.onChange(newTags);
                            input.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caption</FormLabel>
                <FormControl className='w-full'>
                  <Textarea
                    placeholder='Write a caption for your picture'
                    className='w-full'
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
} 