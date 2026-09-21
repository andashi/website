// Gelesen aus provisioning/config/profiles.json und den Zonen-Docs. Wenn sich
// dort etwas aendert, aendert es sich hier - nicht umgekehrt.
export type Zone = {
  id: string;
  name: string;
  analogue: string;   // die Netzanalogie, aus der das Modell kommt
  runtime: string;
  vpn: string;
  lockdown: boolean;
  play: string;
  unlock: string;
  note?: string;
};

export const zones: Zone[] = [
  {
    id: "home", name: "Home", analogue: "trusted LAN", runtime: "always",
    vpn: "Tailscale, private", lockdown: false, play: "none",
    unlock: "fingerprint + PIN",
    note: "The actual life: messaging, secrets, the self-hosted services, maps without Google. No Play services — a hard rule, not a preference.",
  },
  {
    id: "cloud", name: "Cloud", analogue: "DMZ", runtime: "always",
    vpn: "RethinkDNS, monitoring", lockdown: false, play: "sandboxed, throwaway account",
    unlock: "PIN",
    note: "Where Google may live: maps, video, and a narrow bridge to the self-hosted side. Play is allowed here, and the DNS filter watches.",
  },
  {
    id: "gadgets", name: "Gadgets", analogue: "IoT VLAN", runtime: "on demand",
    vpn: "RethinkDNS, aggressive", lockdown: true, play: "sandboxed, throwaway account",
    unlock: "PIN",
    note: "Vendor apps for a fitness machine or a 3D printer. Not hardened despite them — hardened because of them.",
  },
  {
    id: "ops", name: "Ops", analogue: "management VLAN", runtime: "stopped",
    vpn: "Tailscale, business", lockdown: false, play: "none",
    unlock: "fingerprint + PIN",
    note: "Admin tooling: a cloud console, an SSH client, a second tailnet. Stopped means the keys are evicted — encrypted at rest, not merely in the background.",
  },
  {
    id: "lab", name: "Lab", analogue: "guest VLAN", runtime: "on demand",
    vpn: "as needed", lockdown: false, play: "as needed",
    unlock: "PIN",
    note: "Deliberately empty, no VPN, started when needed. What breaks here reaches nothing else.",
  },
  {
    id: "anon", name: "Anon", analogue: "—", runtime: "stopped",
    vpn: "Orbot", lockdown: true, play: "none",
    unlock: "password only, no fingerprint",
    note: "Everything through Tor. Lockdown is mandatory: without it, traffic leaves past Tor silently.",
  },
];
