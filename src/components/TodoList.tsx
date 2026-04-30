import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Column,
  Grid,
  Tag,
  Tile,
} from '@carbon/react';
import { Add } from '@carbon/icons-react';
import AddTodoPanel, { type NewTodoData } from './AddTodoPanel';

interface TodoItem {
  id: number;
  title: string;
  description: string;
  client: string | null;
  reminder: string | null;
  repeat: boolean;
  owner: string | null;
  dueDate: string | null;
  serviceTypes: string[];
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, title: 'Review client onboarding documents', description: '', client: null, reminder: null, repeat: false, owner: null, dueDate: null, serviceTypes: ['სესხი'], completed: false },
    { id: 2, title: 'Update account details', description: '', client: null, reminder: null, repeat: false, owner: null, dueDate: null, serviceTypes: [], completed: true },
  ]);
  const [panelOpen, setPanelOpen] = useState(false);

  const addTodo = (data: NewTodoData) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: data.title,
        description: data.description,
        client: data.client?.text ?? null,
        reminder: data.reminder,
        repeat: data.repeat,
        owner: data.owner?.text ?? null,
        dueDate: data.dueDate,
        serviceTypes: data.serviceTypes.map((s) => s.text),
        completed: false,
      },
    ]);
    setPanelOpen(false);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <div className="breadcrumb-bar">
        <Breadcrumb noTrailingSlash aria-label="Page breadcrumb">
          <BreadcrumbItem href="/">მთავარი</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>დავალებები</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="content-section">
        <Grid className="todo-grid">
          <Column sm={4} md={8} lg={8}>
            <div className="todo-list-panel">
            <div className="todo-header">
              <div className="todo-header__top">
                <div>
                  <h2>დავალებების სია</h2>
                  <p className="todo-subtitle">
                    {todos.filter((t) => !t.completed).length} დარჩენილი /{' '}
                    {todos.length} სულ
                  </p>
                </div>
                <Button
                  renderIcon={Add}
                  iconDescription="დავალების დამატება"
                  onClick={() => setPanelOpen(true)}
                >
                  დავალების დამატება
                </Button>
              </div>
            </div>

            {todos.length === 0 ? (
              <Tile className="todo-empty">
                <p>დავალებები არ არის. დაამატეთ პირველი დავალება.</p>
              </Tile>
            ) : (
              <div className="todo-list">
                {todos.map((todo) => (
                  <Tile
                    key={todo.id}
                    className={`todo-item${todo.completed ? ' todo-item--done' : ''}`}
                  >
                    <div className="todo-item-inner">
                      <Checkbox
                        id={`todo-${todo.id}`}
                        labelText={todo.title}
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                      />
                      <div className="todo-item-actions">
                        {todo.dueDate && (
                          <Tag type="cool-gray" size="sm">{todo.dueDate}</Tag>
                        )}
                        {todo.serviceTypes.map((st) => (
                          <Tag key={st} type="teal" size="sm">{st}</Tag>
                        ))}
                        <Button
                          kind="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          aria-label={`"${todo.title}" — წაშლა`}
                        >
                          წაშლა
                        </Button>
                      </div>
                    </div>
                    {todo.description && (
                      <p className="todo-item-desc">{todo.description}</p>
                    )}
                  </Tile>
                ))}
              </div>
            )}
            </div>{/* todo-list-panel */}
          </Column>
        </Grid>
      </div>

      <AddTodoPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onSubmit={addTodo}
      />
    </>
  );
};

export default TodoList;
