"use client";

import { useMemo, useState } from "react";
import { PartnerCard } from "@/components/PartnerCard";
import type { Partner } from "@/lib/types";

export function PartnerDirectoryClient({ partners }: { partners: Partner[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("all");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(partners.map((partner) => partner.category))).sort()],
    [partners],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return partners.filter((partner) => {
      const matchesQuery =
        !normalizedQuery ||
        [partner.name, partner.category, partner.offerTitle, partner.shortDescription]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === "All" || partner.category === category;
      const matchesType =
        type === "all" ||
        partner.redemptionType === "both" ||
        partner.redemptionType === type;
      return matchesQuery && matchesCategory && matchesType;
    });
  }, [partners, query, category, type]);

  return (
    <>
      <div className="directory-controls">
        <label>
          <span>Search</span>
          <input
            type="search"
            placeholder="Search establishment or benefit"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Available through</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">Physical and online</option>
            <option value="physical">Physical establishment</option>
            <option value="online">Online establishment</option>
          </select>
        </label>
      </div>

      <p className="result-count">Showing {filtered.length} of {partners.length} partners</p>

      {filtered.length ? (
        <div className="partner-grid">
          {filtered.map((partner) => <PartnerCard key={partner.id} partner={partner} />)}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching establishments</h2>
          <p>Try another search term or remove a filter.</p>
        </div>
      )}
    </>
  );
}
