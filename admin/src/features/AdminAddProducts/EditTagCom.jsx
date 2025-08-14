import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Space, Tag, theme, Tooltip } from "antd";
const EditTagCom = ({ onSizeTagsChange, product }) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  //

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    if (product && product?.sizes) {
      setTags(JSON.parse(product?.sizes));
    }
  }, [product]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags?.filter((tag) => tag !== removedTag);
    //
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      onSizeTagsChange([...tags, inputValue]); // Notify parent component about size tags
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };
  const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };
  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <Space size={[0, 8]} wrap className="w-full ">
      {tags?.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              style={tagInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag?.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={true}
            className=" text-light"
            style={{
              userSelect: "none",
            }}
            onClose={() => handleClose(tag)}
          >
            <span
              className=" text-light"
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag?.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip className="text-light" color="#fff" title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="text-xs"
          placeholder=" Enter ..."
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag
          style={tagPlusStyle}
          icon={<PlusOutlined />}
          onClick={showInput}
          className="w-full "
        >
          New Size
        </Tag>
      )}
    </Space>
  );
};
export default EditTagCom;
