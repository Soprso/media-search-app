import { useDispatch, useSelector } from "react-redux";

import { nextPage, prevPage } from "../redux/features/searchSlice";

const Pagination = () => {
  const dispatch = useDispatch();

  const { page, loading } = useSelector((store) => store.search);

  return (
    <div
      className="
flex
justify-center
items-center
gap-5
mt-10
"
    >
      <button
        disabled={page === 1 || loading}
        onClick={() => dispatch(prevPage())}
        className="
px-5
py-2

bg-gray-800

rounded-xl
cursor-pointer

disabled:opacity-40
"
      >
        Previous
      </button>

      <span
        className="
font-bold
text-xl

"
      >
        Page {page}
      </span>

      <button
        disabled={loading}
        onClick={() => dispatch(nextPage())}
        className="
px-5
py-2

bg-blue-600
cursor-pointer
rounded-xl
"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
