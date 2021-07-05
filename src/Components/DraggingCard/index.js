import { useDrag } from "react-dnd";
import { ItemTypes } from '../../ItemTypes';
import styles from "./styles.module.css";

function DraggingCard({ type, id }) {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { type, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  return (
    <div
      className={styles.dragCard}
      ref={drag}
      style={{ opacity: isDragging ? '0.4' : '1'}}
      data-testid={`box-${type}`}
    >
      {type}
    </div>
  );
}

export default DraggingCard;
