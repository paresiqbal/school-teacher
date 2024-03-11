// components
import CreateClass from "./CreateClass";
import CreateMajor from "./CreateMajor";

export default function ClassPage() {
  return (
    <div className="p-10">
      <div>
        <h1 className="text-3xl font-bold">Create a major and classes</h1>
        <p>create major and class.</p>
      </div>
      <div className="flex">
        <div className="w-5/10">
          <CreateClass />
        </div>
        <div className="w-5/10">
          <CreateMajor />
        </div>
      </div>
    </div>
  );
}
