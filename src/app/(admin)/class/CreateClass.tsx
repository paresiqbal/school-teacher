// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// import { Form } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface IMajor {
//   _id: string;
//   majorName: string;
// }

// import { z } from "zod";
// import { Button } from "@/components/ui/button";

// const ClassFormSchema = z.object({
//   level: z.enum(["X", "XI", "XII"]),
//   majorId: z.string(),
// });

// export default function CreateClasses() {
//   const [majors, setMajors] = useState<IMajor[]>([]);

//   const form = useForm<z.infer<typeof ClassFormSchema>>({
//     defaultValues: {
//       level: undefined,
//       majorId: "",
//     },
//   });

//   // fetch all majors
//   useEffect(() => {
//     const getMajors = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/class/majors");
//         const majorData = await response.json();
//         setMajors(majorData);
//       } catch (error) {
//         console.error("Failed to fetch majors:", error);
//       }
//     };

//     getMajors();
//   }, []);

//   const createClass = async (values: z.infer<typeof ClassFormSchema>) => {
//     const classValue = { ...values };

//     try {
//       const response = await fetch("http://localhost:3001/class/addClass", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(classValue),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to create major. Please try again.");
//       }

//       const classes = await response.json();
//       console.log("Class created:", classes);
//     } catch (error) {
//       console.error("Uh oh! Something went wrong.", error);
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="text-center pb-4">
//         <h2 className="underline">Create an Class</h2>
//       </div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(createClass)}>
//           <Select>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select a class" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Class</SelectLabel>
//                 <SelectItem value="X">X</SelectItem>
//                 <SelectItem value="XI">XI</SelectItem>
//                 <SelectItem value="XII">XII</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           <Select>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select a major" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Major</SelectLabel>
//                 {majors.map((major) => (
//                   <SelectItem key={major._id} value={major._id}>
//                     {major.majorName}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           <Button type="submit" className="w-full">
//             Create Classs
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
