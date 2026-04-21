import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@umichkisa-ds/web";
import Link from "next/link";

import { ContentAuthor, InfoContent } from "../../types/infoContents";

function InfoAccordionItem({
  title,
  content,
  value,
  author,
}: {
  title: string;
  content: React.ReactNode;
  value: string;
  author: ContentAuthor;
}) {
  const { name, email, classOf } = author;
  const formattedAuthor = `${name} Class of ${classOf}`;

  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-left">{title}</AccordionTrigger>
      <AccordionContent>
        {content}

        <div className="type-body-sm text-muted-foreground text-right w-full mt-4">
          {email ? (
            <Link href={`/users/${email}`} className="hover:underline">
              {formattedAuthor}
            </Link>
          ) : (
            <span>{formattedAuthor}</span>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function InfoAccordion({
  infoContents,
}: {
  infoContents: InfoContent[];
}) {
  return (
    <Accordion type="multiple" className="w-full">
      {infoContents.map((item) => (
        <InfoAccordionItem
          key={item.id}
          value={item.id}
          title={item.title}
          content={item.content}
          author={item.author}
        />
      ))}
    </Accordion>
  );
}
