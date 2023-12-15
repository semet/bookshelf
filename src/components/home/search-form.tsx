import { SearchFormProps } from "component-types";
import { FaSearch } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";

const SearchForm: React.FC<SearchFormProps> = ({ onChange, value, isLoading }) => {
   return (
      <div className="w-[50%] flex flex-col gap-4">
         <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-900 to-pink-900 bg-clip-text text-transparent">
            Just leave it here
         </h2>
         <h3 className="text-base text-gray-100">
            Check out new books without spending a penny
         </h3>
         <div className="relative bg-red-800 rounded-md overflow-hidden w-[70%] h-[60px] ">
            <input
               type="text"
               placeholder="Type any book title"
               className="w-full h-full py-2 pr-12 pl-4 rounded-md text-gray-700"
               value={value}
               onChange={onChange}
            />
            <div className="absolute right-4 top-[50%] transform -translate-y-[50%] text-gray-400">
               {isLoading ? <Spinner /> : <FaSearch />}
            </div>
         </div>
      </div>
   );
};

export default SearchForm;
