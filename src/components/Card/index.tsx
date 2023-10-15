import { MouseEventHandler } from "react";
import Avatar from "src/components/Avatar";
import { IconEye, IconEyeOff, IconMail, IconPhone } from "@tabler/icons-react";
import { User } from "@types";

interface CardProps {
  user: User;
  isMasked: boolean;
  toggleMask: MouseEventHandler<HTMLButtonElement>;
}

const Card: React.FC<CardProps> = ({user, isMasked, toggleMask}) => {
  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-8">
      <div className="flex flex-col items-center space-y-2">
        <Avatar />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{`${user.first_name} ${user.last_name}`}</h5>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <IconMail className="mr-2 w-5 h-5" />
          {user.email}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <IconPhone className="mr-2 w-5 h-5" />
          <span className="w-28">{user.masked_phone}</span>
          <button className="ml-2" onClick={toggleMask} aria-label="Toggle phone masking">{!isMasked ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
