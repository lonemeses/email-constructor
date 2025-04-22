import React from 'react';
import PropTypes from "prop-types";

const applyTextStyles = (text, leaf) => {
    let styled = text;
    if (leaf.bold) styled = <strong>{styled}</strong>;
    if (leaf.italic) styled = <em>{styled}</em>;
    if (leaf.underline) styled = <u>{styled}</u>;
    return styled;
};

const renderLeafLines = (leaf, Tag = 'p') => {
    return leaf.text.split('\n').map((line, index, arr) => (
        <React.Fragment key={index}>
            <Tag>{applyTextStyles(line, leaf)}</Tag>
            {index < arr.length - 1 && <br />}
        </React.Fragment>
    ));
};

const TextPreview = ({ value }) => {
    return (
        <div>
            {value.map((node, i) => {
                const getTagByType = (type) => {
                    switch (type) {
                        case 'heading-one':
                            return 'h1';
                        case 'heading-two':
                            return 'h2';
                        default:
                            return 'p';
                    }
                };

                const Tag = getTagByType(node.type);

                return (
                    <div key={i} style={{ marginBottom: '0.25rem' }}>
                        {node.children.map((leaf, j) => (
                            <span key={j}>
                                {renderLeafLines(leaf, Tag)}
                            </span>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default TextPreview;

TextPreview.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object),
}

