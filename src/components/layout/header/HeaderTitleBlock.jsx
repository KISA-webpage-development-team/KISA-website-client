import Link from 'next/link';
import WebLogo from './WebLogo';
import WebTitle from './WebTitle';

export default function HeaderTitleBlock() {
  return (
    <div className='flex items-center gap-5'>
    <WebLogo />
    <WebTitle />
    </div>
  );
}
