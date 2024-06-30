import "./info.css";

export const dynamic = "force-static";

export default function InfoLayout({ children }) {
  return children;
}

// [NOTE on rendering method]
// Currently, /info pages are rendered as static page because the information won't change frequently.
// in the future, it will be changed to different rendering method such as ISR.
// This will be done during F24.
