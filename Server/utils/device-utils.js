export const validBody = (obj) => {
  const expectedKeys = [
    "id",
    "sensor1",
    "sensor2",
    "sensor3",
    "sensor4",
    "sensor5",
    "sensor6",
  ];
  const bodyKeys = Object.keys(obj);
  return (
    expectedKeys.every((key) => bodyKeys.includes(key)) &&
    bodyKeys.length === expectedKeys.length
  );
};

export function sensorWithPosition(positions, values) {
  const resultado = {};
  resultado["id"] = values.id;
  positions.forEach((sensor) => {
    const { index, position } = sensor.dataValues;
    const sensorName = `sensor${index}`;

    if (values.hasOwnProperty(sensorName)) {
      resultado[sensorName] = {
        value: values[sensorName],
        position: position,
        index,
      };
    }
  });

  return resultado;
}
