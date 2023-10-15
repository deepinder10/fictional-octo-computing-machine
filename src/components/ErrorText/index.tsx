interface ErrorProps {
  message: string;
}

const ErrorText: React.FC<ErrorProps> = ({message}) => (
  <div className="flex justify-center items-center h-screen w-screen">
    <p className="text-red-500">{message}</p>
  </div>
);

export default ErrorText;
