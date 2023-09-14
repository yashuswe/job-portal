export const ModalCard = ({
  name,
  email,
  skills,
}: {
  name: string;
  email: string;
  skills: string;
}) => {
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div className="border flex-col pt-4 mb-2 p-3 bg-white w-full mx-auto rounded-md text-primary border-primary/80">
      <div className="flex justify-start">
        <div className="rounded-full bg-light-blue text-lg w-12 h-12 flex justify-center items-center ">
          <div>{firstLetter}</div>
        </div>
        <div className="pl-2 flex-col align-middle justify-around">
          <div className=" font-medium text-lg text-opacity-60 mb-1">
            {name}
          </div>
          <div className="text-xs text-opacity-80">{email}</div>
        </div>
      </div>
      <div className="mt-2 text-xs font-medium mb-1">Skills</div>
      <div className="text-primary/80 text-xs font-normal">{skills}</div>
    </div>
  );
};
