interface ErrorMessageProps {
  children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <>
      <p className="bg-red-50, text-red-600 p-3 txt-sm font-bold text-left">{children}</p>
    </>
  );
}
