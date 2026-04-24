import { Form } from "@umichkisa-ds/form";

interface PochaInfoField {
  value: string;
  setValue: (value: string) => void;
  label: string;
  type: string;
  placeholder?: string;
  isError: boolean;
  errorMsg: string;
  errorState: string;
}

interface PochaInfoFieldsProps {
  fields?: PochaInfoField[];
}

export default function PochaInfoFields(_props: PochaInfoFieldsProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Form.Input
        name="title"
        label="포차 이름"
        type="text"
        rules={{ required: "포차 제목을 입력해주세요." }}
      />
      <Form.Input
        name="description"
        label="포차 설명"
        type="text"
        rules={{ required: "포차 설명을 입력해주세요." }}
      />
      <Form.DatePicker
        name="startDate"
        label="시작 날짜"
        rules={{ required: "유효한 시작 날짜를 입력해주세요." }}
      />
      <Form.Input
        name="startTime"
        label="시작 시간"
        type="time"
        rules={{ required: "유효한 시작 시간을 입력해주세요." }}
      />
      <Form.DatePicker
        name="endDate"
        label="종료 날짜"
        rules={{ required: "유효한 종료 날짜를 입력해주세요." }}
      />
      <Form.Input
        name="endTime"
        label="종료 시간"
        type="time"
        rules={{ required: "유효한 종료 시간을 입력해주세요." }}
      />
    </div>
  );
}
