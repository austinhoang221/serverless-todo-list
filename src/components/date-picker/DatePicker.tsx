import { useRef } from "react";
import { Card, Flex, VisuallyHidden } from "@aws-amplify/ui-react";
import { Calendar, Icon } from "lucide-react";
import dayjs from "dayjs";

type DatePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    hiddenInputRef.current?.showPicker?.(); // for browsers that support it
    hiddenInputRef.current?.click(); // fallback
  };

  return (
    <>
    
    {!value ? (<Calendar size={18} onClick={handleIconClick}/>) : (
        <Card variation="elevated" padding="0.5rem">
      <Flex alignItems="center" onClick={handleIconClick} fontSize="14px">
        <Calendar size={18} />
        Deadline: {dayjs(value).format('dddd, MMMM D')}
      </Flex>
        </Card>
    )}
        

      <VisuallyHidden>
        <input
          type="date"
          value={value}
          ref={hiddenInputRef}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </VisuallyHidden>
    </>
  );
}
