"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Student() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setShowForm(!showForm)}>Add new student +</Button>
    </div>
  );
}
