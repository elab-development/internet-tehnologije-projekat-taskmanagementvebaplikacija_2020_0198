import React, { FC, ReactNode, useState } from "react";
import {
  Draggable,
  DraggableProps,
  DraggableProvided,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";

interface IXDrag<T = {}> extends Omit<DraggableProps, "children"> {
  className?: string;
  children: ReactNode;
  dragAll?: boolean;
  provided?: DraggableProvided;
  style?: DraggingStyle | NotDraggingStyle;
}

const XDrag: FC<IXDrag> = ({ className, children, dragAll, provided, style, ...props }) => {
  const [providedState, setProvidedState] = useState<DraggableProvided | undefined>(provided);

  if (!React.isValidElement(children)) return <div />;

  const getStyle = () => ({
    ...style,
    ...(providedState?.draggableProps.style || {}),
  });

  return (
    <Draggable {...props}>
      {(p: DraggableProvided, snapshot) => {
        const dragHandleProps = dragAll ? p.dragHandleProps : {};
        setProvidedState(p);
        return (
          <div
            className={className}
            ref={p.innerRef}
            {...p.draggableProps}
            {...dragHandleProps}
            style={getStyle()}
          >
            {React.cloneElement(children as React.ReactElement, { provided: p })}
          </div>
        );
      }}
    </Draggable>
  );
};

XDrag.defaultProps = {
  dragAll: true
};

export default XDrag;

