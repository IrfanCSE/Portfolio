import { useState, useEffect } from 'react';
import type { SiteData } from '../types/SiteData';

function resolveAssets(data: SiteData): SiteData {
  const base = import.meta.env.BASE_URL;
  const r = (p: string) => (p ? base + p : p);
  return {
    ...data,
    personal: { ...data.personal, resumePath: r(data.personal.resumePath) },
    about: { ...data.about, photo: r(data.about.photo) },
    experience: data.experience.map((e) => ({ ...e, logo: r(e.logo) })),
    projects: data.projects.map((p) => ({ ...p, image: r(p.image) })),
  };
}

export function useSiteData() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/site-data.json`, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: SiteData) => {
        setData(resolveAssets(json));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
