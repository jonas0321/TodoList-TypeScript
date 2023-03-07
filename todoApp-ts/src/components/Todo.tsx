import {type Todo as TodoType} from '../types'
interface Props extends TodoType {
  onToggleCompleteTodo: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;

  onRemoveTodo: (id: string) => void;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onToggleCompleteTodo,
}) => {
  return (
    <div className="view">
      <input
        className="toggle"
        checked={completed}
        type="checkbox"
        onChange={(event) => {onToggleCompleteTodo({id, completed:event.target.checked})}}
      />
      <label>{title}</label>
      <button
        className="destroy"
        onClick={() => {
          onRemoveTodo(id);
        }}
      />
    </div>
  );
};