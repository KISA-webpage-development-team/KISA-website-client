// Back-compat re-export.
//
// The delete flow is now a Dialog overlay surfaced from the post page; see
// PostDeleteDialog. This file is kept as a thin re-export so any external
// imports targeting `PostDeleteClient` continue to resolve.

export { default } from "./PostDeleteDialog";
