import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from 'src/utils';
import { ArrowUpTrayIcon, LockClosedIcon } from '@heroicons/react/24/outline';
const DropzoneImage = ({ setImg, img }) => {
    const onDrop = useCallback((acceptedFiles) => {
      setImg(acceptedFiles[0])
    console.log(acceptedFiles);
  }, [setImg]);

  const { getRootProps, getInputProps, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        'image/*': ['.jpeg', '.png', '.svg'],
      },
    });

  console.log(img);
  return (
    <>
      {!img && (
        <div
          className='py-16 md:py-24 px-12 border-2 border-gray-500 border-dashed rounded-md mb-8'
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragReject ? (
            <>
              <p className='text-red-600'>
                Sorry the type of file is not Accepted
              </p>

              <LockClosedIcon className='w-13 h-13 text-center block'/>
            </>
          ) : (
            <div>
              <p className='text-center'>
                Drag & drop your files here or
                <span className='font-semibold underline cursor-pointer'>
                  browse
                </span>
              </p>
            </div>
          )}
        </div>
      )}
      {img && (
        <div className='flex flex-col sm:flex-row gap-8 md:gap-24 md:pl-4 items-center py-2 mb-0'>
          <div className='rounded-lg overflow-hidden shadow-sm shadow-indigo-200 w-full relative'>
            <Icon
              src={img}
              alt='profile pic'
            />
            <div
              className='absolute bottom-1 right-2 bg-indigo-500 bg-opacity-50 p-1 rounded-md cursor-pointer'
              {...getRootProps()}
            >
              <ArrowUpTrayIcon className='w-6 text-slate-100' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DropzoneImage;
