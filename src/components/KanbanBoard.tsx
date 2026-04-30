import { useState, useMemo, useRef } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  DatePicker,
  DatePickerInput,
  FeatureFlags,
  IconButton,
  MenuItem,
  MenuItemDivider,
  OverflowMenu,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Tag,
  Tile,
} from '@carbon/react';
import { Add, Calendar, Filter, Flag, TrashCan, User } from '@carbon/icons-react';
import AddTodoPanel, { type NewTodoData } from './AddTodoPanel';

type Priority = 'high' | 'medium' | 'low';
type Status = 'todo' | 'inprogress' | 'done';
type FilterItem = { id: string; text: string };

const CURRENT_USER_INITIALS = 'AT';

interface KanbanCard {
  id: string;
  title: string;
  serviceTypes: string[];
  date: string;
  priority: Priority;
  assigneeInitials: string;
  status: Status;
  flagged: boolean;
}

const COLUMNS: Array<{ id: Status; label: string }> = [
  { id: 'todo', label: 'TO DO' },
  { id: 'inprogress', label: 'IN PROGRESS' },
  { id: 'done', label: 'DONE' },
];

const INITIAL_CARDS: KanbanCard[] = [
  {
    id: 'TBC-101',
    title: 'KYC შემოწმება',
    serviceTypes: ['KYC'],
    date: 'Apr 28, 2026',
    priority: 'high',
    assigneeInitials: 'AT',
    status: 'todo',
    flagged: false,
  },
  {
    id: 'TBC-102',
    title: 'სესხის განაცხადის გადახედვა',
    serviceTypes: ['სესხი', 'შემოწმება'],
    date: 'Apr 30, 2026',
    priority: 'medium',
    assigneeInitials: 'BG',
    status: 'todo',
    flagged: false,
  },
  {
    id: 'TBC-106',
    title: 'კლიენტის მონაცემების განახლება',
    serviceTypes: ['KYC', 'პროფილი'],
    date: 'May 2, 2026',
    priority: 'high',
    assigneeInitials: 'NL',
    status: 'todo',
    flagged: true,
  },
  {
    id: 'TBC-107',
    title: 'სადაზღვევო პოლისის გაფორმება',
    serviceTypes: ['დაზღვევა'],
    date: 'May 5, 2026',
    priority: 'medium',
    assigneeInitials: 'ST',
    status: 'todo',
    flagged: false,
  },
  {
    id: 'TBC-108',
    title: 'ბიზნეს სესხის შეფასება',
    serviceTypes: ['სესხი', 'ბიზნესი'],
    date: 'May 3, 2026',
    priority: 'high',
    assigneeInitials: 'MK',
    status: 'todo',
    flagged: false,
  },
  {
    id: 'TBC-109',
    title: 'ვალუტის გადაცვლის ოპერაცია',
    serviceTypes: ['გადაცვლა'],
    date: 'May 1, 2026',
    priority: 'low',
    assigneeInitials: 'BG',
    status: 'todo',
    flagged: false,
  },
  {
    id: 'TBC-103',
    title: 'ანგარიშის გახსნა',
    serviceTypes: ['ანგარიში'],
    date: 'Apr 25, 2026',
    priority: 'medium',
    assigneeInitials: 'MK',
    status: 'inprogress',
    flagged: false,
  },
  {
    id: 'TBC-110',
    title: 'კრედიტის ლიმიტის გადახედვა',
    serviceTypes: ['ბარათი', 'კრედიტი'],
    date: 'Apr 29, 2026',
    priority: 'high',
    assigneeInitials: 'AT',
    status: 'inprogress',
    flagged: true,
  },
  {
    id: 'TBC-111',
    title: 'საერთაშორისო გადარიცხვა',
    serviceTypes: ['გადარიცხვა'],
    date: 'Apr 27, 2026',
    priority: 'medium',
    assigneeInitials: 'NL',
    status: 'inprogress',
    flagged: false,
  },
  {
    id: 'TBC-112',
    title: 'ანტი-ფიშინგ გადამოწმება',
    serviceTypes: ['უსაფრთხოება', 'KYC'],
    date: 'Apr 26, 2026',
    priority: 'high',
    assigneeInitials: 'ST',
    status: 'inprogress',
    flagged: true,
  },
  {
    id: 'TBC-113',
    title: 'დეპოზიტის გახსნა',
    serviceTypes: ['დეპოზიტი'],
    date: 'Apr 24, 2026',
    priority: 'low',
    assigneeInitials: 'BG',
    status: 'inprogress',
    flagged: false,
  },
  {
    id: 'TBC-104',
    title: 'ბარათის განახლება',
    serviceTypes: ['ბარათი'],
    date: 'Apr 20, 2026',
    priority: 'low',
    assigneeInitials: 'ST',
    status: 'done',
    flagged: false,
  },
  {
    id: 'TBC-105',
    title: 'ტრანზაქციის შემოწმება',
    serviceTypes: ['გადარიცხვა'],
    date: 'Apr 22, 2026',
    priority: 'high',
    assigneeInitials: 'AT',
    status: 'done',
    flagged: false,
  },
  {
    id: 'TBC-114',
    title: 'მობაილ ბანკის ავტორიზაცია',
    serviceTypes: ['ციფრული', 'უსაფრთხოება'],
    date: 'Apr 18, 2026',
    priority: 'medium',
    assigneeInitials: 'MK',
    status: 'done',
    flagged: false,
  },
  {
    id: 'TBC-115',
    title: 'საპენსიო ანაბრის კონსულტაცია',
    serviceTypes: ['დეპოზიტი', 'კონსულტაცია'],
    date: 'Apr 15, 2026',
    priority: 'low',
    assigneeInitials: 'NL',
    status: 'done',
    flagged: false,
  },
];

const PRIORITY_TAG_TYPE: Record<Priority, 'red' | 'cool-gray' | 'green'> = {
  high: 'red',
  medium: 'cool-gray',
  low: 'green',
};

const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
};

// Carbon tag types — one per unique service type label
const TAG_TYPES = [
  'teal',
  'purple',
  'blue',
  'magenta',
  'cyan',
  'warm-gray',
] as const;

type TagType = (typeof TAG_TYPES)[number];

const tagTypeCache = new Map<string, TagType>();
let tagTypeIndex = 0;

const getTagType = (label: string): TagType => {
  if (!tagTypeCache.has(label)) {
    tagTypeCache.set(label, TAG_TYPES[tagTypeIndex % TAG_TYPES.length]);
    tagTypeIndex++;
  }
  return tagTypeCache.get(label)!;
};

// Carbon categorical palette — one color per unique assignee
const ASSIGNEE_COLORS = [
  '#6929c4', // purple-70
  '#1192e8', // cyan-50
  '#005d5d', // teal-70
  '#9f1853', // magenta-70
  '#fa4d56', // red-50
  '#570408', // red-90
  '#198038', // green-60
  '#002d9c', // blue-80
];

const assigneeColorCache = new Map<string, string>();
let colorIndex = 0;

const getAssigneeColor = (initials: string): string => {
  if (!assigneeColorCache.has(initials)) {
    assigneeColorCache.set(initials, ASSIGNEE_COLORS[colorIndex % ASSIGNEE_COLORS.length]);
    colorIndex++;
  }
  return assigneeColorCache.get(initials)!;
};

const MOVE_TARGETS: Array<{ target: Status; label: string }> = [
  { target: 'todo', label: 'To Do' },
  { target: 'inprogress', label: 'In Progress' },
  { target: 'done', label: 'Done' },
];

const KanbanBoard = () => {
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [cards, setCards] = useState<KanbanCard[]>(INITIAL_CARDS);
  const [addPanelOpen, setAddPanelOpen] = useState(false);

  // Toolbar filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [labelFilter, setLabelFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');
  const [flagFilter, setFlagFilter] = useState(false);

  // Derived filter items
  const labelFilterItems = useMemo<FilterItem[]>(() => {
    const labels = Array.from(new Set(cards.flatMap((c) => c.serviceTypes)));
    return [{ id: 'all', text: 'All labels' }, ...labels.map((l) => ({ id: l, text: l }))];
  }, [cards]);

  const assignedFilterItems = useMemo<FilterItem[]>(() => {
    const assignees = Array.from(new Set(cards.map((c) => c.assigneeInitials)));
    return [
      { id: 'all', text: 'All' },
      { id: 'me', text: 'Me' },
      ...assignees.map((a) => ({ id: a, text: a })),
    ];
  }, [cards]);

  // Filtered cards
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (searchQuery && !card.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      if (selectedDate) {
        const targetDate = new Date(selectedDate);
        targetDate.setHours(0, 0, 0, 0);
        const cardDate = new Date(card.date);
        cardDate.setHours(0, 0, 0, 0);
        if (cardDate.getTime() !== targetDate.getTime()) return false;
      }

      if (labelFilter !== 'all' && !card.serviceTypes.includes(labelFilter)) return false;

      if (assignedFilter === 'me' && card.assigneeInitials !== CURRENT_USER_INITIALS) return false;
      if (assignedFilter !== 'all' && assignedFilter !== 'me' && card.assigneeInitials !== assignedFilter) return false;

      if (flagFilter && !card.flagged) return false;

      return true;
    });
  }, [cards, searchQuery, selectedDate, labelFilter, assignedFilter, flagFilter]);

  const handleAddTodo = (data: NewTodoData) => {
    const newCard: KanbanCard = {
      id: `TBC-${Date.now()}`,
      title: data.title,
      serviceTypes: data.serviceTypes.map((s) => s.text),
      date: data.dueDate ?? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      priority: 'medium',
      assigneeInitials: data.owner ? data.owner.text.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() : '??',
      status: 'todo',
      flagged: false,
    };
    setCards((prev) => [newCard, ...prev]);
    setAddPanelOpen(false);
  };

  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const moveCard = (id: string, status: Status) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <>
      <div className="breadcrumb-bar">
        <Breadcrumb noTrailingSlash aria-label="Page breadcrumb">
          <BreadcrumbItem href="/">მთავარი</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>დავალებები</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="kanban-page-header">
        <div className="kanban-page-header__top">
          <div>
            <h2>დავალებები</h2>
          </div>
          <div className="kanban-page-header__actions">
            <Button
              renderIcon={Add}
              iconDescription="დავალების დამატება"
              onClick={() => setAddPanelOpen(true)}
            >
              დავალების დამატება
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <TableToolbar className="kanban-toolbar" aria-label="Tasks toolbar">
            <TableToolbarContent className="kanban-toolbar__content">
              <TableToolbarSearch
                persistent
                labelText="Search tasks"
                placeholder="ძებნა..."
                value={searchQuery}
                onChange={(event, value) => setSearchQuery(value ?? event.currentTarget.value)}
              />
              <div className="kanban-toolbar__filters">
              <div className="kanban-toolbar__date-picker">
                <IconButton
                  kind="ghost"
                  size="sm"
                  label="Filter by date"
                  align="bottom"
                  onClick={() => {
                    dateInputRef.current?.focus();
                    dateInputRef.current?.click();
                  }}
                >
                  <Calendar size={16} />
                </IconButton>
                <DatePicker
                  datePickerType="single"
                  onChange={(dates) => {
                    const [date] = dates as Date[];
                    setSelectedDate(date ?? null);
                  }}
                >
                  <DatePickerInput
                    id="filter-date"
                    ref={dateInputRef}
                    labelText="Date"
                    hideLabel
                    placeholder="Select date"
                    size="sm"
                    className="kanban-toolbar__date-picker-input--hidden"
                  />
                </DatePicker>
              </div>
              <div className="kanban-toolbar__menu-filter">
                <OverflowMenu
                  aria-label={`Label filter: ${labelFilterItems.find((item) => item.id === labelFilter)?.text ?? 'All labels'}`}
                  renderIcon={Filter}
                >
                  {labelFilterItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      label={item.text}
                      onClick={() => setLabelFilter(item.id)}
                    />
                  ))}
                </OverflowMenu>
              </div>
              <IconButton
                kind={flagFilter ? 'primary' : 'ghost'}
                size="sm"
                label="Show flagged only"
                align="bottom"
                onClick={() => setFlagFilter((prev) => !prev)}
              >
                <Flag size={16} />
              </IconButton>
              <div className="kanban-toolbar__menu-filter">
                <OverflowMenu
                  aria-label={`Assignee filter: ${assignedFilterItems.find((item) => item.id === assignedFilter)?.text ?? 'Me'}`}
                  renderIcon={User}
                >
                  {assignedFilterItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      label={item.text}
                      onClick={() => setAssignedFilter(item.id)}
                    />
                  ))}
                </OverflowMenu>
              </div>
              </div>
            </TableToolbarContent>
          </TableToolbar>
      </div>

      <div className="kanban-board-section">
        <div className="kanban-board" role="region" aria-label="დავალებები">
            {COLUMNS.map((col) => {
              const colCards = filteredCards.filter((c) => c.status === col.id);
              return (
                <div
                  key={col.id}
                  className={`kanban-column kanban-column--${col.id}`}
                >
                  <div className="kanban-column__header">
                    <span className="kanban-column__label">{col.label}</span>
                    <Tag type="cool-gray" size="sm">
                      {colCards.length}
                    </Tag>
                  </div>

                  <div className="kanban-column__body">
                    {colCards.map((card) => (
                      <Tile
                        key={card.id}
                        className="kanban-card"
                      >
                        {/* Row 1: Title + menu */}
                        <div className="kanban-card__header">
                          <h4 className="kanban-card__title">{card.title}</h4>
                          <div className="kanban-card__menu">
                            <FeatureFlags flags={{ 'enable-v12-overflowmenu': true }}>
                              <OverflowMenu
                                aria-label={`${card.title} — მენიუ`}
                                size="sm"
                              >
                                <MenuItem label="სტატუსის ცვლილება">
                                  {MOVE_TARGETS.filter(
                                    (m) => m.target !== col.id
                                  ).map((m) => (
                                    <MenuItem
                                      key={m.target}
                                      label={m.label}
                                      onClick={() => moveCard(card.id, m.target)}
                                    />
                                  ))}
                                </MenuItem>
                                <MenuItemDivider />
                                <MenuItem
                                  label="გამნიშვნელოვანება"
                                  renderIcon={Flag}
                                />
                                <MenuItemDivider />
                                <MenuItem
                                  label="წაშლა"
                                  kind="danger"
                                  renderIcon={TrashCan}
                                  onClick={() => deleteCard(card.id)}
                                />
                              </OverflowMenu>
                            </FeatureFlags>
                          </div>
                        </div>

                        {/* Row 2: Tags */}
                        <div className="kanban-card__tags">
                          {card.serviceTypes.map((st) => (
                            <Tag key={st} type={getTagType(st)} size="sm">
                              {st}
                            </Tag>
                          ))}
                        </div>

                        {/* Row 3: Date + flag + avatar */}
                        <div className="kanban-card__footer">
                          <div className="kanban-card__date">
                            <Calendar size={14} aria-hidden="true" />
                            <span>{card.date}</span>
                          </div>
                          <div className="kanban-card__meta">
                            <Flag
                              size={14}
                              className="kanban-card__flag"
                              aria-label={`Priority: ${PRIORITY_LABEL[card.priority]}`}
                            />
                            <div
                              className="kanban-card__assignee"
                              style={{ backgroundColor: getAssigneeColor(card.assigneeInitials) }}
                              role="img"
                              aria-label={`Assigned to ${card.assigneeInitials}`}
                            >
                              {card.assigneeInitials}
                            </div>
                          </div>
                        </div>
                      </Tile>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
      </div>
      <AddTodoPanel
        open={addPanelOpen}
        onClose={() => setAddPanelOpen(false)}
        onSubmit={handleAddTodo}
      />
    </>
  );
};

export default KanbanBoard;
