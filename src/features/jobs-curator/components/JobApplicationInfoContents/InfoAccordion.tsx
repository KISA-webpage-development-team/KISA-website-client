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
import { InfoContent } from "../../types/infoContents";

function InfoAccordionItem({
  title,
  content,
  value,
}: {
  title: string;
  content: React.ReactNode;
  value: string;
}) {
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
        />
      ))}
    </Accordion>
  );
}
