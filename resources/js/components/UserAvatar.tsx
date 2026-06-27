import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'

interface UserAvatarProps {
  avatar: string;
  name?: string;
  userId: number;
  role?: string;
  center?: boolean;
}

export default function UserAvatar({ avatar, name, userId, role, center }: UserAvatarProps) {
  return (
    <div className={center ? 'flex items-center justify-center w-full' : 'flex items-center justify-start w-full'}>
      <Link href={route('user.show', userId)} className="flex items-center justify-center flex-col gap-1.5 w-fit object-cover rounded-full">
        <img src={!avatar?.includes('ui-avatars') ? `/storage/${avatar}` : `${avatar}`} className="w-20 h-20 object-cover rounded-full" alt={name} />
        <div className='flex items-center justify-center gap-1'>
          {name &&
            <p className='text-md truncate'>{name}</p>
          }
          {role && <p className='text-sm text-[#ccc]'>({role.toLowerCase()})</p>}
        </div>
      </Link>
    </div>
  )
}