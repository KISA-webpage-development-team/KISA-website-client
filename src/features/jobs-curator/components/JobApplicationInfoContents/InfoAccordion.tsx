import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { ContentAuthor, InfoContent } from "../../types/infoContents";
import Link from "next/link";

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
      <AccordionTrigger
        className={`${sejongHospitalBold.className} text-left text-xl`}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent
        className={`${sejongHospitalLight.className} text-base`}
      >
        {content}

        <div className={`${sejongHospitalLight.className} text-right w-full`}>
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
