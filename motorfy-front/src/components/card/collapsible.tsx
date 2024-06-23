import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CollapsibleCardProps = {
  title: string;
  width?: string;
  children: React.ReactNode;
};

const CollapsibleCard = ({ title, children, width }: CollapsibleCardProps) => {
  return (
    <Accordion type="single" collapsible className={`w-[${width ?? "230"}px]`}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-sm">{title}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CollapsibleCard;
