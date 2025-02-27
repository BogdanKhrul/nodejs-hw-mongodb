const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isContactType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isContactType(type)) return type;
};

const parseIsFavourite = (value) => {
  const isBoolean = typeof value === 'boolean';
  if (!isBoolean) return;
  const isFavouriteValue = (value) => [true, false].includes(value);
  if (isFavouriteValue(value)) return value;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;
  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedType,
  };
};
