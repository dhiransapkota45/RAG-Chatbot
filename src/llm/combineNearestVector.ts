const combineNearestVector = (docs: any) => {
  return docs.map((doc: any) => doc.pageContent).join("\n\n");
};

export default combineNearestVector;
