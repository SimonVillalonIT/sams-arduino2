// Container.js
import { useCallback, useState } from "react";
import update from "immutability-helper";
import Sensor from "./sensor-item";

export const Container = ({ data }: { data: (Sensor | undefined)[] }) => {
  const [cards, setCards] = useState(data);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: (Sensor | undefined)[]) => {
      const dragCard = prevCards[dragIndex] as Sensor;
      const updatedCards = update(prevCards, {
        $splice: [
          [dragIndex, 1, prevCards[hoverIndex]], // Replace dragIndex with hoverIndex card
          [hoverIndex, 1, dragCard], // Replace hoverIndex with dragIndex card
        ],
      });
      return updatedCards;
    });
  }, []);

  const renderCard = useCallback((card: Sensor | undefined, index: number) => {
    if (!card) return null;
    return (
      <Sensor
        key={index}
        index={index}
        id={index}
        value={card.value}
        position={card.position}
        moveCard={moveCard}
      />
    );
  }, [moveCard]);

  return (
    <div className="grid grid-cols-2 shadow-md shadow-base-300/70 w-full h-full">
      {cards.map((card, i) => renderCard(card, i))}
    </div>
  );
};

export default Container;

