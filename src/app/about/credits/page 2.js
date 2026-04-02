
import Link from "next/link"
import { creditData } from "@/config/static/memberCreditData"
import { LinkedInIcon } from '@/final_refactor_src/components/icon';
import { EmailIcon } from '@/final_refactor_src/components/icon';
import { GitIcon } from '@/final_refactor_src/components/icon';

export default function CreditPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
            Credits
          </h1>
          <p className='mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl'>
            <span className='font-semibold'>umichkisa.com</span> was developed
            using Next.js + NestJS.
          </p>
        </div>

        <h2 className='text-2xl font-bold text-gray-900 mb-6'>Contributors:</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {creditData.map((person, index) => (
            <div
              key={index}
              className='bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300'
            >
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-1'>
                  {person.name}
                </h3>
                <p className='text-sm text-gray-600 mb-2'>{person.email}</p>
                <p className='text-sm font-medium text-indigo-600 mb-2'>
                  {person.role}
                </p>
                <p className='text-gray-700 text-sm mb-4'>
                  {person.description}
                </p>

                <div className='flex items-center space-x-4'>
                  {person.github && (
                    <Link
                      href={person.github}
                      className='text-gray-600 hover:text-purple-700 transition-colors duration-200'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <GitIcon/>
                    </Link>
                  )}
                  {person.linkedin && (
                    <Link
                      href={person.linkedin}
                      className='text-blue-500 hover:text-blue-700 transition-colors duration-200'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                <LinkedInIcon/>
                    </Link>
                  )}

                  <Link
                    href={`mailto:${person.email}`}
                    className='text-red-500 hover:text-red-700 transition-colors duration-200'
                  >
                   <EmailIcon/>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

