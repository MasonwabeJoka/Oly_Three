export function richTextLength(blocks: any, maxLength: number) {
    let totalLength = 0;
    let truncatedBlocks = [];

    for (const block of blocks) {
      if (block._type !== "block" || !block.children) {
        truncatedBlocks.push(block);
        continue;
      }

      let newChildren = [];
      for (const child of block.children) {
        if (child._type !== "span") {
          newChildren.push(child);
          continue;
        }

        const remainingLength = maxLength - totalLength;
        if (remainingLength <= 0) {
          // Add ellipsis to the last text span if truncated
          if (newChildren.length > 0) {
            const lastChild = newChildren[newChildren.length - 1];
            lastChild.text += "...";
          }
          return truncatedBlocks;
        }

        const truncatedText = child.text.slice(0, remainingLength);
        totalLength += truncatedText.length;
        newChildren.push({ ...child, text: truncatedText });

        if (truncatedText.length < child.text.length) {
          // Text was truncated, append ellipsis and stop processing further
          newChildren[newChildren.length - 1].text += "...";
          truncatedBlocks.push({ ...block, children: newChildren });
          return truncatedBlocks;
        }
      }

      truncatedBlocks.push({ ...block, children: newChildren });
    }

    return truncatedBlocks;
  }