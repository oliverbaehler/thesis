export default function Render({ description }) {
    return <div className="toast-ui-editor-content" dangerouslySetInnerHTML={{ __html: description }}></div>;
}