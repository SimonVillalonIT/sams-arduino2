export const validBody = (obj) => {
    const expectedKeys = ['id','sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5', 'sensor6'];
    const bodyKeys = Object.keys(obj);
    return expectedKeys.every((key) => bodyKeys.includes(key)) && bodyKeys.length === expectedKeys.length;
}
