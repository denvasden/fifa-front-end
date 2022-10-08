export function withScreenData(
  Component,
  getScreenData,
  initialState,
  ...props
) {
  return (
    <Component
      getScreenData={getScreenData}
      initialState={initialState}
      {...props}
    />
  );
}
