// Home page sponsor strip data — corporate sponsors of KISA.
// Image lookup: /public/sponsor/logo/{id}.png

export interface SponsorEntry {
  id: string;
  title: string;
  url: string;
}

export const sponsorData: readonly SponsorEntry[] = [
  {
    id: "total_wireless",
    title: "Total Wireless",
    url: "https://www.totalwireless.com/stores/mi/ann-arbor/4659-washtenaw-ave",
  },
  {
    id: "hello_med",
    title: "Hello Med",
    url: "https://www.hello-med.com/",
  },
  {
    id: "meta_code",
    title: "Meta Code",
    url: "https://www.metacodes.co.kr/",
  },
  {
    id: "fast_campus",
    title: "Fast Campus",
    url: "https://fastcampus.co.kr/",
  },
  {
    id: "rezi",
    title: "Rezi",
    url: "https://www.rezi.ai/",
  },
  {
    id: "potobox",
    title: "Potobox",
    url: "https://www.potobox.com/",
  },
];

export const SPONSOR_FORM_URL =
  "https://umich.qualtrics.com/jfe/form/SV_3pEWxPBxDOahdps";
