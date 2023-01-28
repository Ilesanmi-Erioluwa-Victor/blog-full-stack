// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PropTypes, { InferProps } from "prop-types";

const SearchProps = {
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  childClasses: PropTypes.string,
  inputClass: PropTypes.string,
};
export default function Search({
  placeholder,
  className,
  childClasses,
  inputClass
}: InferProps<typeof SearchProps>): JSX.Element {
  return (
    <div className={`${className}`}>
      <div
        className={`w-full flex items-center space-x-3 border bg-white h-12 pl-3 rounded-lg ${childClasses}`}>
        {/* <MagnifyingGlassIcon className="w-5 h-5" /> */}
        <input
          type="text"
          placeholder={placeholder}
          className={`focus:outline-none w-full pr-8 ${inputClass}`}
        />
      </div>
    </div>
  );
}