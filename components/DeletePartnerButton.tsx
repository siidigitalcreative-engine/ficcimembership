"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeletePartnerButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    setDeleting(true);
    const response = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
    setDeleting(false);
    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      window.alert(result.error || "Unable to delete the partner.");
      return;
    }
    router.refresh();
  }

  return (
    <button className="button button-danger button-small" type="button" onClick={handleDelete} disabled={deleting}>
      {deleting ? "Deleting…" : "Delete"}
    </button>
  );
}
