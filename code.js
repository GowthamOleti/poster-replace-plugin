figma.showUI(__html__, { width: 320, height: 500 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'set-poster') {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.notify("Select a rectangle or frame to apply the poster.");
      return;
    }

    try {
      const res = await fetch(msg.url);
      const bytes = await res.arrayBuffer();
      const image = figma.createImage(new Uint8Array(bytes));

      for (const node of selection) {
        if ("fills" in node) {
          const newFills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: image.hash }];
          node.fills = newFills;
        }
      }

      figma.notify("Poster applied!");
    } catch (err) {
      figma.notify("Failed to apply poster.");
    }
  }
};
