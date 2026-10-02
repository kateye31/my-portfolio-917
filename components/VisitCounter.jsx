"use client";

import { useEffect, useState } from "react";
import { analytics } from "../data/content";
import { SootSprite } from "./Doodles";

// public visit count from GoatCounter's counter endpoint
// (needs "Allow adding visitor counts on your website" turned on in GoatCounter settings)
export default function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const code = analytics.goatcounterCode;
    if (!code) return;
    const ctrl = new AbortController();
    fetch(`https://${code}.goatcounter.com/counter/TOTAL.json`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.count && setCount(d.count))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  if (!count) return null;
  return (
    <p className="visit-counter note">
      <SootSprite className="hop" style={{ width: 30 }} />
      <span><b>{count}</b> visits to this little corner of the internet</span>
    </p>
  );
}
