import { Spinner } from 'flowbite-react';

export default function LoadingWrapper({ isLoading, children }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner size="xl" aria-label="Chargement..." />
      </div>
    );
  }

  return <>{children}</>;
}
