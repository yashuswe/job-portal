import Input from "@/@components/Input";
import Header from "@/common/Header";
import useUnsavedChanges from "@/hooks/UseUnsavedChanges";
import "react-toastify/dist/ReactToastify.css";
import { usePostAJobView } from "./views/usePostAJobView";

const PostAJob = () => {
  const {
    title,
    description,
    location,
    isPageLoading,
    handleTitleChange,
    handleDescChange,
    handleLocationChange,
    handlePostAJOb,
  } = usePostAJobView();

  const userIsRecruiter = true;
  const canPostJob = userIsRecruiter;
  const isFormDirty = useUnsavedChanges();

  return (
    <Header>
      <div
        className={`bg-white mx-auto w-min mt-20 p-7 rounded-2xl flex-col
    text-primary shadow-3xl`}
      >
        <h1 className="text-xl mb-5 font-medium">Post a Job</h1>
        {canPostJob ? (
          <>
            <Input
              type="text"
              label="Job title"
              required
              name="title"
              value={title}
              placeholder="Enter job title"
              onChange={handleTitleChange}
            />
            <Input
              type="textarea"
              label="Description"
              required
              value={description}
              name="job-desc"
              placeholder="Enter job descripton"
              onChange={handleDescChange}
              // rows={4}
            />

            <Input
              type="text"
              label="Location"
              required
              name="location"
              value={location}
              placeholder="Enter location"
              onChange={handleLocationChange}
            />
            <div className="mt-5 flex justify-center">
              <button
                className="w-36 h-12 bg-sky-blue border-1 border-sky-blue mt-10 rounded-md mb-14"
                onClick={handlePostAJOb}
              >
                <div className="text-white font-fp font-medium py-3">
                  Submit
                </div>
              </button>
            </div>
          </>
        ) : (
          <div className="text-red-500">Only recruiters can post a job.</div>
        )}
      </div>
    </Header>
  );
};
export default PostAJob;
