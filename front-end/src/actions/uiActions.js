export const setPreview = card => {
  return { type: 'SET_PREVIEW_CARD', card };
};

export const unsetPreview = () => {
  return { type: 'UNSET_PREVIEW_CARD' };
};
