import PropTypes from "prop-types";
import FileInput from "../../components/FileInput";
import PCAkMeansForm from "./PCAkMeansForm";
import ImgDiffForm from "./ImgDiffForm";

const options = [
  { value: "dilate", label: "Dilation" },
  { value: "erode", label: "Erosion" },
  { value: "opening", label: "Opening" },
  { value: "closing", label: "Closing" },
];

const algorithmOptions = [
  { value: "pca_kmeans", label: "PCA KMeans" },
  { value: "img_diff", label: "Image Difference" },
];

const ChangeDetectionForm = ({
  onSubmit,
  onImage1Change,
  image1Preview,
  onImage2Change,
  image2Preview,
  //delete the following lines
  blockSizeAtribs,
  morphologicalOperationsAtribs,
  numberOfIterationsAtribs,
  //delete the above lines
  algorithmAtribs,
  onParametersChange,
}) => {
  return (
    <div className="mt-5">
      <form className="flex flex-col " onSubmit={onSubmit}>
        <div className="md:flex space-y-6 md:space-y-0 md:space-x-6 p-6">
          <FileInput
            label="Image 1"
            onChange={onImage1Change}
            imagePreview={image1Preview}
          />
          <FileInput
            label="Image 2"
            onChange={onImage2Change}
            imagePreview={image2Preview}
          />
        </div>
        {/* <div className="flex flex-col justify-center items-center py-2">
          <label
            className="text-sm font-medium leading-6 text-gray-900"
            htmlFor="blocksize"
          >
            Block Size
          </label>
          <input
            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            id="blocksize"
            name="blocksize"
            placeholder="Provide block size (2-5)"
            type="number"
            max={5}
            min={2}
            {...blockSizeAtribs}
          />
        </div> */}
        <div className="flex flex-col justify-center items-center py-2">
          <label
            className="text-sm font-medium leading-6 text-gray-900"
            htmlFor="morphologicaloperation"
          >
            Select algorithm
          </label>
          <select
            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            id="algorithm"
            name="algorithm"
            {...algorithmAtribs}
          >
            <option value={""}>None</option>
            {algorithmOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/*delete the following lines*/}
        {/* {algorithmAtribs.value !== null && algorithmAtribs.value !== "" ? (
          <div className="flex flex-col justify-center items-center py-2">
            <label
              className="text-sm font-medium leading-6 text-gray-900"
              htmlFor="iterations"
            >
              Number of iterations
            </label>
            <input
              className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              id="iterations"
              name="iterations"
              placeholder="Provide number of iterations (1-3)"
              type="number"
              max={3}
              min={1}
              {...numberOfIterationsAtribs}
            />
          </div>
        ) : null} */}
        {/*delete the above lines*/}
        {(() => {
          switch (algorithmAtribs.value) {
            case "pca_kmeans":
              return <PCAkMeansForm onParametersChange={onParametersChange} />;
            case "img_diff":
              return <ImgDiffForm onParametersChange={onParametersChange} />;
            default:
              return null;
          }
        })()}
        <div className="my-5 flex justify-center">
          <button
            className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

ChangeDetectionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onImage1Change: PropTypes.func.isRequired,
  image1Preview: PropTypes.string,
  onImage2Change: PropTypes.func.isRequired,
  image2Preview: PropTypes.string,
  blockSizeAtribs: PropTypes.object.isRequired,
  morphologicalOperationsAtribs: PropTypes.object.isRequired,
  numberOfIterationsAtribs: PropTypes.object.isRequired,
  algorithmAtribs: PropTypes.object.isRequired,
};

export default ChangeDetectionForm;
