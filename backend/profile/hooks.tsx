import { useEffect, useState } from "react";

export function usePreparationProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
  return { profile, loading };
}
