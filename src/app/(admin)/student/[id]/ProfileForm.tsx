import React, { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileFormProps {
  formData: IStudent;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

export default function ProfileForm() {
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} className="py-8">
        {student ? (
          <div className="flex flex-col w-full py-4">
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site
            </p>
            <form onSubmit={handleSubmit} className="py-8">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Full Name:
              </label>
              <Input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
              />
              <br />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Username:
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password:
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                NIS
                <Input
                  type="number"
                  name="nip"
                  value={formData.nis}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <Button type="submit">Update Profile</Button>
            </form>
          </div>
        ) : (
          <p>Loading student details...</p>
        )}
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}
