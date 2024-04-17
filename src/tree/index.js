import { useState } from "react";
import animalsData from "./data.json";
import "./index.css";

const TreeNode = (props) => {
  const { currentNode, isInitialNode, addNewNode } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [textval, setTextVal] = useState("");

  return (
    <div className={!isInitialNode ? "child-node" : ""}>
      {currentNode.name}
      {isEdit ? (
        <div>
          <input
            onChange={(e) => setTextVal(e.target.value)}
            className="addNew-input"
          />
          <button
            className="button success-btn"
            onClick={() => {
              setIsEdit(false);
              addNewNode(currentNode.id, textval);
            }}
          >
            &#10004;
          </button>
          <button
            className="button danger-btn"
            onClick={() => setIsEdit(false)}
          >
            X
          </button>
        </div>
      ) : (
        <span className="edit-btn" onClick={() => setIsEdit(true)}>
          +
        </span>
      )}
      {currentNode.children &&
        !!currentNode.children.length &&
        currentNode.children.map((node) => (
          <TreeNode
            {...props}
            key={node.id}
            isInitialNode={false}
            currentNode={node}
          />
        ))}
    </div>
  );
};

const convertData = (animalsArr) => {
  const data = deepClone(animalsArr);
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});

  const root = [];
  data.forEach((el) => {
    // if root push in roots arr
    if (el.parent === null) {
      const newRoot = el;
      root.push(newRoot);
      return;
    }

    // find parent uing mapped data
    const parentEl = data[idMapping[el.parent]];

    // add curr as children in parent
    parentEl.children = [...(parentEl.children || []), el];
  });
  return root;
};

const deepClone = (data) => {
  // deep clone objects to create all new mem references for processing and keep original as it is
  const newData = JSON.parse(JSON.stringify(data));
  return newData;
};

export default function Tree() {
  const [data, setData] = useState(() => {
    return convertData(animalsData);
  });

  const addNewNode = (id, newData) => {
    const newNode = {
      id: animalsData.length + 1,
      name: newData,
      parent: id,
    };

    // add new data to animalsData json
    animalsData.push(newNode);
    setData(convertData(animalsData));
  };

  return (
    <div className="tree">
      {data.map((animal) => (
        <TreeNode
          key={animal.id}
          currentNode={animal}
          addNewNode={addNewNode}
          isInitialNode={true}
        />
      ))}
      {/* mammals
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cheetah <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bear <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lion <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dog <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elephant{" "}
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ape <br /> */}
    </div>
  );
}
