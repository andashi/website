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
  plain: string;      // ein Satz fuer jemanden, der keine VLANs kennt
  note?: string;
};

export const zones: Zone[] = [
  {
    id: "home", name: "Home", analogue: "trusted LAN", runtime: "always",
    vpn: "Tailscale, private", lockdown: false, play: "none",
    unlock: "fingerprint + PIN",
    plain: "Your own life: messages, photos, passwords, the house. Nothing from Google in it, ever.",
    note: "The actual life: messaging, secrets, the self-hosted services, maps without Google. No Play services — a hard rule, not a preference.",
  },
  {
    id: "cloud", name: "Cloud", analogue: "DMZ", runtime: "always",
    vpn: "RethinkDNS, monitoring", lockdown: false, play: "sandboxed, throwaway account",
    unlock: "PIN",
    plain: "The apps that insist on Google, like maps, video and the car key, kept in a room of their own.",
    note: "Where Google may live: maps, video, Play allowed, and the DNS filter watching. Plus the hosted password manager, reachable from anywhere. No path to the self-hosted side — this zone's one VPN slot is the filter.",
  },
  {
    id: "gadgets", name: "Gadgets", analogue: "IoT VLAN", runtime: "on demand",
    vpn: "RethinkDNS, aggressive", lockdown: true, play: "sandboxed, throwaway account",
    unlock: "PIN",
    plain: "The vendor apps for the printer, the treadmill, the smart plug. Started when needed, filtered hard.",
    note: "Vendor apps for a fitness machine or a 3D printer. Not hardened despite them — hardened because of them.",
  },
  {
    id: "ops", name: "Ops", analogue: "management VLAN", runtime: "stopped",
    vpn: "Tailscale, business", lockdown: false, play: "none",
    unlock: "fingerprint + PIN",
    plain: "Tools for running servers. Switched off and locked until you need them.",
    note: "Admin tooling: a cloud console, an SSH client, a second tailnet. Stopped means the keys are evicted — encrypted at rest, not merely in the background.",
  },
  {
    id: "lab", name: "Lab", analogue: "guest VLAN", runtime: "on demand",
    vpn: "as needed", lockdown: false, play: "as needed",
    unlock: "PIN",
    plain: "An empty room for trying an app you do not trust yet, and for clearing out afterwards.",
    note: "Deliberately empty, no VPN, started when needed. What breaks here reaches nothing else.",
  },
  {
    id: "anon", name: "Anon", analogue: "—", runtime: "stopped",
    vpn: "Orbot", lockdown: true, play: "none",
    unlock: "password only, no fingerprint",
    plain: "Everything through Tor. Switched off when unused, opened by password only.",
    note: "Everything through Tor. Lockdown is mandatory: without it, traffic leaves past Tor silently.",
  },
];
