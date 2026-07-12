const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const icons = [
  { slug: `${ICON_BASE}/c/c-original.svg`, label: "C" },
  { slug: `${ICON_BASE}/cplusplus/cplusplus-original.svg`, label: "C++" },
  { slug: `${ICON_BASE}/python/python-original.svg`, label: "Python" },
  { slug: `${ICON_BASE}/rust/rust-original.svg`, label: "Rust", invert: true },
  { slug: `${ICON_BASE}/linux/linux-original.svg`, label: "Linux", invert: true },
  { slug: `${ICON_BASE}/git/git-original.svg`, label: "Git" },
  { slug: `${ICON_BASE}/docker/docker-original.svg`, label: "Docker" },
  { slug: `${ICON_BASE}/arduino/arduino-original.svg`, label: "Arduino" },
  { slug: `${ICON_BASE}/raspberrypi/raspberrypi-original.svg`, label: "Raspberry Pi" },
  { slug: `${ICON_BASE}/bash/bash-original.svg`, label: "Bash", invert: true },
  { slug: `${ICON_BASE}/kalilinux/kalilinux-original.svg`, label: "Kali Linux" },
  { slug: `${ICON_BASE}/flask/flask-original.svg`, label: "Flask", invert: true },
];

const loop = [...icons, ...icons];

export default function TechMarquee() {
  return (
    <div
      className="relative py-10 border-y border-white/5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      data-testid="tech-marquee"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {loop.map((icon, i) => (
          <div
            key={`${icon.label}-${i}`}
            className="flex items-center justify-center mx-8 sm:mx-10 shrink-0"
            title={icon.label}
          >
            <img
              src={icon.slug}
              alt={icon.label}
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className={`w-8 h-8 sm:w-10 sm:h-10 object-contain opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 ${icon.invert ? "invert" : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
