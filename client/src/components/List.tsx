import type { ListProps } from "@/types/ListProps";

export function List<T>({ items, renderItem, className = "" }: ListProps<T>) {
  return (
    <ul className={className}>
      {items.map((item, idx) => (
        <li key={idx}>{renderItem(item, idx)}</li>
      ))}
    </ul>
  );
}
