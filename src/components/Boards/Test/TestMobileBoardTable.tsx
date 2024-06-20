import React from "react";
import { SimplePost } from "../../../model/props/posts";

type Props = {
  posts: SimplePost[];
  annoucements: SimplePost[];
};

export default function TestMobileBoardTable({ posts, annoucements }: Props) {
  return <div>TestMobileBoardTable</div>;
}
