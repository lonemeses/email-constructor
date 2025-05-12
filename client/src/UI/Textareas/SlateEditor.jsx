import React, {useCallback, useMemo} from 'react';
import {createEditor, Editor} from 'slate';
import {Editable, Slate, withReact} from 'slate-react';
import styles from './MyTextarea.module.css'

const SlateEditor = ({value, onChange}) => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'heading-one':
                return <h1 {...props.attributes}>{props.children}</h1>;
            case 'heading-two':
                return <h2 {...props.attributes}>{props.children}</h2>;
            default:
                return <p {...props.attributes}>{props.children}</p>;
        }
    }, []);

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, []);
    const handleKeyDown = event => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
            editor.insertText('\n');
            return;
        }
        if (!event.ctrlKey) return;

        switch (event.code) {
            case 'KeyB': {
                event.preventDefault();
                toggleMark(editor, 'bold');
                break;
            }
            case 'KeyI': {
                event.preventDefault();
                toggleMark(editor, 'italic');
                break;
            }
            case 'KeyU': {
                event.preventDefault();
                toggleMark(editor, 'underline');
                break;
            }
        }
    };


    return (
        <Slate editor={editor} value={value} onChange={newValue => onChange(newValue)} initialValue={value}>
            <Editable
                onKeyDown={handleKeyDown}
                renderElement={renderElement}
                spellCheck
                autoFocus
                renderLeaf={renderLeaf}
                className={styles.slate}
            />
        </Slate>
    );
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};


const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};



const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
        children = <em>{children}</em>;
    }
    if (leaf.underline) {
        children = <u>{children}</u>;
    }
    return <span {...attributes}>{children}</span>;
};

export default SlateEditor;