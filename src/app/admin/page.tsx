"use client";
// next
import Link from "next/link";

// shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Admin() {
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div role="students">
          <Card role="students">
            <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="tracking-tight text-sm font-medium">
                Total Student's
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">1,000 Students</h2>
            </CardContent>
          </Card>
        </div>

        <div role="teachers">
          <Card role="students">
            <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="tracking-tight text-sm font-medium">
                Total Teacher's
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">80 Teacher's</h2>
            </CardContent>
          </Card>
        </div>

        <div role="class">
          <Card role="students">
            <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="tracking-tight text-sm font-medium">
                Total Classes
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">12 Classes</h2>
            </CardContent>
          </Card>
        </div>

        <div role="class">
          <Card role="students">
            <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="tracking-tight text-sm font-medium">
                Admin's
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">2 Admin's</h2>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
