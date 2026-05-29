import CollectionGrid from "../components/CollectionGrid";

const CollectionPage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100">
          My Collection
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 mt-2">
          Your saved media in one place.
        </p>
      </div>

      <CollectionGrid />
    </div>
  );
};

export default CollectionPage;
