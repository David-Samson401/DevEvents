export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string; // YYYY-MM-DD
  time: string; // human-friendly time or range
};

export const events: EventItem[] = [
  {
    title: "Next.js Conf",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA, USA",
    date: "2026-03-10",
    time: "09:00 AM – 05:00 PM",
  },
  {
    title: "React Summit",
    image: "/images/event2.png",
    slug: "react-summit-2026",
    location: "Amsterdam, NL",
    date: "2026-04-22",
    time: "09:30 AM – 06:00 PM",
  },
  {
    title: "JSConf EU",
    image: "/images/event3.png",
    slug: "jsconf-eu-2026",
    location: "Berlin, DE",
    date: "2026-05-14",
    time: "10:00 AM – 05:00 PM",
  },
  {
    title: "KubeCon + CloudNative",
    image: "/images/event4.png",
    slug: "kubecon-cloudnative-2026",
    location: "Barcelona, ES",
    date: "2026-06-02",
    time: "08:30 AM – 06:00 PM",
  },
  {
    title: "PyCon US",
    image: "/images/event5.png",
    slug: "pycon-us-2026",
    location: "Chicago, IL, USA",
    date: "2026-04-09",
    time: "09:00 AM – 05:00 PM",
  },
  {
    title: "Hackathon Weekend",
    image: "/images/event6.png",
    slug: "hackathon-weekend-2026",
    location: "Cambridge, MA, USA",
    date: "2026-02-21",
    time: "06:00 PM (Fri) – 06:00 PM (Sun)",
  },
  {
    title: "Full-Stack Dev Meetup",
    image: "/images/event-full.png",
    slug: "fullstack-meetup-2026",
    location: "Toronto, CA",
    date: "2026-07-20",
    time: "06:30 PM – 09:00 PM",
  },
];
