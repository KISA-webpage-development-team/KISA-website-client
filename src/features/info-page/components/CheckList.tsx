"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@umichkisa-ds/web";

import {
  checkListData,
  type CheckListItem,
} from "@/features/info-page/data/checkListPageData";

type Props = {
  items?: CheckListItem[];
};

export default function CheckList({ items = checkListData }: Props) {
  return (
    <Accordion type="multiple" className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>
            <span className="type-h3 text-left text-foreground">
              {item.title}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="type-body text-foreground">{item.desc}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
