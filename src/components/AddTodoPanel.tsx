import { useState } from 'react';
import { SidePanel } from '@carbon/ibm-products';
import {
  ComboBox,
  DatePicker,
  DatePickerInput,
  FilterableMultiSelect,
  TextArea,
  TextInput,
  Toggle,
} from '@carbon/react';

type ComboItem = { id: string; text: string };

const clientItems: ComboItem[] = [
  { id: '1', text: 'გიორგი მამულაშვილი' },
  { id: '2', text: 'ნინო ბერიძე' },
  { id: '3', text: 'დავით კვარაცხელია' },
  { id: '4', text: 'ანა ჩიქოვანი' },
  { id: '5', text: 'ლევან გელაშვილი' },
];

const ownerItems: ComboItem[] = [
  { id: '1', text: 'მარიამ ჩხიკვაძე' },
  { id: '2', text: 'ზურაბ ღვინიაშვილი' },
  { id: '3', text: 'სალომე ნარიმანიძე' },
];

const serviceTypeItems: ComboItem[] = [
  { id: '1', text: 'სესხი' },
  { id: '2', text: 'დეპოზიტი' },
  { id: '3', text: 'კარტი' },
  { id: '4', text: 'გადარიცხვა' },
  { id: '5', text: 'სადაზღვევო' },
  { id: '6', text: 'ინვესტიცია' },
];

export interface NewTodoData {
  title: string;
  description: string;
  client: ComboItem | null;
  reminder: string | null;
  repeat: boolean;
  owner: ComboItem | null;
  dueDate: string | null;
  serviceTypes: ComboItem[];
}

interface AddTodoPanelProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewTodoData) => void;
}

const AddTodoPanel = ({ open, onClose, onSubmit }: AddTodoPanelProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState<ComboItem | null>(null);
  const [reminder, setReminder] = useState<string | null>(null);
  const [repeat, setRepeat] = useState(false);
  const [owner, setOwner] = useState<ComboItem | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [serviceTypes, setServiceTypes] = useState<ComboItem[]>([]);
  const [titleInvalid, setTitleInvalid] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleInvalid(true);
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim(), client, reminder, repeat, owner, dueDate, serviceTypes });
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setClient(null);
    setReminder(null);
    setRepeat(false);
    setOwner(null);
    setDueDate(null);
    setServiceTypes([]);
    setTitleInvalid(false);
    setResetKey((k) => k + 1);
  };

  return (
    <SidePanel
      open={open}
      title="დავალების დამატება"
      subtitle="შეავსეთ ახალი დავალების დეტალები."
      size="md"
      selectorPrimaryFocus="#add-todo-title"
      onRequestClose={handleClose}
      actions={[
        {
          label: 'დამატება',
          onClick: handleSubmit,
          kind: 'primary',
        },
        {
          label: 'გაუქმება',
          onClick: handleClose,
          kind: 'secondary',
        },
      ]}
    >
      <TextInput
        id="add-todo-title"
        labelText="სათაური *"
        placeholder="შეიყვანეთ დავალების სახელი"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (e.target.value.trim()) setTitleInvalid(false);
        }}
        invalid={titleInvalid}
        invalidText="სათაური სავალდებულოა"
      />
      <TextArea
        id="add-todo-description"
        labelText="აღწერა"
        placeholder="დაამატეთ დეტალური აღწერა..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <ComboBox
        id="add-todo-client"
        titleText="კლიენტის მონიშვნა"
        placeholder="კლიენტის ძიება..."
        items={clientItems}
        itemToString={(item) => (item ? item.text : '')}
        selectedItem={client}
        onChange={({ selectedItem }) => setClient(selectedItem ?? null)}
      />
      <DatePicker
        key={`reminder-${resetKey}`}
        datePickerType="single"
        onChange={(dates) =>
          setReminder(dates[0] ? dates[0].toLocaleDateString('ka-GE') : null)
        }
      >
        <DatePickerInput
          id="add-todo-reminder"
          labelText="შეხსენება"
          placeholder="dd/mm/yyyy"
        />
      </DatePicker>
      <Toggle
        id="add-todo-repeat"
        labelText="გამეორება"
        labelA="არა"
        labelB="დიახ"
        toggled={repeat}
        onToggle={(checked) => setRepeat(checked)}
      />
      <ComboBox
        id="add-todo-owner"
        titleText="მფლობელი"
        placeholder="მფლობელის ძიება..."
        items={ownerItems}
        itemToString={(item) => (item ? item.text : '')}
        selectedItem={owner}
        onChange={({ selectedItem }) => setOwner(selectedItem ?? null)}
      />
      <DatePicker
        key={`due-date-${resetKey}`}
        datePickerType="single"
        onChange={(dates) =>
          setDueDate(dates[0] ? dates[0].toLocaleDateString('ka-GE') : null)
        }
      >
        <DatePickerInput
          id="add-todo-due-date"
          labelText="დასრულების თარიღი"
          placeholder="dd/mm/yyyy"
        />
      </DatePicker>
      <FilterableMultiSelect
        key={`service-types-${resetKey}`}
        id="add-todo-service-type"
        titleText="სერვისის ტიპი"
        placeholder="სერვისის ძიება..."
        items={serviceTypeItems}
        itemToString={(item) => (item ? item.text : '')}
        onChange={({ selectedItems }) => setServiceTypes(selectedItems ?? [])}
      />
    </SidePanel>
  );
};

export default AddTodoPanel;
