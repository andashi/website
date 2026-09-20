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
    note: "No Play services. Hard rule, not negotiable. Work lives inside Home as a managed profile.",
  },
  {
    id: "cloud", name: "Cloud", analogue: "DMZ", runtime: "always",
    vpn: "RethinkDNS, monitoring", lockdown: false, play: "sandboxed, throwaway account",
    unlock: "PIN",
    note: "Where an app may talk to whoever it likes, and nothing else can see it.",
  },
  {
    id: "gadgets", name: "Gadgets", analogue: "IoT VLAN", runtime: "on demand",
    vpn: "RethinkDNS, aggressive", lockdown: true, play: "sandboxed, throwaway account",
    unlock: "PIN",
    note: "Lockdown is what keeps the IoT zone from bypassing its own filter.",
  },
  {
    id: "ops", name: "Ops", analogue: "management VLAN", runtime: "stopped",
    vpn: "Tailscale, business", lockdown: false, play: "none",
    unlock: "fingerprint + PIN",
    note: "Stopped means the keys are evicted: encrypted at rest, not merely in the background.",
  },
  {
    id: "lab", name: "Lab", analogue: "guest VLAN", runtime: "on demand",
    vpn: "as needed", lockdown: false, play: "as needed",
    unlock: "PIN",
    note: "Wiped often. Real amnesia here is pm clear and a re-run, both scripted.",
  },
  {
    id: "anon", name: "Anon", analogue: "—", runtime: "stopped",
    vpn: "Orbot", lockdown: true, play: "none",
    unlock: "password only, no fingerprint",
    note: "Lockdown is mandatory: without it, traffic leaves past Tor silently.",
  },
];
