"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  ApplicationStatus,
  PartnerApplication,
} from "@/lib/application-types";
import styles from "@/app/admin/applications/applications.module.css";

export function ApplicationReviewActions({
  application,
}: {
  application: PartnerApplication;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [adminNotes, setAdminNotes] = useState(application.adminNotes);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function saveReview() {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/applications/${application.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, adminNotes }),
        },
      );
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to save the review.");
      }

      setMessage("Review saved.");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to save the review.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.reviewActions}>
      <label>
        <span>Application status</span>
        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ApplicationStatus)
          }
        >
          <option value="new">New</option>
          <option value="under-review">Under review</option>
          <option value="approved">Approved</option>
          <option value="declined">Declined</option>
        </select>
      </label>

      <label>
        <span>Internal notes</span>
        <textarea
          rows={3}
          value={adminNotes}
          onChange={(event) => setAdminNotes(event.target.value)}
          placeholder="Add follow-up notes, requested revisions, or approval conditions."
        />
      </label>

      <div className={styles.reviewFooter}>
        {message ? <small>{message}</small> : <span />}
        <button
          className="button button-primary button-small"
          type="button"
          disabled={saving}
          onClick={saveReview}
        >
          {saving ? "Saving…" : "Save review"}
        </button>
      </div>
    </div>
  );
}
