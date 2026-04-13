import { useState, useEffect } from 'react';
import { Launch } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

export function useLaunches() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/launches`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch launches');
        return res.json();
      })
      .then((data: Launch[]) => {
        setLaunches(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { launches, loading, error };
}

export function useLaunch(id: string) {
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/launches/${id}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((body) => {
            throw new Error(body.detail || body.error || `HTTP ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data: Launch) => {
        setLaunch(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { launch, loading, error };
}
