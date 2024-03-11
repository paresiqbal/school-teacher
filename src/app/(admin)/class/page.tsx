import CreateMajor from "./CreateMajor";

export default function ClassPage() {
  return (
    <div className="p-10">
      <h1>Create A class</h1>
      <div className="flex gap-10">
        <CreateMajor />
      </div>
    </div>
  );
}
